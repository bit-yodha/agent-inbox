# Security, privacy and networking

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md`'s section index links each number here. [`docs/architecture/README.md`](../architecture/README.md) maps every moved section to its file. Precedence is unchanged: material from §§23–24 overrides material from earlier sections, and superseded passages carry an explicit note.

## 12. Security, privacy and networking

### 12.1 Threat model and controls

| Risk | Mandatory MVP control |
|---|---|
| Credential theft from logs / storage | SecureStore, redacted diagnostics, no token in URLs or SQLite, masked input |
| Token forwarded to wrong host | HTTPS origin binding, explicit re-entry on origin change, redirect protection |
| Public agent gateway abuse | Recommend private networking, authenticated HTTPS proxy, raw gateway port not exposed |
| Malicious endpoint / untrusted response | URL validation, bounded parsing, safe Markdown, no arbitrary HTML or executable plugin |
| Duplicate external actions | Single dispatch, no automatic replay, honest unknown state |
| Stolen phone or local history exposure | OS-backed credentials, platform backup policy, explicit disconnect; disclose local database limitations |
| Overprivileged agent token | Warn about agent permissions; recommend least privilege when available; never assume scoping |
| Cross-agent leakage | Agent-scoped queries and history, test isolation, no shared credentials |
| App upgrade corrupts data | Versioned migration, recovery paths and upgrade tests |

Never disable TLS verification, accept arbitrary certificates or provide a production HTTP fallback. Prefer a privately reachable VPN/overlay network with a trusted HTTPS endpoint, or a correctly configured HTTPS reverse proxy on user infrastructure. A user-entered URL is an intentional network destination; disallow implicit redirects to other endpoints, local URL schemes and secret-bearing URLs. Do not expose a raw agent port directly to the public internet. Provide a setup guide showing agent host, network route, domain/certificate and token configuration. `localhost` on a phone refers to the phone itself, not the user's laptop.

### 12.2 Data flow and privacy policy requirements

Phone sends user messages and relevant history directly to the selected agent, which may send data onward to its model provider and tools. App developer does not receive agent traffic in v1. No analytics or crash-reporting SDK that transmits user content/credentials by default. Use sanitized local diagnostics; opt-in sharing only if introduced and clearly documented. Device and agent deletion are different. Explain how to revoke the token and remove server data using the owner's agent interface. Review store privacy disclosures against the final actual behavior and third-party SDKs. Do not assert store compliance before review.
