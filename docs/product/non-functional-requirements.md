# Non-functional requirements and quality targets

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 13. Non-functional requirements and quality targets

The following are proposed acceptance targets on a designated mid-range Android and iPhone test device, not measured results or SLAs. Establish hardware/OS test matrix during discovery.

| Area | Target / requirement |
|---|---|
| Startup | Cached home usable in ≤ 2 seconds on test devices (p95 across 30 cold starts) |
| Local interaction | Cached thread navigation ≤ 300 ms p95 for a typical thread of 100 messages |
| Streaming UI | Visible text updates within 250 ms p95 of parsed delta arrival; batch updates to avoid jank |
| Local recovery | Persist partial reply within 1 second during normal foreground execution; last unflushed data can be lost on kill |
| Reliability | Zero automatic task replays in interruption/restart E2E cases |
| Isolation | Zero cross-agent history/credential leaks in tests |
| Offline | Existing local history accessible without network; no hidden task queue |
| Scalability | Test at least 20 connections, 100 threads, 10,000 stored messages locally; paginate large lists |
| Accessibility | Screen-reader labels, logical focus, dynamic text, contrast and adequate touch targets |
| Security | No unresolved critical/high-severity app vulnerabilities at beta exit without documented mitigation and release decision |
| Maintainability | Strict TypeScript; testable adapter/domain boundaries; versioned migrations |

Agent execution latency and uptime depend on the owner's infrastructure and model provider. Measure time to first response separately from client rendering overhead. No promise that an agent stays available when its host sleeps or that a mobile socket survives backgrounding.
