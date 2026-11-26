# Architecture documentation

The technical design of Agent Inbox. It was moved verbatim out of `Product.md` so architecture can be maintained separately from product requirements. `Product.md` is now the index of the whole specification. Its section index lists every section number with its file, so references such as "§24.6" still resolve.

**Status:** everything here is a proposed design. No app code exists yet. A design described here is not evidence that an integration works; see `Roadmap.md` and `docs/integrations/`.

**Precedence:** unchanged from `Product.md`. Material from §§23–24 overrides material from earlier sections. Superseded passages carry an explicit note (for example §23.4 → §24.6). If architecture and product requirements conflict, follow the rule in `AGENTS.md` and record an ADR in `docs/adr/`.

## Section map

| `Product.md` section | Document |
|---|---|
| §7 System architecture (7.1 responsibilities, 7.2 stack, 7.3 repository structure) | [`system-overview.md`](system-overview.md) |
| §23.2 Transport architecture | [`system-overview.md`](system-overview.md) |
| §24.2 Runtime topology and message ownership | [`system-overview.md`](system-overview.md) |
| §24.11 Implementation tree | [`system-overview.md`](system-overview.md) |
| §8 Adapter design and normalized events (direct connections) | [`adapters.md`](adapters.md) |
| §23.4 Hosted transport contract (superseded by §24.6) | [`adapters.md`](adapters.md) |
| §24.6 Provider adapters and capability normalization | [`adapters.md`](adapters.md) |
| §10 Local data design and lifecycle | [`data-model.md`](data-model.md) |
| §24.8 SQLite extension, credential lifecycle and isolation | [`data-model.md`](data-model.md) |
| §11 Direct request state machine | [`request-lifecycle.md`](request-lifecycle.md) |
| §24.7 Durable submission, sync and async state machines | [`request-lifecycle.md`](request-lifecycle.md) |
| §14 Error model and observability | [`errors-and-observability.md`](errors-and-observability.md) |
| §24.10 Errors, security, observability, operations | [`errors-and-observability.md`](errors-and-observability.md) |
| §24.9 Optional event-driven bridge | [`event-bridge.md`](event-bridge.md) |
| §9.1, §9.2, §9.4 Hermes contract, streaming, durable runs | [`providers/hermes.md`](providers/hermes.md) |
| §9.3 Nod | [`providers/nod.md`](providers/nod.md) |
| §24.4 Slack transport (ChatGPT Dot, Grok Bot) | [`providers/slack.md`](providers/slack.md) |
| §24.5 Gmail transport (Meta Muse) | [`providers/gmail-muse.md`](providers/gmail-muse.md) |
| §12 Security, privacy and networking | [`../security/threat-model-and-privacy.md`](../security/threat-model-and-privacy.md) |

The other sections of the specification live elsewhere in `docs/` (product, screens, design, testing, delivery and hosted agents). The table at the top of [`Product.md`](../../Product.md) maps every folder to its sections.

## Maintaining these documents

- Change architecture here, not in `Product.md`. Keep the § numbers in headings so cross-references keep working.
- When one passage replaces another, add an explicit "Superseded by §…" note rather than silently deleting it, and record an ADR when the change is a decision.
- When implementation validates or changes a design (schemas, intervals, callback scheme, contracts), update the relevant file and link the evidence in `docs/integrations/` or the ADR.
