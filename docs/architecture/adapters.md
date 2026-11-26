# Adapter contracts and capability normalization

> Moved verbatim from `Product.md` into this file. Section numbers (§) are the `Product.md` numbering; `Product.md`'s section index links each number here. [`docs/architecture/README.md`](README.md) maps every moved section to its file. Precedence is unchanged: material from §§23–24 overrides material from earlier sections, and superseded passages carry an explicit note.

## 8. Adapter design and normalized events

Use capability-specific interfaces rather than forcing all providers to implement unsupported methods. The following TypeScript is illustrative, not a tested implementation.

```ts
type Capability = 'native_chat' | 'streaming' | 'browser_handoff' |
  'tool_progress' | 'run_status' | 'remote_stop' | 'approval' | 'resume' |
  'async_send' | 'async_receive' | 'trigger_only';

type Provider = 'hermes' | 'nod' | 'grok_bot' | 'muse' | 'chatgpt_dot';
type HistoryMessage = { role: 'user' | 'assistant'; content: string };
type Connection = { id: string; provider: Provider; baseUrl: string };
type ChatRequest = {
  requestId: string; threadId: string; modelId: string;
  messages: HistoryMessage[];
};
type ChatEvent =
  | { type: 'text_delta'; text: string }
  | { type: 'progress'; label: string }
  | { type: 'completed' }
  | { type: 'incomplete'; reason: string }
  | { type: 'failed'; code: string }
  | { type: 'outcome_unknown'; code: string };
interface AgentAdapter {
  readonly provider: Provider;
  readonly clientCapabilities: ReadonlySet<Capability>;
}
interface NativeChatAdapter extends AgentAdapter {
  test(connection: Connection, candidateToken: string): Promise<CheckResult>;
  stream(connection: Connection, request: ChatRequest,
    signal: AbortSignal): AsyncIterable<ChatEvent>;
}
interface BrowserAdapter extends AgentAdapter {
  open(connection: Connection): Promise<void>;
}
```

Scope of this contract: it covers direct connections only (`Connection.baseUrl` applies to Hermes and Nod). Hosted asynchronous agents use the `Binding`, `SendReceipt`, `IncomingEvent` and `TwoWayAdapter` contracts in §24.6, which take precedence over the illustrative §23.4 contract and over the async values in the `Capability` union above.

`CheckResult` contains a sanitized status, verified origin, discovered model IDs and optional advertised capabilities. Define it alongside typed domain errors during implementation. Secrets are fetched internally by the authorized adapter from the credential vault and never included in `ChatRequest`. Effective capabilities are the intersection of implemented client features and validated provider features, not a blanket promise. Unknown features fail closed. A missing optional capability endpoint does not break otherwise compatible basic chat. Event parsing and storage are independent of the UI lifecycle.

Future run controls require separate interfaces with provider-issued IDs, confirmed terminal states, and explicit user approvals. Never let text emitted by a model authorize a control action. Do not use generic capability flags to pretend incompatible approval semantics are interchangeable.

## 23.4 Hosted transport contract (illustrative)

> **Superseded by §24.6.** Implement the `Binding`, `SendReceipt` (including the definitive `failed` state), `IncomingEvent`, `SyncCheckpoint` and `TwoWayAdapter` contracts in §24.6. The sketch below is retained only to show the original intent; its behavioral rules in the paragraph that follows still apply.

```ts
type DeliveryMode = 'direct_stream' | 'async_two_way' | 'trigger_only' | 'handoff';
type RemoteMessage = {
  externalMessageId: string;
  externalConversationId: string;
  sender: 'owner' | 'agent' | 'unknown';
  text: string;
  sentAt: string;
  requestId?: string;
};
interface AsyncTransport {
  send(connectionId: string, request: {
    requestId: string; text: string;
  }): Promise<{ externalId?: string; state: 'accepted' | 'outcome_unknown' }>;
  fetchUpdates(connectionId: string, cursor?: string): Promise<{
    messages: RemoteMessage[]; nextCursor?: string;
  }>;
}
```

Maintain transport-specific capabilities; trigger-only adapters do not implement `fetchUpdates` as if replies were available. Separate submission receipt, agent reply, explicit run completion and unknown outcome. Do not apply the Hermes one-user/one-assistant-turn model to hosted conversations: use additional remote-message/event records with unique `(connection_id, external_message_id)`, external conversation binding, sync cursor and optional request correlation. A delayed or unsolicited response may have no request ID. Never guess which task completed. Use rate-limited foreground polling, incremental cursor checkpoints and catch-up on reopen; deduplicate events and never replay a task automatically after an ambiguous network error.

## 24.6 Direct provider adapters and capability normalization

Hermes retains §§9.1–9.2: `GET /v1/models` authenticated discovery, `POST /v1/chat/completions` streamed reply, validated model selection, history sent once and secure origin rules. A stream is one direct response, not an asynchronous Slack/Gmail mirror. Future Runs API is capability-gated. Nod requires a reachable supported self-host instance and an official native messaging interface; preserve labeled browser handoff until native send/receive is proven. Do not forward Nod full-access credentials or assume local desktop loopback is reachable from a phone.

Separate provider identity from transport: `hermes/direct`, `nod/browser` or future `nod/direct`, `chatgpt_dot/slack`, `grok_bot/slack` or `grok_bot/webhook`, `muse/gmail`. Maintain separate capability flags for send, receive, stream, verified identity, thread support, progress, run status, approval and cancel. Effective permissions are intersected at runtime. The same transport client can serve multiple agent adapters without mixing bindings or histories.

Illustrative domain contract (extend §8 and §23, do not replace native streaming interface):

```ts
type TransportKind = 'direct' | 'slack' | 'gmail' | 'webhook' | 'browser';
type Binding = {
  connectionId: string; accountId: string; provider: Provider;
  transport: TransportKind; remoteConversationId: string;
  remoteAgentIdentity: string; bindingVersion: number;
};
type SendReceipt =
  | { state: 'accepted'; externalMessageId: string; externalThreadId?: string }
  | { state: 'failed'; code: string; definitivelyNotAccepted: true }
  | { state: 'outcome_unknown'; code: string };
type IncomingEvent = {
  externalMessageId: string; externalConversationId: string;
  externalThreadId?: string; senderIdentity: string;
  senderRole: 'owner' | 'agent' | 'unknown'; text: string;
  providerTimestamp: string; requestId?: string; revision?: string;
};
interface TwoWayAdapter extends AgentAdapter {
  verifyBinding(binding: Binding, signal: AbortSignal): Promise<CheckResult>;
  send(binding: Binding, input: { requestId: string; text: string },
       signal: AbortSignal): Promise<SendReceipt>;
  fetchPage(binding: Binding, checkpoint: SyncCheckpoint,
            signal: AbortSignal): Promise<SyncPage>;
}
interface SyncCheckpoint { highWater?: string; pageCursor?: string; windowEnd?: string }
interface SyncPage { events: IncomingEvent[]; next: SyncCheckpoint; hasMore: boolean }
```

`SyncCheckpoint` is transport-specific and opaque to UI. An adapter must validate raw provider schemas and return typed safe errors. The engine obtains credentials via account-bound vault references. A trigger-only adapter must not implement a dummy receive method. `AbortSignal` aborts local network waiting, not necessarily remote execution. No code or model output can change binding, permissions or approve actions.
