// Node.js 20+; no dependencies. Internal test only.
// Use an authorized Slack USER access token and an existing Dot DM.
// Do not commit tokens or share them in chat. No task is sent in list mode.
import { randomUUID } from 'node:crypto';
const token = process.env.SLACK_USER_TOKEN;
if (!token) throw Error('Set SLACK_USER_TOKEN locally.');
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function api(method, params = {}, write = false) {
  const url = new URL(`https://slack.com/api/${method}`);
  if (!write) for (const [k,v] of Object.entries(params)) url.searchParams.set(k,String(v));
  for (;;) {
    const response = await fetch(url, { method: write ? 'POST' : 'GET', headers: { Authorization: `Bearer ${token}`, ...(write ? {'Content-Type':'application/json'} : {}) }, ...(write ? {body:JSON.stringify(params)} : {}), signal:AbortSignal.timeout(15000) });
    if (response.status === 429 && !write) {
      const delay = Number(response.headers.get('retry-after') || 60);
      throw Error(`Rate limited; wait ${delay} seconds before retrying the read. No task will be resubmitted.`);
    }
    const result = await response.json();
    if (!response.ok || !result.ok) throw Error(`${method}: ${result.error || response.status}`);
    return result;
  }
}
async function pages(method, params, key) {
  const items=[]; let cursor='';
  do { const r=await api(method,{...params,...(cursor?{cursor}:{})}); items.push(...(r[key]||[])); cursor=r.response_metadata?.next_cursor||''; } while(cursor);
  return items;
}
const identity=await api('auth.test');
const dms=await pages('conversations.list',{types:'im',limit:100},'channels');
if (process.argv[2]==='list') {
  console.log('Authorized user:',identity.user_id,'Workspace:',identity.team_id);
  console.table(dms.map(c=>({channel:c.id,peer:c.user})));
  process.exit(0);
}
if (process.argv[2]!=='test') throw Error('Usage: node dot-slack-poc.mjs list | test D_CHANNEL EXPECTED_AGENT_USER_ID');
const channel=process.argv[3], peer=process.argv[4];
if (!channel || !peer || !dms.some(c=>c.id===channel&&c.user===peer) || peer===identity.user_id) throw Error('Select the verified existing Dot DM and its peer ID from list mode.');
const marker=`AGENT-INBOX-${randomUUID()}`;
const text=`Agent Inbox connectivity test. Reply with exactly this identifier, without taking any other action: ${marker}`;
console.log('Sending one test message. If transport fails, do not automatically resend.');
const sent=await api('chat.postMessage',{channel,text},true);
console.log('Accepted by Slack:',sent.ts,'Marker:',marker);
const deadline=Date.now()+120000;
while(Date.now()<deadline) {
  const history=await pages('conversations.history',{channel,oldest:sent.ts,limit:100},'messages');
  const thread=await pages('conversations.replies',{channel,ts:sent.ts,limit:100},'messages');
  const reply=[...history,...thread].find(m=>m.ts!==sent.ts&&m.user===peer&&typeof m.text==='string'&&m.text.includes(marker));
  if(reply){ console.log('PASS: verified peer returned marker.',{ts:reply.ts,text:reply.text}); process.exit(0); }
  await sleep(5000);
}
console.log('INCONCLUSIVE: no verified matching reply within test window. Check Slack manually; do not resend automatically.');
process.exitCode=2;
