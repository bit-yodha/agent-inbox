# Screen specifications

Functional specification for each app screen, moved verbatim out of `Product.md` §5 (one file per screen). `Product.md`'s section index links §5 here.

**Status:** proposed behavior; no screen is implemented yet. The design prototype (`docs/design/agent-inbox-ui.html`) is a visual reference only. Its data and connection results are simulated.

**Precedence:** these files carry the baseline (§5) requirements. Hosted-agent setup and chat states in [`hosted-connection-setup.md`](hosted-connection-setup.md) (§24.3: provider catalog, transport setup, OAuth browser, account selection, agent binding, identity and two-way verification, hosted chat, reauthorize, disconnect) and the UX rules in [`../hosted-agents/ux-and-security-requirements.md`](../hosted-agents/ux-and-security-requirements.md) (§23.5) extend and override them for Dot, Grok and Muse. Status labels: [`../design/design-system.md`](../design/design-system.md) (§6). Navigation tree: [`../product/information-architecture.md`](../product/information-architecture.md) (§4).

## Screens

| ID | Screen | Spec | Prototype frames (`docs/design/agent-inbox-ui.html`) |
|---|---|---|---|
| S01 | Agents (home) | [`s01-agents-home.md`](s01-agents-home.md) | 01 Welcome / empty inbox, 02 Agents / home |
| S02 | Add Agent | [`s02-add-agent.md`](s02-add-agent.md) | 03 Provider catalog, 04 Hermes setup, 05 Connection result, 10 Nod setup, 12–14 Dot / Grok / Muse setup, 20 Connection error |
| S03 | Hermes conversations | [`s03-hermes-conversations.md`](s03-hermes-conversations.md) | 06 Conversations, 07 New conversation |
| S04 | Hermes chat | [`s04-hermes-chat.md`](s04-hermes-chat.md) | 08 Hermes chat, 09 Interrupted chat |
| S05 | Nod details | [`s05-nod-details.md`](s05-nod-details.md) | 11 Nod details |
| S06 | Agent settings | [`s06-agent-settings.md`](s06-agent-settings.md) | 16 Agent settings, 17 Nod settings, 18 Disconnect confirmation |
| S07 | App settings | [`s07-app-settings.md`](s07-app-settings.md) | 19 App settings |
| — | Hosted connection setup and UI contract (§24.3) | [`hosted-connection-setup.md`](hosted-connection-setup.md) | 12–14 setup concepts, 15 Hosted agent chat; most §24.3 states have no frame yet |

Prototype frame 15 (hosted agent chat) is a conditional future state with no baseline screen; its requirements are the "Hosted chat" row of [`hosted-connection-setup.md`](hosted-connection-setup.md) (§24.3). The prototype predates v0.3 and has no frames for the §24.3 OAuth, binding, verification and reauthorization states.

## Maintaining these documents

- Change screen behavior here, not in `Product.md`. Keep the screen ID (S01–S07) in each title so references stay stable.
- A new screen gets the next ID (S08, …), its own file and a row in the table above.
- Keep each screen's **Acceptance** line testable; acceptance results belong in `docs/integrations/` or test logs, not here.
