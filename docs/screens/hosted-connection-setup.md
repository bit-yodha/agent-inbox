# Hosted connection setup and UI contract

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 24.3 Connection setup and UI contract

Use the 20-screen design prototype (`docs/design/agent-inbox-ui.html` and `docs/design/images/`) as a visual reference only. It was drawn against v0.2 and does not include the states below; its sample responses are not real. Retain all earlier screens and theme/setting behavior. Add or extend these logical screen states (not necessarily separate routes):

| Screen/state | Requirements |
|---|---|
| Provider catalog | All five targets; availability and transport badges; unverified entries marked experimental or unavailable. |
| Transport setup | Explain intermediary access, exact data scopes, prerequisites, account entitlement and why consent is needed. |
| OAuth browser | Use OS browser/auth session, not an embedded credential form. Handle cancel, denial, invalid callback, expired flow and return to setup. |
| Account selection | Show Slack workspace and owner or Gmail mailbox; confirm that this is the account linked to the existing agent. |
| Agent binding | Pick only an eligible direct conversation or enter the exact verified Muse address; show masked account details and source. Do not auto-select an agent from a display-name match. |
| Verify identity | Confirm API access and binding first. Show explicit test-task consent separately; test task can consume usage. |
| Two-way verification | Send harmless unique probe, show accepted/waiting/reply states and actual reply; only enable full chat after positive evidence. |
| Hosted chat | Native composer, asynchronous status, cached messages, source and last successful sync, refresh, contextual errors; no artificial token stream. |
| Reauthorize | Explain expired/revoked/missing permissions; preserve local history; prevent new send until reauthorized and binding revalidated. |
| Disconnect | Explain local deletion versus provider revocation, remote history retention and effects on other agents sharing the same account. |

A Slack DM is one real remote conversation. Do not manufacture separate remote contexts when the user taps New Chat. Show one local mirror by default; offer thread-specific views only after confirming supported behavior. Muse email threads must reflect actual remote threads, not invented sessions. Hermes retains its native local-thread behavior.

Connection lifecycle: `unconfigured → authorizing → authorized → binding_pending → bound_unverified → probe_pending → verified`. Side states: `authorization_failed`, `permission_denied`, `probe_failed`, `probe_unknown`, `reauth_required`, `disconnected`. Persist identity and evidence timestamps. A previous success is not live availability. Only `verified` plus valid current credentials and binding permits ordinary send; the explicitly consented probe has its own narrower permission.
