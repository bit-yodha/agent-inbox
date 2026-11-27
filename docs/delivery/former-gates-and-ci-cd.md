# Former baseline gates and CI/CD

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 16. Build plan and delivery gates

> **Superseded gate numbering.** The authoritative gate order is §24.13, implemented in `Roadmap.md` (Gates 0A, 0B, 1–6). The former baseline gates below are kept only as historical content and have been folded into the roadmap: former Gate 0 → Gates 0A/0B; former Gates 1–3 (Connect, Chat, Nod and settings, including credential rotation) → Gate 1; former Gate 4 (Beta) → Gate 5; former Gate 5 (Release decision) → Gate 6. Refer to gates by their `Roadmap.md` numbers only. The CI/CD requirements at the end of this section remain in force.

### Former Gate 0 — Technical discovery (must precede feature expansion)
- Run Hermes with a harmless demo configuration, secure reachability and test credentials.
- Prove authenticated discovery and streaming from physical Android and iOS devices using the selected Expo SDK; verify terminal behavior, redirects, TLS, tool progress and background/kill behavior.
- Validate Nod self-hosting and mobile browser reachability; document limitations.
- In parallel run the Grok Bot, Muse and Dot transport spikes in §23. Test real existing agents, not generic model APIs; record eligibility, identity, reply routing, approval behavior and permissions.
- Record compatibility versions, network setup and decisions. If platform streaming fails, resolve transport before building the full UI.

### Former Gate 1 — Connect
Create navigation, theme foundation, agent registry, SQLite migrations, vault, URL validator and Hermes connection test. Add Agents and Add Agent screens. Exit when a new tester can add a valid connection and see distinct failure states on real devices.

### Former Gate 2 — Chat
Implement thread repositories, request state machine, adapter stream parser, composer, response rendering and persistence. Exit when streaming, offline history, interruption, duplicates and restart recovery pass on Android/iOS.

### Former Gate 3 — Nod and settings
Implement browser adapter, details, connection editing, credential rotation, disconnect, appearance, About and Updates. Exit when credential lifecycle tests pass and Nod handoff works without collecting its token.

### Former Gate 4 — Beta
Run full quality matrix, review dependency/security scans and privacy disclosure, prepare restricted demo endpoint and setup guide, generate signed Android/iOS builds and distribute through Google Play internal testing and TestFlight. No claim of public approval until stores approve.

### Former Gate 5 — Release decision
Review beta feedback, blockers, security and reliability outcomes. Publish only after all mandatory criteria pass or explicit scope changes are documented. No fixed calendar or delivery estimate is assumed; gates are dependency-ordered.

### CI/CD
On pull requests: install locked dependencies, lint, strict typecheck, unit/integration tests, secret scan and dependency review. On protected release workflow: verify version, build signed artifacts with restricted signing credentials, run device smoke tests and submit to internal tracks with authorized release account. Manually bump semantic app version; auto-increment native build number in release builds. Validate store-specific requirements at release time. Keep production secrets outside git and build bundles. Maintain a changelog and rollback plan for app regressions; SQLite migrations must support forward recovery.
