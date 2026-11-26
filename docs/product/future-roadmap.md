# Future roadmap (not MVP commitments)

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 18. Future roadmap (not MVP commitments)

| Phase | Product evolution | Entry condition |
|---|---|---|
| 1 | Agent Inbox: Hermes native, Nod handoff, hosted-agent discovery | Baseline gates pass; each hosted adapter gated separately |
| 2 | Universal client: additional native adapters, QR setup, capability discovery | Early users repeatedly request more integrations |
| 3 | Control center: task list, durable runs, reconnect, stop, approvals, artifacts | Verified provider run APIs and safety semantics |
| 4 | Optional services: notifications, sync, team controls | Explicit privacy model, hosting cost and business decision |
| 5 | Multi-agent operating platform: cross-agent delegation, workflows, adapter SDK | Validated demand and reviewed orchestration trust model |

Future adapter candidates: OpenClaw, Claude Code, Codex, OpenCode, custom agents, LangGraph/Google ADK deployments, ChatGPT Dot, Grok Bot and Meta Muse. The three hosted personal agents are now priority product targets, with release conditional on §23; other candidates are future scope. None is a promise of API access. Evaluate supported interfaces, authentication, subscription terms, capability mapping, permissions and lifecycle semantics individually. A custom user-hosted bridge or standard adapter API may be necessary where direct integration is unavailable. Any remote orchestration must enforce agent-side permission boundaries, user approvals and auditability; it must not rely on a phone process to guarantee durable execution.

For push notifications, explicitly design the event relay/APNs/FCM path and its data exposure; local-only storage does not magically provide remote notifications. For optional sync/team use, design authentication, encryption, tenancy, retention and revocation before adding a hosted backend.
