# Application use cases

Use cases and services that coordinate the domain: send use case, sync coordinator, reconciler, probe, OAuth session and refresh lock. They depend only on domain contracts and receive adapters, repositories, clocks and the vault by injection. See `docs/architecture/system-overview.md` (§24.2, §24.11).
