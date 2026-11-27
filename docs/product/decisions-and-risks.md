# Decisions, risks and open questions

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 20. Decisions, risks and open questions

| Decision / risk | Current position |
|---|---|
| Product direction | Inbox first; control center positioning; orchestration later (agreed direction) |
| First integration | Gate 0A Dot-via-Slack proof of concept starts first (§24.13); Hermes native chat is the first direct baseline and its discovery runs in parallel; Nod browser-only first milestone; Grok Bot and Muse discovery in Gate 0B |
| Gate plan | `Roadmap.md` (Gates 0A, 0B, 1–6) is authoritative; former §16 numbering superseded |
| Repository layout | §7.3 tree with transport-grouped adapters (§24.11); ADRs in `docs/adr/`, provider evidence in `docs/integrations/` |
| Backend | No mandatory company-hosted runtime backend in v1 |
| Protocol | Chat Completions for MVP; durable Runs API later, pending compatibility tests |
| Local history | Client-owned transcript; no promise of existing remote session sync or memory isolation |
| Concurrency | Proposed one active request per agent in the app |
| Disconnect/history | Proposed confirmed deletion of local connection/history; remote data unchanged |
| Local encryption | SecureStore for secrets; SQLite encryption/backup threat review before beta |
| Product name / ownership | Working name Agent Inbox; OpenAgentHQ vs independent brand not decided |
| Licensing | Decided: fully open source under MIT (`LICENSE`); no open-core split; dependency licenses must be MIT-compatible |
| Technical blockers | Device streaming, secure endpoint reachability, exact provider version/event behavior, credential redirect policy, Nod host setup and hosted-agent bidirectional transport compatibility are untested |
| Release blockers | Apple/Google developer accounts, signing, reviewer demo endpoint, privacy/store review and real-device beta evidence required |

The engineering team should record changes as architecture decision records (ADRs). Scope expansions require a specific acceptance condition and updated release gate. Do not silently replace the MVP with a cloud orchestration system.
