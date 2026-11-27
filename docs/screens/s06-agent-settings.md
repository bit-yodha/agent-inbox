# S06 — Agent settings

> Moved verbatim from `Product.md` §5 into this file. `Product.md`'s section index links §5 here; [`README.md`](README.md) lists every screen. Hosted-agent setup states (OAuth, account selection, binding, probe, reauthorization, disconnect) are defined in [`hosted-connection-setup.md`](hosted-connection-setup.md) (§24.3) and take precedence where they extend these screens.

- Edit display name without a network request.
- Recheck a Hermes connection without submitting tasks. Replace token only after validating the candidate configuration.
- Endpoint changes require a fresh connection check. Require token re-entry for any change of HTTPS origin (host or port); do not silently forward credentials to a different host or accept network redirects with authorization.
- Disconnect removes the saved credential from SecureStore and disables sends immediately. Local history retention is explicit: proposed default is to remove the local connection and its conversations after confirmation; warn that remote data, tokens and active runs are not revoked or cancelled. If credential deletion fails, retain a non-sendable deletion-pending record and let the user retry.
- Prevent connection edits/deletion races during active requests; explain that disconnecting locally cannot stop an already submitted task.
