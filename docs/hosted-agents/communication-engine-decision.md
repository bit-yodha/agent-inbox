# Two-way communication engine: decision, invariants and release boundary

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 24.1 Decision, invariants and release boundary

**Product requirement:** a user can send an instruction from Agent Inbox and receive a reply from their *existing* personal agent inside Agent Inbox, preserving the agent's provider-managed identity, memory, permissions and connected tools. A generic model API, a webhook receipt, a browser launch or a simulated response is not an equivalent integration. All five agents are P0 discovery targets; Hermes remains the first verified native-chat target, while Dot is the first proposed hosted-agent spike and Grok reuses the Slack transport if compatible. Muse and Nod native discovery can proceed in parallel. This is a priority decision for implementation, not evidence that any hosted integration works.

Prefer official native APIs; use user-authorized messaging transports only when documented and permitted. No mandatory company-operated runtime backend in the baseline. The optional bridge in §24.9 is an architecture proposal, not a committed cloud service. If a provider requires a prohibited or unsupported route, stop that adapter, document the blocker and retain truthful availability labels. No scraping, session-cookie extraction, password collection, unsupported mobile APIs, bot loops or access-control bypass.
