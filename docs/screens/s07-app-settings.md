# S07 — App settings

> Moved verbatim from `Product.md` §5 into this file. `Product.md`'s section index links §5 here; [`README.md`](README.md) lists every screen. Hosted-agent setup states (OAuth, account selection, binding, probe, reauthorization, disconnect) are defined in [`hosted-connection-setup.md`](hosted-connection-setup.md) (§24.3) and take precedence where they extend these screens.

- Appearance: System, Light, Dark; default System; persist across restarts and respond to OS theme changes in System mode.
- About: show installed native version and build via `expo-application`; show privacy and help/setup links when available.
- Updates: open the platform's actual app-store listing once configured; before publication show that a public listing is unavailable, not a dummy link.
- No app-wide registration, subscription screen or account settings in v1.
