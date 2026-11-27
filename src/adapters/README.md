# Provider adapters

Adapters grouped by transport, not by provider. Each implements domain contracts, validates raw provider responses at the boundary and returns typed, sanitized errors. An adapter is enabled in the app only after its gate evidence passes (`Roadmap.md`). See `docs/architecture/adapters.md`.
