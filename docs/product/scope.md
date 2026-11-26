# Product scope and release boundaries

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 3. Product scope and release boundaries

| Capability | v1 MVP | v1.x / later |
|---|---|---|
| Multiple saved connections | Yes | Agent groups, discovery |
| Hermes | Native text chat and streamed replies | Durable runs, approvals, cancellation |
| Nod | Saved URL and system-browser handoff | Native chat if a supported interface is validated |
| Local threads / messages | Yes | Search, export, optional sync |
| Credentials | SecureStore per direct connection; user-authorized account OAuth and rotation for verified hosted transports (§24) | Expanded scoped auth and credential management |
| Appearance / About / Updates | Yes | Advanced preferences |
| App account / centralized service | No | Optional only |
| Task dashboard, background orchestration | No | Capability-gated |
| Push notifications | No | Requires a separately designed delivery mechanism |
| Grok Bot / Meta Muse / ChatGPT Dot | Required discovery; enable only individually verified transports (see §23) | Two-way in-app communication with the existing personal agents; native APIs when available |
| Claude Code / Codex / OpenCode / OpenClaw | No | Candidate integrations, subject to discovery |
| Voice, images, file uploads | No | Later |
| Team workspaces, billing, marketplace | No | Later |

No provider must be advertised as natively supported before end-to-end verification. Browser handoff is not native chat or a verified connection. Sign in with a provider, where supported, does not imply access to that user's existing personal agents or subscription benefits outside the provider's documented terms.
