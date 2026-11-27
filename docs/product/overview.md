# Product overview, problem and audience

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 1. Executive summary

Agent Inbox is a mobile-first, provider-independent client for AI agents that already run on user-owned computers, servers or supported hosted services. Instead of switching among messaging apps and individual agent dashboards, a user adds agent connections to one inbox, opens a conversation, sends instructions and sees the result.

The product does not supply a new AI model, run the user's agent locally on the phone, or require a company-hosted backend for the MVP. The agent owner remains responsible for execution, model subscriptions, tools, connected accounts and network access. The app owns the presentation, local conversation history and secure connection credentials.

**Strategy:** Build the WhatsApp-like inbox first; position the product as a Universal AI Agent Control Center; evolve into a multi-agent operating platform only when there is evidence of demand and supported integrations.

**First baseline success story:** A developer already running Hermes installs the app, connects a private HTTPS endpoint, sends a simple task, watches the response stream, closes the app, reopens the saved conversation and disconnects securely.

This document expands the original `agent-inbox-mvp.md` (not included in this repository; this specification fully supersedes it) and the subsequent product discussion. Requirements marked **MVP** are the recommended implementation baseline; implementation details, targets and later phases are proposals unless explicitly agreed. The original Hermes/Nod baseline is retained as the first engineering milestone; the expanded hosted-agent scope in Section 23 is a required discovery workstream, not a claim of working integrations. The project is fully open source under the MIT License (`LICENSE`). The brand and any future optional services remain undecided. The full product success story requires in-app send and receive with all five existing agents; see §24.

## 2. Problem, audience and differentiation

### 2.1 Problem

Developers and AI power users run multiple agents on laptops, home servers and VPSs. They frequently need a phone to interact with those agents, yet must configure different messaging bots, remember separate URLs, switch applications and manage credentials independently. Existing agent integrations are heterogeneous: not every agent exposes the same API or supports background tasks, approvals or cancellation.

### 2.2 Target users

| Persona | Primary need | Priority |
|---|---|---|
| Self-hosted Hermes developer | Send and review tasks away from a computer | First release |
| AI power user running multiple agents | One directory and consistent chat experience | Early adopter |
| Developer building a custom agent | Connect through a documented adapter | Later |
| Non-technical personal-agent owner | Guided setup without networking expertise | Later |
| Team / organization | Shared access, policies and auditing | Later |

The initial audience is technical. Do not design the MVP around teams, enterprise compliance or a zero-configuration consumer onboarding promise.

### 2.3 Jobs to be done

- When I am away from my computer, I want to talk to my running agent from my phone.
- When I run several agents, I want to find the right one without switching applications.
- When an agent is working, I want truthful feedback rather than guessing whether the task succeeded.
- When I return to the app, I want my locally saved conversation to remain available.
- When I stop using an agent, I want to remove its credential from my device.

### 2.4 Positioning and hypotheses

**Category:** Universal AI agent client / remote agent control center.

**Differentiation hypothesis:** Multi-provider support, a consistent interaction model, user-owned infrastructure and eventually task controls may be more valuable than a single-provider mobile chat interface. This is a hypothesis, not a validated market advantage. Test it with early users before expanding integration count.
