# S04 — Hermes chat

> Moved verbatim from `Product.md` §5 into this file. `Product.md`'s section index links §5 here; [`README.md`](README.md) lists every screen. Hosted-agent setup states (OAuth, account selection, binding, probe, reauthorization, disconnect) are defined in [`hosted-connection-setup.md`](hosted-connection-setup.md) (§24.3) and take precedence where they extend these screens.

- Header shows agent name and connection context; composer accepts plain text. Trim for validation but preserve the user's intended message content. Disable empty sends.
- Save the user message and pending assistant placeholder transactionally before initiating the network request. One active request per agent is a proposed conservative MVP concurrency rule; enforce in the service layer, not just the button.
- Render incremental assistant text as it arrives. Display only actual provider progress events, separately from final reply content. No fabricated percentages, tool results or success indicators.
- Use pending, streaming, complete, failed, incomplete and outcome-unknown states. Persist partial content at bounded intervals. Restore partial replies after interruption and show their true status.
- Use plain text / safe Markdown with code blocks and copy affordance as a proposed UX enhancement. Do not execute code or render arbitrary HTML. External links must open through validated system actions.
- When the connection drops after a request may have reached the agent, show 'Outcome unknown — the agent may still be working'. Never automatically resubmit. A deliberate new submission requires an explicit duplicate-action warning.
- If a server explicitly reports cancellation, failure or an incomplete turn, do not label it complete. A local stream abort is not remote task cancellation.
- No offline send queue, automatic retry, remote stop, attachments, voice or edit-and-resend in MVP. A new follow-up after an unknown outcome requires explicit acknowledgment that earlier work may still be running.

**Acceptance:** Streaming works on real Android and iOS devices; partial data survives restart; no duplicate task is triggered by reconnecting, revisiting a screen, double tapping or refreshing the app.
