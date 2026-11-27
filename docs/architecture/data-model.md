# Local data model, credentials and isolation

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md`'s section index links each number here. [`docs/architecture/README.md`](README.md) maps every moved section to its file. Precedence is unchanged: material from §§23–24 overrides material from earlier sections, and superseded passages carry an explicit note.

## 10. Local data design and lifecycle

Use versioned SQLite migrations, foreign keys enabled, parameterized queries and transactions. Example logical schema (field types and constraints are proposals):

| Table | Fields / constraints |
|---|---|
| `agents` | `id` UUID PK, `provider`, `display_name`, `base_url`, `model_id` nullable, `credential_ref` nullable, `last_check_status`, `last_checked_at`, `created_at`, `updated_at`, `lifecycle_state` |
| `threads` | `id` UUID PK, `agent_id` FK, `title`, `created_at`, `updated_at` |
| `messages` | `id` UUID PK, `thread_id` FK, `turn_id`, `role`, `content`, `status`, `created_at`, `updated_at`, `error_code` nullable, `sequence_no` |
| `turns` | `id` UUID PK, `thread_id` FK, `request_id` unique, `state`, `created_at`, `updated_at`, `finished_at` nullable |
| `settings` | `key` PK, `value` (non-secret appearance and app preferences) |
| `schema_migrations` | `version` PK, `applied_at` |

Index threads by `(agent_id, updated_at)` and messages by `(thread_id, sequence_no)`; unique message sequence per thread. Use stable random IDs and UTC timestamps; format locally in UI. Each native Hermes turn owns one user message and one assistant message in v1. Hosted asynchronous flows use the separate remote binding, outbox, remote message and sync records in §24.8. Keep state changes atomic across turn/message rows; enforce valid roles and status values. Store only non-secret credential reference in SQLite. SecureStore key should include the connection ID and a rotation identifier.

SecureStore and SQLite do not share a transaction. For creation/rotation, validate candidate credentials, stage a new secret, commit its reference, then delete old secret; on failure clean up staged values. On startup reconcile pending operations, missing secrets and orphaned staging references using a durable operation journal where needed. Fail closed when credential access fails. Disconnect first marks the connection non-sendable; remove credential; then clean local records as confirmed. Never restore a deleted credential from app state.

Local chat history is private to this installation but ordinary SQLite is not automatically encrypted at rest. Exclude sensitive storage from cloud/device backup where supported and verify platform behavior. Do not market end-to-end encryption or zero retention: agent-side logs and memory are outside our control. Encrypted database or app-lock support is a later security enhancement unless beta threat review makes it necessary.

## 24.8 SQLite extension, credential lifecycle and isolation

Preserve Hermes `turns`/`messages` relationship. Add migration-backed records for hosted async flows; exact SQL can be refined after spikes.

| Table | Proposed fields / constraints |
|---|---|
| `transport_accounts` | ID PK, transport, external account ID, external workspace ID, granted scope metadata, credential_ref, expiry metadata, auth status, created/updated; unique external identity per transport |
| `remote_bindings` | ID PK, agent_id FK unique, account_id FK, remote_conversation_id, remote_agent_identity, binding_version, verified_at, last_probe_status; prevent duplicate active bindings to same agent conversation |
| `outbound_requests` | request_id UUID PK, binding_id FK, local_message_id, state, remote_message_id nullable, remote_thread_id nullable, created_at, accepted_at, last_error_code; no secret fields |
| `remote_messages` | ID PK, binding_id FK, external_message_id, remote_thread_id, sender_identity, sender_role, text, provider_timestamp TEXT, observed_at, request_id nullable, revision, tombstone; unique(binding_id, external_message_id) |
| `sync_checkpoints` | binding_id + stream_key PK, committed high_water, in_progress_window_end, page_cursor, last_success_at, next_allowed_at, last_error_code |
| `integration_probes` | ID PK, binding_id, nonce, request_id, expected identity, sent/received timestamps, result, sanitized evidence summary |

Index remote messages by binding/thread and provider order; enforce foreign keys and cascade according to confirmed local deletion policy. Prevent stale account reauthorization from silently binding to different owner/workspace; rebind explicitly. Slack/Gmail tokens are account-bound rather than copied into every agent record; multiple agents can reference one account only where consent and scope permit. Disconnect agent removes its binding and cancels sync. Revoke/delete shared credential only when user explicitly disconnects transport account or last dependent binding is removed under confirmed policy; show affected agents. Remote conversation and provider memory are untouched. Store token bundles, rotating refresh tokens and any webhook secret only in SecureStore; no secrets in SQLite, query strings, logs, fixtures or client bundle. Do not include tokens in state snapshots or crash reports. Preserve earlier transaction/staging rules for account rotation and local deletion.
