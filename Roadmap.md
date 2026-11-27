# Agent Inbox — implementation roadmap v0.3

Status: planning / technical discovery. This roadmap implements §24.13 of the master specification (`Product.md`) and is the authoritative gate plan; the former §16 gate numbering is superseded and its content is folded into the gates below. All stages below are pending implementation unless explicit evidence says otherwise. Estimates and calendar deadlines are not committed.

## Current state

| Provider | Candidate route | Evidence today |
|---|---|---|
| ChatGPT Dot | Slack user OAuth + PKCE, Web API | Owner reports manual Slack two-way communication working; app API PoC pending |
| Grok Bot | Slack; optional routine trigger only | Separate two-way test pending |
| Meta Muse | Gmail authorized mailbox | Manual and programmatic reply tests pending |
| Hermes | Private HTTPS REST/SSE | Documented interface; real device test pending |
| Nod | Supported native API if found | Native discovery pending; browser fallback only |

Existing deliverables: v0.3 requirements, 20-screen simulated HTML design, six visual boards, internal Node.js probe scaffold. No production mobile app, OAuth approvals or native tests are asserted.

## Gate 0A — Dot proof of concept (start here)

- [ ] Confirm intended workspace/account and existing Dot DM with the owner. Manual setup is already reported working; no new Dot required.
- [ ] Create separate Slack developer app for Agent Inbox; validate user scopes, app installation permission and eligible development token. Register native PKCE configuration for later mobile testing.
- [ ] Run `auth.test`, list eligible IM metadata, verify owner/workspace/peer/binding. Do not read unrelated histories.
- [ ] With consent, send a unique no-action probe once. Retrieve actual reply in history or supported thread and verify same counterpart plus nonce. Record acceptance receipt separately.
- [ ] Repeat follow-up; compare manual control and verify the same agent, not a substitute. Test missing permissions, wrong binding, rate limiting and ambiguous send.
- [ ] Record redacted C02/C03 evidence or an explicit blocker in `docs/integrations/`.

Exit: actual supported two-way API path evidenced or blocker documented. Do not enable Dot UI on failed/inconclusive probe. C01 mobile OAuth belongs to Gate 3.

## Gate 0B — parallel provider discovery

- [ ] Hermes: authenticated `/v1/models`, model selection, `/v1/chat/completions` SSE, real Android/iOS networking and stream interruption. Keep raw port private; use reachable trusted HTTPS.
- [ ] Grok Bot: independently verify existing authorized Slack conversation, same-agent API-originated probe and reply; webhook receipt alone is insufficient.
- [ ] Muse: verify owner mailbox and exact agent address; manual email control, authorized send and authentic correlated reply, follow-up; review Gmail scopes and distribution requirements.
- [ ] Nod: verify self-hosting and phone reachability; identify supported native send/receive interface; retain labeled browser handoff if blocked.
- [ ] Record official sources, permissions, device results and policy restrictions for each provider.

Exit: provider matrix with explicit pass/fail/blocked, C04–C07 evidence where available. No requirement to fake unsupported providers.

## Gate 1 — mobile foundation and Hermes baseline

- [ ] Bootstrap Expo/TypeScript, Expo Router, CI (lint, typecheck, test), development builds and environment config.
- [ ] Implement domain contracts, capability registry, SQLite migrations/repositories, SecureStore vault and test fixtures.
- [ ] Build home, catalog, direct connection settings, local threads, chat and appearance/About/Updates from design reference.
- [ ] Implement verified Hermes direct adapter, streaming parser, history persistence, unknown outcome recovery and secure disconnect. Include honest Nod browser handoff if appropriate.
- [ ] Implement agent settings: connection editing, re-check, token re-entry on origin change and credential rotation (validate candidate, stage secret, commit reference, delete old; recover from partial failure per §10).
- [ ] Validate baseline §§15–17 acceptance cases, physical-device behavior and accessibility.

Exit: working baseline for enabled verified direct provider(s), no secrets in logs or bundle, regression checks pass. Blocked adapters remain unavailable.

## Gate 2 — shared async communication engine

- [ ] Add transport accounts, bindings, outbound requests, remote messages, sync checkpoints and probes with migrations and unique identity constraints.
- [ ] Implement send-use-case, persisted state machine, explicit-only dispatch, conservative reconciliation and per-binding locks.
- [ ] Implement foreground scheduler, scoped pagination, deduplication, transactional checkpoint, stable ordering, rate limiting and stale-generation protection.
- [ ] Implement OAuth lifecycle abstractions, credential refresh locking, account isolation and shared-account disconnect semantics.
- [ ] Add fixtures for delayed/unlinked/threaded replies, out-of-order events, app kill, DB rollback, duplicate pages, 429 and accepted-then-timeout.

Exit: deterministic fault and contract tests pass; C08–C14 applicable engine behavior verified in fixtures, not claimed as live provider results.

## Gate 3 — verified Slack integrations

Depends on Gate 2 and independent provider PoC success.

- [ ] Configure separate dev/prod native Slack OAuth client settings, exact redirect URI, PKCE S256, state and callback validation.
- [ ] Implement account selection, binding, consented probe, verified connection, async chat, sync status, refresh and reauthorization.
- [ ] Add Dot first and Grok independently if its probe passes. Mirror real remote DM/thread context without inventing separate agent sessions.
- [ ] Verify real Android and iOS consent, refresh, cancellation, restart, message sending/receiving, no duplicated tasks and account isolation.
- [ ] Document Slack installation class, history/replies quotas and public Marketplace policy. No Socket Mode default for public release.

Exit: C01–C04 and C08–C14 applicable tests pass on both OSes for enabled Slack adapters.

## Gate 4 — verified Muse and Nod native

- [ ] Implement Gmail OAuth via supported native approach and least necessary scopes with clear consent disclosure; maintain exact verified sender/recipient binding.
- [ ] Implement MIME send, scoped retrieval, sender authentication/correlation, sanitized message text, no mailbox modification and no reply automation.
- [ ] Implement Nod native adapter only with official supported route and successful two-way tests; otherwise retain honest browser-only status.
- [ ] Run applicable lifecycle, security, permission, sync and correlation tests.

Exit: C05/C07 and relevant C08–C15 pass where enabled; unavailable integrations not represented as native support.

## Gate 5 — beta

- [ ] Complete all screen states including OAuth denial, binding, probe, stale sync and reauthorization; compare against v0.3 requirements beyond existing design boards.
- [ ] Full unit/contract/device/E2E regression, migration and security review, privacy notice and sanitized diagnostics.
- [ ] Provide reviewer-safe demo using limited credentials/sample data; visible demo label for simulated adapters.
- [ ] Build signed Android internal test and iOS TestFlight releases using EAS; verify real installed version, updates and theme settings.
- [ ] Collect opt-in beta feedback, fix blocking defects, update status matrix and acceptance evidence.

Exit: enabled provider acceptance tests passed and reviewed, release candidate documented; not necessarily all five agents.

## Gate 6 — public release

- [ ] Verify provider terms and Slack Marketplace / Google OAuth verification requirements, App Store / Play policies, account entitlement, privacy disclosures and any security assessment.
- [ ] Approve actual launch subset, final brand and distribution. License is decided (MIT, `LICENSE`); re-check dependency license compatibility before release. No misleading claims, simulated connectors or unsupported permissions.
- [ ] Publish supported-device and integration setup documentation, recovery steps and release notes; establish defect triage.

Exit: explicit launch approval; C15–C16 evidence and all relevant prior tests. Full five-agent milestone is achieved only when each existing agent has verified native in-app send and receive.

## Later roadmap (not MVP commitments)

Universal Agent Client: additional supported adapters, capability discovery and easier setup. Agent Control Center: supported durable runs, monitoring, approval/cancel and recovery. Agent Ecosystem: community SDK and optional services (the client stays fully MIT open source and must not depend on them). Multi-Agent Operating Platform: evidence-driven cross-agent orchestration with separate security review. Optional event bridge, push notifications, sync, teams, monetization and branding require separate decisions.

## Tracking rule

For each checkbox attach a test log, PR or redacted evidence link. Use `PASS`, `FAIL`, `BLOCKED`, `MOCK ONLY` or `NOT RUN` explicitly. No checkbox becomes done because a design or mock exists. Revisit dependencies before starting work in later gates.
