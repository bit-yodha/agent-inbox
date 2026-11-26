# Hosted personal agents: scope, integration matrix and discovery

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 23. Expanded scope: communicate with existing hosted personal agents

**User requirement (confirmed):** Add Grok Bot (xAI), Meta Muse and ChatGPT Dot, in addition to Hermes and Nod, so the owner can communicate from Agent Inbox itself. The app should address the user's existing agent, preserving its provider-managed identity, memory, permissions and connected tools. Do not create a replacement agent using a raw LLM API. This section supersedes earlier deferral of hosted agents. It does not assert that a provider exposes a supported two-way API today.

## 23.1 Integration matrix and evidence (November 27, 2026)

| Provider | Candidate official route | Discovery status / limitation |
|---|---|---|
| Hermes | Direct authenticated REST/SSE | Baseline; real device tests pending |
| Nod | Official self-hosted web UI; investigate supported native chat interface | Browser handoff is not the product goal; no native support claim |
| Grok Bot | Slack messaging; authenticated routine webhook | Slack two-way routing and existing agent identity unverified; webhook is trigger-only, HTTP 200 is not task completion or chat response |
| ChatGPT Dot | Slack or Microsoft Teams messaging | Official user messaging channels exist; third-party app access to the actual Dot DM and reply correlation unverified. No public direct personal Dot chat API located. |
| Meta Muse | Verified owner email to the agent's own @muse.ai address | Sending tasks documented; automatic return to owner mailbox, correlation and approval behavior must be tested; not streaming. WhatsApp is a supported human-facing channel, not proof of an authorized third-party API. |

Official product references: [Grok Bot collaboration](https://docs.x.ai/grok-bot/chat-and-collaboration), [Grok Bot routines/webhooks](https://docs.x.ai/grok-bot/skills-routines-and-automations), [ChatGPT Dot setup](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot), [Dots messaging](https://learn.chatgpt.com/docs/dots), [Muse Mail](https://www.meta.com/help/superintelligence/1149305437517250/), [Muse](https://ai.meta.com/muse/), [Slack message sending](https://docs.slack.dev/reference/methods/chat.postMessage/), [Slack conversation history](https://docs.slack.dev/reference/methods/conversations.history/). These were checked during v0.2 drafting and retained as provider evidence; no live transport test has been performed.

## 23.3 Provider-specific discovery tasks

**Grok Bot:** Connect Slack in the official product with the user's consent, identify the existing agent and permitted conversation. Test whether an explicitly user-initiated message through the official Slack API is accepted and whether the same agent replies in a readable Slack location. Personal and team Bots may behave differently. A routine webhook can submit a task with a unique client request ID; store accepted status, not completed. Test a separately authorized reply channel before claiming two-way support. If only webhook submission works, expose it as trigger-only, not chat.

**ChatGPT Dot:** Connect the user's existing Dot to Slack in official ChatGPT settings (or evaluate Teams separately). Test permission-approved access to the actual user/Dot conversation, user-initiated send, reply retrieval, identity mapping, asynchronous follow-up, and unsupported UI approvals. Slack user scopes and workspace approval may be required; a third-party Slack bot cannot simply inject into an arbitrary DM. Sign in with ChatGPT or an OpenAI API key does not imply access to a personal Dot. Do not use generic API completion as a substitute.

**Meta Muse:** User creates their Muse address and verifies their own external mailbox in Muse. Authenticate the mailbox using the mail provider's supported OAuth flow. Send explicitly requested instructions from the verified sender to the exact saved Muse address, with a unique subject/request ID. Ask Muse to reply to that same mailbox with the result when allowed. Validate whether replies arrive, approval requests remain provider-side, and multiple tasks can be reliably correlated using email message IDs and thread headers. No bulk mailbox ingestion; use the narrowest available access and filter to the configured conversation. Verify actual permission and review requirements, sender authenticity and spoofing protections. Do not auto-send replies, attachments or sensitive requests. If Muse does not reliably return results, keep send-only as experimental and do not label it chat.

## 23.6 Discovery and release gates

1. Use real owner accounts and safe sample tasks; verify agent entitlement, provider availability, account/workspace permissions and integration terms.
2. Demonstrate explicit in-app send to the existing agent. Confirm that generic model responses are not used as a replacement.
3. Demonstrate that the same agent returns a response visible in Agent Inbox without opening its original UI; verify follow-ups and account isolation.
4. Demonstrate delayed replies, duplicate events, interrupted submission, reopen/catch-up, expired credentials, revoked access, rate limits and provider-side approval handling on Android and iOS.
5. Document permissions, privacy, transport limits, fixtures, smoke tests and setup. A successful mock, webhook response or external app launch is not end-to-end evidence.

**Release policy (proposed):** Keep Hermes/Nod baseline as an internal or early beta milestone. Run hosted-provider discovery before broadening features. Enable each verified integration separately. Do not advertise a universal five-agent native inbox until all five can send and receive in the app; if a provider blocks this, ship only truthful supported subsets or ask the owner to revise launch scope. Any required cloud gateway, paid infrastructure or change to no-mandatory-backend architecture needs explicit review.
