# Agent Inbox

**All your agents. One inbox.**

Agent Inbox is an open-source, mobile-first app (Android and iOS) for talking to the AI agents you **already** use, in one place. You send an instruction from the app and get the real reply from your existing agent: its own identity, memory, permissions and tools. Agent Inbox never swaps in a generic chatbot or simulates a reply.

Target agents:

| Agent | Planned route | Status |
|---|---|---|
| Hermes | Direct private HTTPS with streamed replies | Not yet tested |
| ChatGPT Dot | Your own Slack account (OAuth), Slack Web API | Owner uses Dot in Slack manually; API test pending (Gate 0A) |
| Grok Bot | Slack, tested separately from Dot | Not yet tested |
| Meta Muse | Your own Gmail mailbox (OAuth) | Not yet tested |
| Nod | Native API if one is supported; otherwise opens in the browser | Not yet tested |

An agent is enabled in the app only after its real two-way test passes. See the provider matrix in [`Roadmap.md`](Roadmap.md).

## Project status

**Planning and technical discovery. No app code exists yet.**

The repository currently holds the specification, the roadmap, a clickable design prototype and one internal test script. No live provider test has run. No OAuth app, store listing or security review exists yet. Work starts at **Gate 0A**: proving that a message sent through the Slack API reaches the owner's existing ChatGPT Dot and that Dot's reply can be read back.

## Documents

| File | Purpose |
|---|---|
| [`Product.md`](Product.md) | Index of the product specification: every numbered section links to its document in `docs/`. §§23–24 take precedence over earlier sections. |
| [`docs/product/`](docs/product/) | Overview, scope, information architecture, non-functional requirements, future roadmap, launch and project direction, decisions and risks, references. |
| [`docs/hosted-agents/`](docs/hosted-agents/) | Hosted-agent scope and discovery, UX and security rules, the two-way engine decision and the owner's Dot–Slack prerequisite. |
| [`docs/delivery/`](docs/delivery/) | Implementation handoff and ordered gates, definition of done, former baseline gates and CI/CD. |
| [`docs/testing/`](docs/testing/) | Testing strategy, acceptance tests C01–C16 with pass criteria, the per-provider evidence template, and which Roadmap gate needs each test. |
| [`docs/screens/`](docs/screens/) | Functional specification for each screen (S01–S07) and the hosted connection setup states, mapped to the prototype frames. |
| [`docs/architecture/`](docs/architecture/) | Technical design: system overview, adapter contracts, data model, request lifecycle and sync, errors, optional bridge, and per-provider contracts. Its `README.md` maps each `Product.md` section to its file. |
| [`docs/security/`](docs/security/) | Threat model, privacy and networking rules. |
| [`Roadmap.md`](Roadmap.md) | The official gate plan (Gates 0A, 0B, 1–6), exit criteria and provider status. |
| [`AGENTS.md`](AGENTS.md) | The single instruction file for coding agents and contributors: architecture rules, security rules, evidence requirements. `CLAUDE.md` only imports it. |
| [`docs/adr/`](docs/adr/) | Architecture decision records (template only for now). |
| [`docs/integrations/`](docs/integrations/) | Redacted evidence from live provider tests (template only for now). |
| [`spikes/slack-dot/`](spikes/slack-dot/) | Internal Node.js test script for Gate 0A, with safety notes. Read its README before running anything. |
| [`docs/design/`](docs/design/) | Design system, plus the visual reference (see below). |

Read them in this order: `Product.md` (follow its folder table), then `AGENTS.md`, then `Roadmap.md`.

## Design prototype

Open `docs/design/agent-inbox-ui.html` in a browser to click through the 20-screen prototype. `docs/design/images/` holds the same screens as five dark boards and one light board.

All data and connection results in the prototype are simulated. It was drawn against spec v0.2, so it doesn't yet show the newer OAuth, account-binding, verification and reauthorization screens from `docs/screens/hosted-connection-setup.md` (§24.3).

## Planned stack

React Native with Expo, Expo Router and strict TypeScript. SQLite holds local history and sync state, and SecureStore holds credentials. The app needs no mandatory backend, app account, push notifications or billing. The phone talks directly to your agent or to the account you authorize. See `Product.md` §7 and §24.

## Privacy and security principles

- Credentials stay on your device in SecureStore. They never go into the database, logs, URLs or the repository.
- Only the conversation you pick with each agent is read. Your other Slack DMs and the rest of your mailbox are never imported.
- Nothing is sent without your explicit action. The app never auto-replies, auto-approves or automatically resends a message whose outcome is unknown.
- Slack and email routes pass message content through those providers. Agent Inbox doesn't add end-to-end encryption on top.

## Contributing

Read [`AGENTS.md`](AGENTS.md) first; it applies to people and coding agents alike. Rules for every change:

- Keep changes small and tested.
- Record significant decisions as an ADR.
- Never commit secrets, tokens, private messages or unredacted account IDs.
- Never mark a gate as passed without real evidence: a mock or a design doesn't count.

## License

Agent Inbox is fully open source under the [MIT License](LICENSE).
