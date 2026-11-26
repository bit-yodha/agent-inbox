# Hosted agents: UX and security requirements

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 23.5 UX and security requirements

- Provider catalog shows all five product targets with factual status: native chat, two-way bridge, trigger-only, opens externally, or unavailable. Experimental adapters require explicit opt-in.
- Connection setup shows exact provider, account/workspace, agent identity, transport, scope, and reply availability before save. Connection verification must distinguish account authorization, agent reachability and two-way test results.
- For asynchronous adapters, show accepted, waiting for reply, reply received, failed or outcome unknown. A reply does not itself prove task completion. Display transport source and last sync timestamp. No fabricated streaming, tool progress or approvals.
- Bind each connection to an exact provider identity, workspace, conversation or verified agent email. Keep credentials in the vault and isolate them by account and origin. Do not import all Slack messages or inbox contents into SQLite; persist only the explicitly connected agent conversation. Disclose that Slack/email transport shares message content with the intermediary and agent provider. These channels are not end-to-end encrypted by Agent Inbox.
- Only official documented APIs and user-authorized scopes. Do not scrape private web endpoints, capture passwords or browser cookies, automate personal WhatsApp sessions, bypass provider approvals or use unofficial mobile tokens. Provider-side approval remains in the official interface until a supported approval API is verified.
- Disconnect revokes app-side access where supported and clears its local secrets. Explain that remote agent memory/history and external workspace/email messages are not deleted by disconnect.
