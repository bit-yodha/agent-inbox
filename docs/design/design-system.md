# Experience and design system

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 6. Experience and design system (proposed)

Use a calm, familiar mobile messaging layout, with a professional developer-oriented visual identity. Avoid copying another product's branding. Suggested neutral dark/light surfaces, a single indigo accent, semantic status colors paired with text/icons, clear typography and large touch targets. Support OS text scaling, screen readers, keyboard-safe layouts, reduced motion and readable contrast. Do not use color as the only status signal.

Connection labels: Not checked, Last check successful, Unreachable, Authentication failed, Check failed, Browser-only. Last-known successful status must not imply the agent is currently online. Message status labels: Pending, Receiving, Complete, Failed, Incomplete, Outcome unknown. Expose provider-specific controls only when implemented and confirmed supported.

These labels apply to direct connections (Hermes native chat and Nod browser handoff). Hosted asynchronous connections use the catalog badges in §23.5, the connection lifecycle in §24.3 and the message states in §24.7 (Pending, Dispatching, Accepted, Waiting for reply, Reply received, Failed, Outcome unknown). The UI maps each lifecycle/state value to one user-facing label; that mapping is defined with the domain contracts in Roadmap Gate 1 and recorded in an ADR.
