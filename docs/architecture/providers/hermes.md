# Hermes direct integration contract

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md`'s section index links each number here. [`docs/architecture/README.md`](../README.md) maps every moved section to its file. Precedence is unchanged: material from §§23–24 overrides material from earlier sections, and superseded passages carry an explicit note.

## 9.1 Hermes — MVP

The official Hermes API documents an OpenAI-compatible chat interface, model discovery and optional provider-specific events. It also documents richer run and capability routes for later evaluation. Use the original MVP's simpler chat route first.

| Method / path | Use |
|---|---|
| `GET /v1/models` | Authenticated model discovery and connection test |
| `POST /v1/chat/completions` | Stream a new text turn |
| `GET /v1/capabilities` | Optional discovery where supported; no extra v1 functionality implied |

Example request (placeholder host and token, never real secrets):

```http
POST /v1/chat/completions HTTP/1.1
Host: agent.example.com
Authorization: Bearer <user-agent-token>
Content-Type: application/json
Accept: text/event-stream
```

```json
{
  "model": "hermes-agent",
  "messages": [{"role": "user", "content": "Hello, summarize what you can help with."}],
  "stream": true
}
```

Use the discovered model ID instead of hardcoding the example. The phone builds the message array from this thread's completed conversation turns and the current user message exactly once. Exclude progress, internal diagnostics, incomplete assistant output and unresolved/failed turns from automatic history assembly; retain them visibly in the local transcript. Document the resulting difference between visible and sent history. Initially send the available complete history subject to a documented size limit; never silently drop context. Agent-side memory may still exist; local threads are not guaranteed to be independent remote memory namespaces. Do not claim to attach to an existing CLI or messaging session.

Normalize URL once: accept the documented gateway base with or without a trailing `/v1`, preserve supported reverse-proxy prefixes, remove trailing separators and avoid duplicate `/v1` segments. Reject userinfo, query parameters, fragments, insecure schemes and ambiguous endpoint paths. Construct requests against the verified origin. Do not follow redirects that could leak credentials; test that the chosen native transport enforces the redirect policy on both platforms before beta.

## 9.2 Stream handling

- Validate response status and expected content type before parsing. A 200 response alone does not mean the turn succeeded.
- Incrementally decode UTF-8, buffer partial lines, handle CRLF/LF, blank frame separators, multiline data, comments/keepalives and multiple frames per chunk.
- Parse assistant content deltas separately from named Hermes tool progress events (`hermes.tool.progress` where emitted). Ignore unknown optional events safely; reject malformed critical data without asserting success.
- Interpret documented terminal signals and finish reasons; explicit errors/cancellation are failures or provider-confirmed termination, and length exhaustion is incomplete, not complete. Test the exact terminal contract on a pinned Hermes version.
- Treat premature EOF, app termination, idle timeout or dropped connection after possible admission as outcome unknown. A closed transport is not proof of remote cancellation.
- Bound parser buffer and response size; batch UI updates and persist partial content periodically. Do not store raw tool payloads or reasoning streams by default. Render concise actual progress labels only when available.
- Proposed timeouts: 15 seconds for connection check, 30 seconds to receive stream headers, 90 seconds of transport inactivity (keepalives count), with no short total chat duration cutoff. Validate against actual long-running behavior; these are engineering defaults, not provider promises.

## 9.4 Future integration: Hermes durable runs (v1.x proposal)

Evaluate the documented `POST /v1/runs`, `GET /v1/runs/{run_id}`, run event stream, stop and approval controls against a tested version. Store remote run IDs; reconcile status on reconnect without resubmitting; respect run retention, ownership, cancellation and unknown-state semantics. Use the provider's idempotency mechanisms only with verified semantics and retention windows. No claim of global exactly-once execution. This is a separate milestone, not required for the first beta.
