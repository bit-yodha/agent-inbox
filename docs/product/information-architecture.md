# Product information architecture

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 4. Product information architecture

```text
Agent Inbox
├── Agents (home)
│   ├── Add agent
│   │   ├── Hermes setup / test
│   │   ├── Nod setup / open browser
│   │   ├── Dot / Grok Slack authorization, binding and probe
│   │   └── Muse mailbox authorization, binding and probe
│   ├── Hermes conversations
│   │   ├── New conversation
│   │   └── Chat
│   ├── Nod details → system browser (until native verified)
│   └── Verified hosted conversation → async chat / sync status
├── Agent settings (per agent)
└── App settings
    ├── Appearance
    ├── About
    └── Updates
```

Future navigation may add Tasks, Approvals and a unified activity inbox. Do not ship empty tabs or fake functionality in v1. Use the home screen as the entry point, with a prominent Add Agent action and a settings gear.
