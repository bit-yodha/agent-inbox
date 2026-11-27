# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Gate 1 foundation scaffold: Expo SDK 58 app from the `default` template with Expo Router (routes in `src/app/`), strict TypeScript, ESLint (`eslint-config-expo`) and Jest (`jest-expo`, React Native Testing Library). The template's demo screens and assets are removed; a placeholder home screen states that no agents are connected. Gate 0A remains open, and no agent or provider UI is included.
- Layered `src/` and `tests/` folders from `docs/architecture/system-overview.md` (§7.3, §24.11), each with a README describing its responsibility.
- npm scripts `lint`, `typecheck` and `test`, with a smoke test for the home screen.
- `Quickstart.md`: command reference for setup, running the app, checks, the Android emulator, the Gate 0A Slack spike and the design prototype.
- `.github/workflows/ci.yml`: lint, typecheck and tests, TruffleHog secret scan and `npm audit` on pull requests and pushes to `main`; dependency review once the repository is public. Pull request template and bug/feature issue forms.
- `docs/architecture/` with the technical design moved verbatim out of `Product.md`: system overview, adapter contracts, data model, request lifecycle and sync, errors and observability, optional event bridge, and per-provider contracts for Hermes, Nod, Slack and Gmail. `docs/architecture/README.md` maps each `Product.md` section to its file.
- `docs/security/threat-model-and-privacy.md` (former `Product.md` §12).
- `docs/product/`, `docs/hosted-agents/`, `docs/delivery/`, `docs/design/design-system.md`, `docs/testing/testing-strategy.md` and `docs/screens/hosted-connection-setup.md`, holding every remaining `Product.md` section moved verbatim. `Product.md` is now an index: each numbered heading links to its document, and a folder table at the top maps folders to sections.
- `docs/screens/` with the screen-by-screen specification moved verbatim out of `Product.md` §5, one file per screen (S01–S07). Its `README.md` maps each screen to the design prototype frames.
- `docs/testing/acceptance-tests.md` with the acceptance tests C01–C16 and evidence template moved verbatim out of `Product.md` §24.12, plus a gate mapping derived from `Roadmap.md`.
- `CLAUDE.md`, which only imports `AGENTS.md`.
- `AGENTS.md` sections for current state and commands, document conventions and an architecture map.
- `Quickstart.md` with project setup, Expo/quality scripts (`start`, `android`, `ios`, `web`, `typecheck`, `lint`, `test`), Android/Orca emulator commands, Gate 0A Slack spike commands, and UI prototype launch commands.

### Changed

- Renamed the master specification `agent-inbox-product-spec-v0.3.md` to `Product.md`, now a compact index (under 80 lines): a folder table plus a section index that lists every section number (§1–§24.15) with a link to the document that holds it.
- `Roadmap.md` is the authoritative gate plan (Gates 0A, 0B, 1–6). The old `Product.md` §16 gate numbering is marked as superseded, and credential rotation moved into Roadmap Gate 1.
- `Product.md`: the repository layout groups adapters by transport and uses `docs/adr/` and `docs/integrations/`. Direct and hosted status labels and contracts are scoped explicitly, §23.4 is marked as superseded by §24.6, and the licensing text records the MIT decision.
- Rewrote `README.md` for the open-source project's current status, document map and license.
- Moved the design reference from `design/` to `docs/design/` (`agent-inbox-ui.html` and `images/`).

### Removed

- `agent.md`. Its instructions were merged into `AGENTS.md`, the single canonical instruction file.
- Duplicate design copies `design/agent-inbox-ui-kit/` and `design/agent-inbox-ui-kit.zip`. `docs/design/agent-inbox-ui.html` and `docs/design/images/` are the single design reference.

### Fixed

- The §11 request state diagram in `docs/architecture/request-lifecycle.md` failed to render: a semicolon in the label `local record retained; no auto-replay` ended the Mermaid statement early. It is now a comma, and all seven Mermaid diagrams in the docs pass validation.
