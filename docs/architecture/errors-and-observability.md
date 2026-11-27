# Error model, observability and operational requirements

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md`'s section index links each number here. [`docs/architecture/README.md`](README.md) maps every moved section to its file. Precedence is unchanged: material from §§23–24 overrides material from earlier sections, and superseded passages carry an explicit note.

## 14. Error model and observability

Map failures into stable domain codes: `INVALID_URL`, `TLS_OR_NETWORK_FAILURE`, `UNREACHABLE`, `TIMEOUT`, `UNAUTHORIZED`, `FORBIDDEN`, `INCOMPATIBLE_ENDPOINT`, `RATE_LIMITED`, `SERVER_ERROR`, `MALFORMED_STREAM`, `OUTCOME_UNKNOWN`, `CREDENTIAL_UNAVAILABLE`, `STORAGE_ERROR`, `UNSUPPORTED_CAPABILITY`. Use a bounded, sanitized diagnostic string and local correlation ID. Do not display raw stack traces, server response bodies, credentials or private task data in diagnostics. Distinguish definitive rejection from possible admission; an ambiguous 5xx or timeout is not automatically safe to retry.

Measure locally in development/beta: connection-check success, first successful conversation, stream terminal outcomes, unknown outcomes, UI responsiveness, migration errors. Do not silently send telemetry; beta feedback can be voluntary and aggregate. App health and remote agent health are separate concerns.

## 24.10 Errors, security, observability and operational requirements

| Condition | Behavior |
|---|---|
| OAuth cancelled / state mismatch | No credential saved; restart authorization explicitly |
| Token expired | Single-flight refresh; if rejected or rotated token lost, reauthorize; no ambiguous send retry |
| Missing scopes / workspace admin denial | Show exact missing permission/approval; no escalation without consent |
| Account or conversation changed | Invalidate binding/probe and require reconfirmation |
| HTTP 429 | Parse Retry-After, pause scheduler for applicable method/account, expose next allowed sync |
| Send timeout or invalid response | Outcome unknown if dispatch possible; no resend |
| Reply unavailable / agent offline | Waiting or stale; distinguish transport error from agent behavior |
| Spoofed email / unknown sender | Do not correlate or mark verified; discard/quarantine minimally |
| Provider requires approval | Show truthful provider-side guidance; never auto-approve or invent in-app control |
| DB write failure | Keep checkpoint unchanged, stop/alert; recover with deduplicated re-fetch |
| Revoked permission / disconnect | Stop send and sync; remove or disable credential according to policy |

Use structured local diagnostics with request IDs and sanitized error categories, not task text, email contents, tokens, recipient addresses, or raw API payloads. Suggested measurable metrics for test runs: send API acceptance latency, accepted-to-first-verified-reply latency (provider-dependent), reply-to-display latency when app is active and quota permits, duplicates after resync (target zero), cross-account leakage (zero tolerance), unauthorized sends (zero tolerance), credential leakage (zero tolerance). No claim of real-time or SLA for hosted agent responses. Measure polling network/battery usage on physical devices, cap payload sizes and local retention, use OS-protected storage, evaluate SQLCipher/backup exclusion if threat model warrants. Explain intermediary processing and OAuth scope breadth in privacy policy; verify Slack/Google distribution terms and provider usage terms before public rollout.
