# Nod integration contract

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md`'s section index links each number here. [`docs/architecture/README.md`](../README.md) maps every moved section to its file. Precedence is unchanged: material from §§23–24 overrides material from earlier sections, and superseded passages carry an explicit note.

## 9.3 Nod — MVP

Use the official self-hosted Nod browser UI. The app stores the user's HTTPS web address and opens it in the system browser. Do not collect its access token, implement a private API, inject scripts or read browser sessions. Nod's docs describe self-hosting on Linux/Mac with Docker and broad access-token privileges. Windows/WSL or Docker-based setup and phone access must be validated rather than advertised as native Windows support. The desktop loopback address is not a phone-reachable server. The host must remain running and reachable.
