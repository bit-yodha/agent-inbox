# S02 — Add Agent

> Moved verbatim from `Product.md` §5 into this file. `Product.md`'s section index links §5 here; [`README.md`](README.md) lists every screen. Hosted-agent setup states (OAuth, account selection, binding, probe, reauthorization, disconnect) are defined in [`hosted-connection-setup.md`](hosted-connection-setup.md) (§24.3) and take precedence where they extend these screens.

Provider picker: Hermes (native chat), Nod (browser), and Grok Bot, Meta Muse and ChatGPT Dot (capability-gated integrations). Unverified integrations may be shown as explicitly unavailable or experimental with a setup explanation; never show a nonfunctional Connect button. See §§23–24 for transport-specific onboarding, OAuth and two-way verification.

**Hermes fields:** display name, HTTPS base URL, bearer token (masked), Test Connection, Save. Explain that the token is generated/configured on the user's Hermes instance, not their underlying LLM provider key. Require non-empty token and valid HTTPS URL. Test with `GET /v1/models`; require a valid authenticated response and a usable model ID before saving. Do not invoke an agent task during connection testing. If multiple model IDs are returned, require selection or an explicit documented default; do not silently choose an arbitrary model. Disable Save while testing and invalidate the test whenever endpoint or token changes.

**Nod fields:** display name, HTTPS web UI URL, Open Nod and Save. Launch through the system browser so authentication stays with Nod. Save a valid URL independently of browser authentication; distinguish 'URL saved' from 'connection verified'. Never request Nod's full-access token.

**Errors:** invalid URL, untrusted TLS, unauthorized, forbidden, unreachable host, timeout, incompatible response, server error. Show sanitized guidance; do not echo secrets or raw server bodies. Where the OS cannot distinguish TLS from a network error, use an honest generic secure-connection message.

**Acceptance:** Valid Hermes connection is saved only after a successful test; invalid credentials or URL do not create a verified connection. Nod opens the configured HTTPS page without injecting secrets.
