# Agent Inbox — coding agent instructions

## Mission and source of truth
Build a mobile-first universal client for users' **existing** AI agents: Hermes, Nod, ChatGPT Dot, Grok Bot and Meta Muse. Send user instructions and receive authentic replies in the same native app. Do not create substitute agents or generic LLM chats.

Read these files before modifying anything:
1. `Product.md`, the index of the specification, and every document it links, in full. §§23–24 refine earlier requirements and take precedence. §24.15 (`docs/hosted-agents/owner-prerequisites.md`) records the owner's existing Dot–Slack setup.
2. `docs/architecture/README.md` and the documents it maps, plus `docs/security/threat-model-and-privacy.md`. These hold the technical design moved out of `Product.md`; `Product.md`'s section index links every section number to its file.
3. `docs/screens/README.md` and the per-screen specifications S01–S07 (former `Product.md` §5) before building or changing any screen.
4. `Roadmap.md` for gate order, dependencies and exit criteria.
5. `docs/design/agent-inbox-ui.html` and `docs/design/images/` for visual reference. Sample responses and states are simulated, not integration evidence.
6. `spikes/slack-dot/README.md` before attempting a live probe.

Start at Gate 0A. No hosted integration is verified merely because the UI prototype or a mock test works.

If requirements conflict, prioritize safety and official supported provider behavior, then the latest spec, then roadmap and design. Record the conflict and an ADR; do not silently change the product scope.

This is the canonical instruction file for coding agents and contributors. `CLAUDE.md` exists only so Claude Code loads these instructions; it imports this file and must not contain rules of its own. Do not add other parallel instruction files (`agent.md` and similar); put new rules here.

## Current state and commands
Planning and technical discovery only. There is no app code, no `package.json`, and no build, lint or test command yet. The Expo/TypeScript scaffold, CI (lint, strict typecheck, tests) and their commands arrive in Roadmap Gate 1. Add the real commands to this section once they exist; don't guess them before then.

The only runnable code is the Gate 0A Slack spike (Node.js 20+, no dependencies):

```sh
# Lists the token owner, workspace and IM channel/peer IDs only. Sends nothing.
SLACK_USER_TOKEN=... node spikes/slack-dot/dot-slack-poc.mjs list

# Sends ONE real Slack message to the owner's existing Dot DM, then polls for 2 minutes.
SLACK_USER_TOKEN=... node spikes/slack-dot/dot-slack-poc.mjs test <D_CHANNEL> <EXPECTED_AGENT_USER_ID>
```

`test` mode posts to a real person's conversation. Run it only after the owner explicitly consents to that specific run. Never rerun it after a timeout or an INCONCLUSIVE result until the earlier send has been reconciled. The token comes from the owner's local environment; never ask for it in chat.

Environment: Windows host with both Git Bash and PowerShell. Commit or push only when asked.

## Document conventions
- `Product.md` is the index: every section's content lives in `docs/` and the section index in `Product.md` links every section number to its file. Edit content in `docs/`, never in `Product.md`; when a section is added or moved, update the section index and the folder table in `Product.md`.
- §§23–24 override §§1–22 wherever the content now lives. Superseded sections carry an explicit pointer note to the governing section. Keep that convention when editing.
- Architecture lives in `docs/architecture/` and security in `docs/security/`; change the design there, not in `Product.md`. Keep the § numbers in headings so cross-references still resolve, and update the section map in `docs/architecture/README.md` when a section moves. The same precedence applies inside those files.
- Screen behavior lives in `docs/screens/` (one file per screen ID, S01–S07); change it there, not in `Product.md`. `docs/screens/hosted-connection-setup.md` (§24.3) hosted-agent states extend and override those screens.
- Gates: use only the `Roadmap.md` numbers (0A, 0B, 1–6). The old §16 numbering in `Product.md` is historical.
- Acceptance IDs C01–C16 (former `Product.md` §24.12) and their gate mapping live in `docs/testing/acceptance-tests.md`; change them there. `Roadmap.md` exit criteria stay authoritative for which IDs each gate needs.
- Evidence: record live, redacted results in `docs/integrations/` from `TEMPLATE.md`, marked PASS, FAIL, BLOCKED, MOCK ONLY or NOT RUN. A mock, the design or an HTTP acceptance is never evidence of a working integration.
- Decisions: record each one as `docs/adr/ADR-NNN-<slug>.md` from `docs/adr/TEMPLATE.md`. The project is fully open source under MIT (`LICENSE`), so every dependency must have an MIT-compatible license.

## Changelog conventions
- Maintain `CHANGELOG.md` following [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).
- Record notable repository changes under `## [Unreleased]` using only the standard subsections (`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`), omitting empty ones.
- On release, move `[Unreleased]` items into `## [<version>] - YYYY-MM-DD`, reset `## [Unreleased]`, and update the bottom comparison links.
- Keep entries factual and redacted: never log tokens, credentials, or private messages, and never describe mocks, discovery spikes, or UI prototypes as verified live integrations.

## Architecture map
There are two distinct integration families. Don't merge their models:

| | Direct (Hermes, Nod) | Hosted async (Dot, Grok via Slack; Muse via Gmail) |
|---|---|---|
| Contract (`docs/architecture/adapters.md`) | §8 `NativeChatAdapter` / `BrowserAdapter` | §24.6 `Binding`, `SendReceipt`, `IncomingEvent`, `TwoWayAdapter` (§23.4 is superseded) |
| Request states (`docs/architecture/request-lifecycle.md`) | §11: Pending → Streaming → Complete / Incomplete / Failed / Unknown | §24.7: Pending → Dispatching → Accepted → Waiting → ReplyReceived / Failed / Unknown |
| Storage (`docs/architecture/data-model.md`) | §10: `agents`, `threads`, `turns`, `messages` (one user plus one assistant message per turn) | §24.8: `transport_accounts`, `remote_bindings`, `outbound_requests`, `remote_messages`, `sync_checkpoints`, `integration_probes` |
| Provider contracts (`docs/architecture/providers/`) | `hermes.md` (§9.1, §9.2, §9.4), `nod.md` (§9.3) | `slack.md` (§24.4), `gmail-muse.md` (§24.5) |
| Conversations | Local threads; "New conversation" makes a new thread | One mirror of the real remote DM or email thread; never invent sessions |

- Adapters are grouped by transport (`src/adapters/{hermes,nod,slack,gmail}`), and one Slack or Gmail client serves several agent adapters (§7.3, §24.11).
- A hosted connection goes `unconfigured → authorizing → authorized → binding_pending → bound_unverified → probe_pending → verified` (§24.3). Only `verified`, with valid current credentials, permits ordinary sends.
- A binding is workspace/account ID + owner ID + conversation ID + verified agent identity + binding version. Discard sync results from a stale binding version.

## Working protocol
- Inspect repository state, toolchain and existing tests before making changes. Verify current official API documentation and pinned SDK compatibility before each integration. Start at Gate 0A; Hermes discovery may proceed independently.
- For each task: state scope and acceptance criteria, identify risks, implement a small vertical slice, add tests, run relevant checks, report evidence and unresolved blockers. Do not mark a gate passed without its evidence.
- Preserve user changes. Avoid unrelated refactors, speculative abstractions, dependency churn and broad infrastructure changes. Keep changes reviewable. Do not push, deploy, create external accounts or spend money without the user's instruction.
- Maintain `docs/adr/`, `docs/integrations/`, `CHANGELOG.md` (following [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/)) and the provider status matrix. Document API versions, assumptions and migration/recovery behavior. Use redacted logs; never commit private messages or tokens.

## Architecture and implementation conventions
- React Native, Expo, Expo Router and strict TypeScript. SQLite for metadata/history/outbox/checkpoints, SecureStore for credentials. No mandatory hosted backend, LLM proxy, app-wide login, push notifications or billing in the baseline.
- Separate domain contracts, application use cases, transport clients/adapters, local persistence and UI. Reuse Slack transport for Dot/Grok only after independent verification; Gmail for Muse only after verified email reply; Hermes direct HTTPS/SSE; Nod native only if supported, otherwise labeled browser handoff.
- Prefer explicit types and runtime validation at network boundaries; no unchecked `any`, unsafe casts or hidden global state. Inject clients and clocks for deterministic tests. Use parameterized SQL, transactions, migrations, constraints and account/binding isolation. Keep UI free of network/credential logic.
- Use native system browser OAuth with PKCE S256, random state, exact callbacks and replay rejection. Slack user scopes candidate: chat:write, im:read, im:history. Verify actual owner, workspace and selected DM. Do not embed client secrets or use provider passwords/session cookies. Rotate refresh tokens under a lock; safely persist new bundle; reauthorize on failure.
- Bind every action to current account, provider, conversation, verified counterpart and binding version. Sync scoped pages only; use exact provider IDs (Slack timestamps are strings), transactional upsert and checkpoint, pagination, overlap, deduplication and stale-generation rejection. Never ingest unrelated mailbox/DM contents.
- Persist outbox before dispatch. An accepted receipt is not an agent reply or task completion. A timeout after possible send is outcome unknown; do not replay automatically on restart. Never send automatic replies, follow agent content as instructions, or auto-approve actions. A provider-side action requires explicit user intent and supported capability.
- Respect rate limits/Retry-After and foreground lifecycle. No background delivery guarantee, simulated streaming for hosted replies or unsupported task progress. Never bypass provider restrictions, distribution requirements or security controls. Socket Mode is internal-only under the documented Marketplace constraint; public event delivery needs separate ADR and approval.

## UI and quality
- Follow the supplied 20-screen visual kit (`docs/design/agent-inbox-ui.html` and `docs/design/images/agent-inbox-ui-board-{1..5}.png`, `agent-inbox-ui-light.png`). Support System/Light/Dark themes, accessible contrast, ≥44pt touch targets, screen readers, reduced motion and OS text scaling.
- The visual kit is a v0.2 reference with simulated data, not integration evidence. Extend it using the same tokens/patterns for missing v0.3 states: `docs/screens/hosted-connection-setup.md` §24.3 (transport consent, OS OAuth browser/cancel/error, account selection, DM/address binding, explicit probe consent/states, hosted refresh/`Retry-After`/stale sync, reauthorize, shared-account disconnect) and §§5/11/14 (`Incomplete` turn, non-auth errors, thread rename/delete). In `09 unknown`, gate new sends behind explicit user acknowledgment (unlike the clickable HTML demo).
- Color tokens (`docs/design/agent-inbox-ui.html`):
  - **Dark**: `bg #10131c`, `panel #191e2a`, `sub #212736`, `line #2b3241`, `text #f0f2f8`, `muted #a0a9bd`, `accent #948aff`, `primary #7667ed`, `green #6ed7b2`, `warn #f2bf78`, `danger #ff9a9a` (hero `#4c3d9c → #26223f`, user bubble `#6456d8`, danger action `#b64752`).
  - **Light**: `bg #f7f8fc`, `panel #ffffff`, `sub #edf0f7`, `line #dce1ec`, `text #192235`, `muted #66738a`, `accent #5f50da`, `primary #6354dc`, `green #08775c`, `warn #986012`, `danger #b33f48`.
- Provider badges (glyph, bg / fg): Hermes (`H`, `#483229` / `#ffbe94`), ChatGPT Dot (`◉`, `#173b36` / `#a3e8d0`), Grok Bot (`X`, `#35374d` / `#e4e7ff`), Meta Muse (`✳`, `#233f59` / `#99caff`), Nod (`N`, `#4b293a` / `#ffb0cc`), Generic (`✦`, `#352f58` / `#b4aaff`; app mark `#6f63f6`).
- Screen & layout patterns (20 reference screens): top bar (back, title/subtitle, gear/add/more icon button) → scrollable body → sticky bottom action/composer bar; bottom sheet overlay for destructive confirmations (`18 disconnect`). Pair colored status dots/icons with text labels; render Hermes tool progress inline inside a bordered sub-box separate from assistant prose; show `Source · Last sync` and honest waiting/error states on hosted chats without simulated streaming.
  - Group 01 (`01 empty`, `02 home`, `03 catalog`, `04 hermes`) · Group 02 (`05 hermes-check`, `06 threads`, `07 new-chat`, `08 chat`) · Group 03 (`09 unknown`, `10 nod-setup`, `11 nod-details`, `12 dot`) · Group 04 (`13 grok`, `14 muse`, `15 async`, `16 agent-settings`) · Group 05 (`17 nod-settings`, `18 disconnect`, `19 settings`, `20 failure`).
- Show honest connection, sync, waiting, unknown, failed and unsupported states. Mark unverified catalog entries experimental/unavailable. Browser handoff or webhook acknowledgement does not qualify as native two-way chat.
- Test unit, integration with fixtures, SQLite rollback/dedupe, auth callback/refresh, wrong owner/agent, 429, stream chunking, disconnect/restart and ambiguous send. Test real Android/iOS builds before release. Mock results must be visibly labeled and never substitute for live evidence.
- Run typecheck, lint and tests using repository scripts; introduce CI checks once scaffolded. Never claim commands ran if not executed. Secret scan and review permission scopes before every release.

## Immediate first task
The owner already uses Dot through Slack; do not redo provider setup. Establish a separate development Slack app authorization for Agent Inbox, select the existing owner-to-Dot conversation, validate user token identity and scopes, obtain explicit consent for a harmless nonce probe, send once and retrieve a matching reply from the expected agent identity. Record C02/C03 evidence and repeat a follow-up. Use local environment credentials only, no secrets in chat. The bundled CLI is an internal scaffold, not production OAuth. If API-originated messages fail or access is denied, stop and document the blocker rather than simulating success.

## Completion report format
- Gate / scope and changed files
- Decisions / ADRs and acceptance IDs
- Commands actually run and results
- Live evidence (redacted) versus mock-only evidence
- Security and privacy checks
- Remaining blockers, limitations, and next smallest task
