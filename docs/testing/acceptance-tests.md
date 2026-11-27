# Acceptance tests and integration evidence

> Moved verbatim from `Product.md` §24.12 into this file. `Product.md`'s section index links §24.12 here. Baseline (Hermes/Nod) test requirements are in [`testing-strategy.md`](testing-strategy.md) (§15); screen-level acceptance lines are in [`docs/screens/`](../screens/README.md).

## 24.12 Acceptance tests and integration evidence

| ID | Test | Pass criteria |
|---|---|---|
| C01 | Slack OAuth PKCE | Real Android/iOS development build completes owner consent without secret in bundle; wrong state/replay/cancel rejected |
| C02 | User identity and binding | Exact owner/workspace and agent conversation verified; no bot-token substitution or unrelated DM ingestion |
| C03 | Dot manual control + API probe | Same existing Dot replies to nonce sent from official API; in-app retrieval and follow-up work |
| C04 | Grok manual control + API probe | Same Grok Bot replies in authorized location; webhook-only not considered pass |
| C05 | Muse manual control + API probe | Verified sender and existing Muse address; authentic correlated reply visible in app; follow-up works |
| C06 | Hermes native | Earlier stream tests pass; local history and direct reply are preserved |
| C07 | Nod native | Official supported route demonstrates two-way send/receive; browser-only remains honest if blocked |
| C08 | Correlation | Out-of-order, delayed, unlinked, threaded and unsolicited messages display correctly; no invented completion |
| C09 | Sync durability | Overlap, pagination, duplicate events, DB rollback, app kill/reopen, stale checkpoint; no lost committed pages or duplicates |
| C10 | Ambiguous send | Simulated accepted-then-network-loss; app never silently resends; later real reply reconciles only with evidence |
| C11 | Credential refresh/revocation | Concurrent refresh serializes; missing/revoked token blocks sends; shared-account disconnect semantics correct |
| C12 | Rate limiting | 429 and Retry-After honored across concurrent adapters, refresh and resume; no quota bypass |
| C13 | Isolation | Wrong workspace, thread, account, sender and stale binding generation rejected; no unrelated mailbox contents stored |
| C14 | Mobile lifecycle | Background/kill/resume/offline and OS callbacks tested on both platforms; no false live state or background delivery promise |
| C15 | Safety/privacy | Sanitized MIME/Markdown, header injection blocked, token scan clean, no auto-reply/approval, privacy disclosure and store review ready |
| C16 | Public distribution | Slack Marketplace eligibility and Gmail verification/assessment as applicable documented, plus provider terms review |

Evidence template per provider: version/date, entitlement and region, test owner account alias (not secret), transport, permissions, sanitized binding alias, manual-control result, API send receipt, actual agent reply evidence, correlation evidence, failure tests, OS/device results, remaining limitations, reviewer and pass/fail/blocked. Store redacted evidence in `docs/integrations/`; do not attach actual private chat logs. Automated mocks and contract fixtures are necessary but not sufficient.

## Gate mapping

Added for navigation; derived only from the exit criteria in [`Roadmap.md`](../../Roadmap.md), which remains authoritative. Fixture results count as engine evidence only, never as live provider results.

| Roadmap gate | Acceptance IDs required |
|---|---|
| 0A — Dot proof of concept | C02, C03 (or a documented blocker) |
| 0B — parallel provider discovery | C04–C07 where available |
| 2 — shared async engine | C08–C14 applicable behavior, verified in fixtures |
| 3 — verified Slack integrations | C01–C04 and C08–C14 as applicable, on Android and iOS |
| 4 — verified Muse and Nod native | C05, C07 and relevant C08–C15 where enabled |
| 6 — public release | C15, C16 plus all relevant prior tests |

Record each result in `docs/integrations/` (from `TEMPLATE.md`) as PASS, FAIL, BLOCKED, MOCK ONLY or NOT RUN.
