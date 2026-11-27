# S01 — Agents (home)

> Moved verbatim from `Product.md` §5 into this file. `Product.md`'s section index links §5 here; [`README.md`](README.md) lists every screen. Hosted-agent setup states (OAuth, account selection, binding, probe, reauthorization, disconnect) are defined in [`hosted-connection-setup.md`](hosted-connection-setup.md) (§24.3) and take precedence where they extend these screens.

- Show each connection's display name, provider, last check timestamp and status. Status is a last-known observation, not a live presence guarantee.
- Hermes entries navigate to conversations; verified hosted entries open their native asynchronous conversation; Nod opens details while browser-only. Mark browser-only Nod **Opens in browser**. See §24.3 for hosted setup states.
- Show an empty state with a short explanation and Add Agent action. Provide a settings gear.
- Load saved entries offline. Show loading, local database error and empty states distinctly.
- Proposed: allow multiple connections of the same provider, using distinct internal IDs even when display names match.

**Acceptance:** A fresh installation displays an empty state; a saved agent appears after restarting; no token or sensitive URL query is displayed or logged.
