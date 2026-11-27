# Launch, success measures and project direction

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 19. Launch, success measures and business model

### Proposed beta validation

Recruit 10–20 developers already running Hermes; observe unassisted setup, connection test, first streamed chat and later reopening. Ask what messaging/dashboard workflows they currently use, whether a single inbox changes behavior and which second integration they would actually connect. Record reasons for failed setups without collecting secrets.

Proposed learning targets, not existing metrics: ≥80% of eligible testers with a preconfigured reachable gateway complete first chat; median setup under five minutes excluding agent/network provisioning; no duplicate tasks due to client automatic replay; at least five testers use the app again within a week. Track denominator and distinguish agent/network errors from client errors. Treat qualitative feedback as important in a small beta; do not equate installs with product-market fit.

### Licensing and project direction

**Decided:** Agent Inbox is fully open source. The entire repository — client, adapters, spikes and documentation — is licensed under the MIT License (`LICENSE`). There is no open-core split and no proprietary edition. No required account, billing implementation or paywall in the MVP. Any future optional hosted service (for example managed sync or a bridge) requires a separate scope, privacy and cost decision and must not make the open-source client depend on it. Every third-party dependency must have an MIT-compatible license; review dependency licenses before adding packages and before each release. OpenAgentHQ versus independent brand remains unresolved. The working name is not trademark-cleared.
