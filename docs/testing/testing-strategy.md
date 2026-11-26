# Testing strategy and baseline acceptance matrix

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md` is the index of all sections; its section index links each number here. Precedence is unchanged: material from §§23–24 overrides material from earlier sections.

## 15. Testing strategy and acceptance matrix

| Test | Required outcome |
|---|---|
| URL and origin validation | HTTP, userinfo, token queries, fragments rejected; no duplicate `/v1`; no credential-bearing redirects |
| Connection check | Correct model list passes; invalid token/TLS/host/malformed payload produce actionable errors |
| SSE parser | Split UTF-8, split frames, CRLF, multiline data, keepalive, progress, unknown event, malformed data, terminal failure handled |
| History assembly | Current prompt exactly once; no cross-thread or cross-agent contamination; incomplete turns excluded |
| Duplicate send | Rapid taps/navigation trigger one request only |
| Network drop / app kill | Partial reply retained where persisted; outcome unknown; no resubmit after restart |
| Provider terminal states | Failure, cancellation, incomplete and successful outcomes not conflated |
| SQLite migrations | Upgrade preserves data; transaction rollback and missing-secret recovery verified |
| Credential rotation | Failed validation leaves old connection intact; changed origin never receives previous token |
| Disconnect | Secret deletion verified; local send blocked; failed deletion reported; remote revocation not claimed |
| Nod | Correct browser URL; no tokens collected; no claim of auth success |
| App settings | Themes persist; native version/build accurate; store links platform-specific |
| Offline and accessibility | Cached data readable; screen reader and text scaling usable |
| Real devices | Hermes streaming, interruption and reconnect validated on Android and iOS; Nod reachability validated |

Layers: unit tests for domain logic and parsing; integration tests against a local fake HTTP/SSE server and isolated SQLite/vault doubles; component tests for states; end-to-end tests on development builds and physical devices. Use sanitized fixtures and a dedicated restricted demo agent. No CI dependency on production tokens, real connected accounts or paid model APIs for deterministic tests. The live compatibility smoke test is distinct from mocks. Test against a documented Hermes version; validate at least one real Nod setup.
