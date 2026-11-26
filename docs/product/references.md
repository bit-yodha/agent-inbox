# References and evidence

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 22. References and evidence

- Original user-supplied source: `agent-inbox-mvp.md` (problem, v1 scope, screens, stack, acceptance checks). Historical only; not included in this repository and fully incorporated into this specification.
- Subsequent product discussion: inbox → universal control center → multi-agent platform; proposed developer-first audience. The earlier open-core idea was replaced by a fully open-source MIT decision (`LICENSE`).
- [Hermes official API server documentation](https://hermes-agent.nousresearch.com/docs/user-guide/features/api-server) — current API routes, streaming, terminal semantics, capabilities and future run controls.
- [Nod official self-hosting documentation](https://nod.n8n.io/docs/deploy/self-host/) — supported server setup and authentication boundaries.
- [Expo streaming fetch documentation](https://docs.expo.dev/versions/latest/sdk/expo/), [SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/), [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/), [Application](https://docs.expo.dev/versions/latest/sdk/application/), [Submit guide](https://docs.expo.dev/deploy/submit-to-app-stores/).

Official Hermes, Nod, Expo streaming/storage documentation was checked while drafting. The spec itself is not a compatibility test, security audit, market study or guarantee of store approval. Suggested metrics, architecture refinements, schema, error policies, design details, testing tools and business model are proposed decisions for review.

## 24.14 Additional official references (checked November 27, 2026)

- [Slack native-client PKCE](https://docs.slack.dev/authentication/using-pkce/) — user-only native OAuth, code exchange and rotating refresh credentials.
- [Slack history](https://docs.slack.dev/reference/methods/conversations.history/), [thread replies](https://docs.slack.dev/reference/methods/conversations.replies/), [message send](https://docs.slack.dev/reference/methods/chat.postMessage/), [rate limits](https://docs.slack.dev/apis/web-api/rate-limits/), [commercial app distribution and method limits](https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps/), [internal app clarification](https://docs.slack.dev/changelog/2025/06/03/rate-limits-clarity/).
- [Slack Events API](https://docs.slack.dev/apis/events-api/), [Socket Mode and Marketplace limitation](https://docs.slack.dev/apis/events-api/using-socket-mode/).
- [Google Gmail scopes](https://developers.google.com/workspace/gmail/api/auth/scopes), [send method](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send), [restricted scope verification](https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification), [OAuth policy compliance](https://developers.google.com/identity/protocols/oauth2/production-readiness/policy-compliance).

These references confirm transport capabilities and policy constraints, not permission to interact with any specific personal agent. Provider-specific evidence and links from §23 are retained. This revision has not executed actual provider calls, authenticated accounts, built a native app, or completed security/Marketplace/OAuth/store reviews. Final product name, ownership, launch subset and optional backend remain open; licensing is decided (MIT, `LICENSE`). Proposed schemas, intervals, callback scheme, UX and bridge contracts require implementation validation.
