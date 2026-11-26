# Gmail transport (Meta Muse)

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md`'s section index links each number here. [`docs/architecture/README.md`](../README.md) maps every moved section to its file. Precedence is unchanged: material from §§23–24 overrides material from earlier sections, and superseded passages carry an explicit note.

## 24.5 Muse transport — authorized email bridge

Prerequisites: existing Muse personal address and owner-verified sender mailbox configured through Muse's official UI. Confirm a manual email instruction and whether a reply actually returns. Use the native Google OAuth authorization-code/PKCE flow or a supported native sign-in SDK; register correct Android package/signing identity and iOS bundle/redirect identity. No web-client secret in a mobile build. Verify selected mailbox identity and ensure it matches the Muse-verified sender. Do not impersonate a sender or use an arbitrary From alias.

Candidate scopes: `https://www.googleapis.com/auth/gmail.send` for sending; `https://www.googleapis.com/auth/gmail.readonly` for reading reply bodies. `gmail.send` is sensitive and `gmail.readonly` is restricted. Application filtering is not an OAuth permission boundary: the readonly grant is broader than the selected Muse address. Explain this before consent; prefer a dedicated test mailbox and request no modify/delete/full-mail scopes. Investigate narrower officially available scopes if suitable. Public distribution requires Google verification and policy review; server handling of restricted data can require a security assessment. Do not imply these approvals have been obtained.

| Gmail REST operation | Use |
|---|---|
| `GET /gmail/v1/users/me/profile` | Confirm owner mailbox (with supported read scope) |
| `POST /gmail/v1/users/me/messages/send` | Explicit user task; MIME text/plain, base64url raw, exact recipient |
| `GET /gmail/v1/users/me/messages?q=...` | Bounded, encoded query for configured address and recent relevant threads |
| `GET /gmail/v1/users/me/messages/{id}` | Read only matching candidate messages and revalidate headers |
| `GET /gmail/v1/users/me/threads/{id}` | Retrieve matching thread if required; filter each message |
| `GET /gmail/v1/users/me/history` | Optional incremental sync after a full scoped baseline; handle stale history ID |

Create a unique request UUID and a standards-compliant Message-ID if supported by the mail flow, sanitized subject `Agent Inbox task [<nonce>]`, and body with the user's exact instruction plus an explicit request for reply when supported. Prevent CRLF/header injection. Store the Gmail returned message ID/thread ID and actual sent headers if needed for matching; do not assume provider preserves custom headers. Correlate with exact normalized sender, recipient, thread ID, `In-Reply-To`/`References`, and nonce where available. Check trusted mail authentication signals and validate known agent address; do not trust display name or a copied subject alone. Uncertain sender or correlation stays quarantined/unlinked and never triggers another action. Display only scoped plain-text/sanitized reply content; do not load remote HTML, tracking images or attachments. Do not mark a message as read or modify mailbox labels automatically. No email is sent from sync.

First PoC: explicit probe from verified owner account → existing Muse address → accepted Gmail send → actual authenticated reply back to the same mailbox → scoped retrieval inside app → follow-up. If only task submission works, mark trigger-only/experimental and do not advertise two-way chat. WhatsApp remains an official human-facing alternative, not an authorization to automate a personal WhatsApp session.
