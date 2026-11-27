# Definition of done (v1)

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 17. Definition of done (v1)

- A new tester can connect their own reachable Hermes gateway from a physical Android and iOS phone without infrastructure hosted by Agent Inbox.
- Test connection is authenticated and does not run a task; invalid connections fail safely.
- A user can send a task, see streamed reply and supported progress, reopen local history and disconnect.
- Interruption is handled truthfully and never auto-replays a task. No secret appears in local relational data, diagnostic logs, URLs or build artifacts.
- Nod is clearly identified as browser-only and opens its HTTPS UI with authentication handled by Nod.
- Hosted-agent discovery report records actual send/receive results for Grok Bot, Muse and Dot. No hosted provider may be labeled fully integrated without passing §23. A baseline beta may ship without them, but the five-agent product milestone is not complete until all five support in-app two-way communication.
- Theme, version/build, store-link behavior and credential deletion are tested.
- Setup guide, compatibility matrix, privacy notes and restricted reviewer demo are available. Signed beta builds are tested on both platforms, all required tests pass, and blocking defects are resolved.
