# Implementation handoff and ordered engineering gates

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 21. Implementation handoff for coding agents

Start with Gate 0A in `Roadmap.md`, not the entire application; follow the Dot-first hosted discovery sequence in §24.13 while retaining Hermes as the direct baseline. Read this specification, `AGENTS.md` and `Roadmap.md`; the original MVP document is not included and is fully superseded by this specification. Create a short implementation plan and compatibility spike; pin SDK/provider versions; document unresolved assumptions. Implement one gate at a time with tests and a concise change summary. Keep UI, domain, adapters and storage separate. Never add provider integrations, an app-wide backend, authentication service, analytics, billing, push, background workers or downloaded plugin execution unless the relevant scope is explicitly approved. Do not commit secrets or expose the user's raw gateway. Do not mark a gate complete based only on mocked tests: identify physical-device checks not yet performed. Maintain the README, security notes and acceptance matrix alongside implementation.

## 24.13 Ordered engineering gates and implementation handoff

| Gate | Work | Exit condition |
|---|---|---|
| 0A — Dot spike | Official Slack setup, development user auth, manual control, API send, history/thread receive | C02–C03 evidence or explicit documented blocker |
| 0B — parallel spikes | Hermes physical devices, Grok reuse test, Muse email, Nod native discovery | Provider-specific matrix with real send/receive results and policies |
| 1 — Foundation | Existing app UI, DB/vault, capability registry, domain contracts, Hermes baseline | Existing §§15–17 checks maintained |
| 2 — Shared async engine | Outbox, remote binding, OAuth lifecycle, sync/checkpoint and rate-limiter | Deterministic fixtures and fault tests pass |
| 3 — Verified Slack integrations | Add Dot then Grok only if their respective PoC passes; native OAuth UI | C01–C04 and C08–C14 as applicable on both OSes |
| 4 — Verified Muse / Nod | Gmail flow and Nod native only if discovered and permitted; otherwise truthful fallback | C05/C07 plus security and policy requirements |
| 5 — Beta | Full regression, limited reviewer demo, privacy, EAS signed test builds | All enabled-provider acceptance criteria met |
| 6 — Public release | Review provider approvals, App Store / Play rules, security, distribution and scope | Explicit approval of supported subset; five-agent milestone only when all five verified |

Start coding with Gate 0A rather than building unvalidated hosted provider UI. Keep Hermes discovery in parallel to maintain a working baseline. If direct owner-token route is blocked, investigate only official supported alternatives; do not hide limitations behind a simulated integration. Coding agents must maintain a changelog, ADRs, provider status matrix, tests and explicit gate evidence. No backend, notification infrastructure or premium services without scope review. The gate order above replaces the numbering in §16 and is tracked in `Roadmap.md`; earlier Hermes/Nod beta is an internal milestone, not proof of the five-agent vision.
