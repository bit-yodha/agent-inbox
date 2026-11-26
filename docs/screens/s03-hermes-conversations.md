# S03 — Hermes conversations

> Moved verbatim from `Product.md` §5 into this file. `Product.md`'s section index links §5 here; [`README.md`](README.md) lists every screen. Hosted-agent setup states (OAuth, account selection, binding, probe, reauthorization, disconnect) are defined in [`hosted-connection-setup.md`](hosted-connection-setup.md) (§24.3) and take precedence where they extend these screens.

- List locally saved threads for the selected agent only, newest activity first. Show title, last message preview and timestamp.
- New Conversation creates an empty thread. Initial title can be a bounded preview of the first message; no separate AI title-generation request.
- Open an existing thread without a network call or automatic task submission.
- Proposed: rename/delete a local thread, with confirmation for deletion; never imply this deletes server-side memory.
- Empty state explains how to start chatting. Search and cross-device sync are deferred.

**Acceptance:** Threads are isolated by agent; restarting while offline restores saved threads and never submits a task.
