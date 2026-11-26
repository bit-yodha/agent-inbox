# Agent Inbox
## Product Requirements & Technical Design Specification

**Version:** 0.3 (two-way communication architecture and implementation gates)  
**Date:** November 27, 2026  
**Companion documents:** `AGENTS.md` (canonical coding-agent instructions), `Roadmap.md` (authoritative gate plan)  
**Status:** Ready for technical discovery; not yet an implemented or validated product  
**Platforms:** Android and iOS  
**Working name:** Agent Inbox  
**Tagline:** All your agents. One inbox.

**Scope update:** Existing Grok Bot, Meta Muse and ChatGPT Dot are first-class product targets alongside Hermes and Nod. Sections 23–24 define provider discovery, concrete two-way communication contracts and release rules. Section 24 refines the implementation plan, OAuth, async data model and hosted-provider acceptance criteria; it takes precedence where earlier sections describe only the baseline. Where an earlier section is superseded, it carries an explicit note pointing to the governing section. Native in-app two-way messaging is the goal; a handoff or task trigger alone does not meet that goal.

**How this specification is organized:** this file is the index. Every section's content lives in `docs/`, moved there verbatim. The section index below lists every section number with its document, so references such as "§24.6" still resolve here. Edit the linked documents, not this file; update the section index and folder table only when a section is created or relocated. The precedence rule above applies to the linked documents by section number.

| Folder | Contents |
|---|---|
| [`docs/product/`](docs/product/) | Overview, scope, information architecture, non-functional requirements, future roadmap, launch and project direction, decisions and risks, references (§§1–4, 13, 18–20, 22, 24.14) |
| [`docs/screens/`](docs/screens/README.md) | Per-screen specifications S01–S07 and hosted connection setup (§5, §24.3) |
| [`docs/design/`](docs/design/) | Design system, clickable prototype and board images (§6) |
| [`docs/architecture/`](docs/architecture/README.md) | System overview, adapters, data model, request lifecycle, errors, event bridge, provider contracts (§§7–11, 14, 23.2, 23.4, 24.2, 24.4–24.11) |
| [`docs/security/`](docs/security/) | Threat model, privacy and networking (§12) |
| [`docs/testing/`](docs/testing/) | Testing strategy and acceptance tests C01–C16 (§15, §24.12) |
| [`docs/delivery/`](docs/delivery/) | Former baseline gates and CI/CD, definition of done, implementation handoff and ordered gates (§§16–17, 21, 24.13) |
| [`docs/hosted-agents/`](docs/hosted-agents/) | Hosted-agent scope, discovery, UX and security rules, engine decision, owner prerequisite (§§23.1, 23.3, 23.5, 23.6, 24.1, 24.15) |

---

## Section index

Every section number from the original specification, with the document that now holds it. References such as "§24.6" are resolved with this table.

| § | Section | Document |
|---|---|---|
| 1 | Executive summary | [`docs/product/overview.md`](docs/product/overview.md) |
| 2 | Problem, audience and differentiation | [`docs/product/overview.md`](docs/product/overview.md) |
| 3 | Product scope and release boundaries | [`docs/product/scope.md`](docs/product/scope.md) |
| 4 | Product information architecture | [`docs/product/information-architecture.md`](docs/product/information-architecture.md) |
| 5 | Screen-by-screen functional specification | [`docs/screens/`](docs/screens/README.md): [S01](docs/screens/s01-agents-home.md), [S02](docs/screens/s02-add-agent.md), [S03](docs/screens/s03-hermes-conversations.md), [S04](docs/screens/s04-hermes-chat.md), [S05](docs/screens/s05-nod-details.md), [S06](docs/screens/s06-agent-settings.md), [S07](docs/screens/s07-app-settings.md) |
| 6 | Experience and design system (proposed) | [`docs/design/design-system.md`](docs/design/design-system.md) |
| 7 | System architecture | [`docs/architecture/system-overview.md`](docs/architecture/system-overview.md) |
| 8 | Adapter design and normalized events | [`docs/architecture/adapters.md`](docs/architecture/adapters.md) |
| 9 | Provider integration contracts | §9.1, 9.2, 9.4 → [`providers/hermes.md`](docs/architecture/providers/hermes.md); §9.3 → [`providers/nod.md`](docs/architecture/providers/nod.md) |
| 10 | Local data design and lifecycle | [`docs/architecture/data-model.md`](docs/architecture/data-model.md) |
| 11 | State machine and request semantics | [`docs/architecture/request-lifecycle.md`](docs/architecture/request-lifecycle.md) |
| 12 | Security, privacy and networking | [`docs/security/threat-model-and-privacy.md`](docs/security/threat-model-and-privacy.md) |
| 13 | Non-functional requirements and quality targets | [`docs/product/non-functional-requirements.md`](docs/product/non-functional-requirements.md) |
| 14 | Error model and observability | [`docs/architecture/errors-and-observability.md`](docs/architecture/errors-and-observability.md) |
| 15 | Testing strategy and acceptance matrix | [`docs/testing/testing-strategy.md`](docs/testing/testing-strategy.md) |
| 16 | Build plan and delivery gates | [`docs/delivery/former-gates-and-ci-cd.md`](docs/delivery/former-gates-and-ci-cd.md) |
| 17 | Definition of done (v1) | [`docs/delivery/definition-of-done.md`](docs/delivery/definition-of-done.md) |
| 18 | Future roadmap (not MVP commitments) | [`docs/product/future-roadmap.md`](docs/product/future-roadmap.md) |
| 19 | Launch, success measures and business model | [`docs/product/launch-and-business.md`](docs/product/launch-and-business.md) |
| 20 | Decisions, risks and open questions | [`docs/product/decisions-and-risks.md`](docs/product/decisions-and-risks.md) |
| 21 | Implementation handoff for coding agents | [`docs/delivery/implementation-handoff.md`](docs/delivery/implementation-handoff.md) |
| 22 | References and evidence | [`docs/product/references.md`](docs/product/references.md) |
| 23 | Expanded scope: communicate with existing hosted personal agents | [`docs/hosted-agents/scope-and-discovery.md`](docs/hosted-agents/scope-and-discovery.md) |
| 23.1 | Integration matrix and evidence (November 27, 2026) | [`docs/hosted-agents/scope-and-discovery.md`](docs/hosted-agents/scope-and-discovery.md) |
| 23.2 | Transport architecture (proposed) | [`docs/architecture/system-overview.md`](docs/architecture/system-overview.md) |
| 23.3 | Provider-specific discovery tasks | [`docs/hosted-agents/scope-and-discovery.md`](docs/hosted-agents/scope-and-discovery.md) |
| 23.4 | Hosted transport contract (illustrative) | [`docs/architecture/adapters.md`](docs/architecture/adapters.md) |
| 23.5 | UX and security requirements | [`docs/hosted-agents/ux-and-security-requirements.md`](docs/hosted-agents/ux-and-security-requirements.md) |
| 23.6 | Discovery and release gates | [`docs/hosted-agents/scope-and-discovery.md`](docs/hosted-agents/scope-and-discovery.md) |
| 24 | Two-way communication engine — implementation specification (v0.3) | Subsections below |
| 24.1 | Decision, invariants and release boundary | [`docs/hosted-agents/communication-engine-decision.md`](docs/hosted-agents/communication-engine-decision.md) |
| 24.2 | Runtime topology and message ownership | [`docs/architecture/system-overview.md`](docs/architecture/system-overview.md) |
| 24.3 | Connection setup and UI contract | [`docs/screens/hosted-connection-setup.md`](docs/screens/hosted-connection-setup.md) |
| 24.4 | Slack transport — ChatGPT Dot first, Grok Bot second | [`docs/architecture/providers/slack.md`](docs/architecture/providers/slack.md) |
| 24.5 | Muse transport — authorized email bridge | [`docs/architecture/providers/gmail-muse.md`](docs/architecture/providers/gmail-muse.md) |
| 24.6 | Direct provider adapters and capability normalization | [`docs/architecture/adapters.md`](docs/architecture/adapters.md) |
| 24.7 | Durable submission, message synchronization and state machines | [`docs/architecture/request-lifecycle.md`](docs/architecture/request-lifecycle.md) |
| 24.8 | SQLite extension, credential lifecycle and isolation | [`docs/architecture/data-model.md`](docs/architecture/data-model.md) |
| 24.9 | Event-driven architecture — optional later/internal path | [`docs/architecture/event-bridge.md`](docs/architecture/event-bridge.md) |
| 24.10 | Errors, security, observability and operational requirements | [`docs/architecture/errors-and-observability.md`](docs/architecture/errors-and-observability.md) |
| 24.11 | Proposed implementation tree (extension to §7.3) | [`docs/architecture/system-overview.md`](docs/architecture/system-overview.md) |
| 24.12 | Acceptance tests and integration evidence | [`docs/testing/acceptance-tests.md`](docs/testing/acceptance-tests.md) |
| 24.13 | Ordered engineering gates and implementation handoff | [`docs/delivery/implementation-handoff.md`](docs/delivery/implementation-handoff.md) |
| 24.14 | Additional official references (checked November 27, 2026) | [`docs/product/references.md`](docs/product/references.md) |
| 24.15 | Owner-confirmed development prerequisite (packaging addendum) | [`docs/hosted-agents/owner-prerequisites.md`](docs/hosted-agents/owner-prerequisites.md) |
