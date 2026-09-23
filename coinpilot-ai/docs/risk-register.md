# Risk Register

| ID | Risk | Category | Likelihood | Impact | Mitigation | Client exposure |
|---|---|---|---|---|---|---|
| R1 | Exchange API keys leak to the client bundle or logs | Privacy / data protection | Low | Critical | Keys live server-side only, in a secrets manager; never included in an API response or client env var; logging redacts key values | Must never reach the client |
| R2 | Model hallucinates a "verified" price or signal | Safety / trust | Medium | High | Every price/signal claim must be grounded in a tool call result, not model memory; the UI labels ungrounded reasoning distinctly | N/A — output risk |
| R3 | An AI-drafted proposal executes without a genuine user approval (e.g. replay of an old approval) | Safety | Low | Critical | Approval tokens are single-use and short-lived, re-validated server-side against the exact proposal payload before execution | Approval token only, single-use |
| R4 | Conversation history stored client-side exposes trading strategy or portfolio info if the device is compromised | Privacy / data protection | Medium | Medium | History is persisted server-side, tied to the authenticated session; the client only holds an opaque session reference | Session reference only |
| R5 | Third-party market data API outage produces a silently wrong answer | Data protection / reliability | Medium | Medium | Fallback flow triggers on tool failure or timeout; the UI shows a degraded state explicitly instead of guessing | N/A |
| R6 | Portfolio/watchlist data is reused by the model provider beyond the single request | Privacy | Low | High | No-retention / no-training terms confirmed with the provider; only the minimum necessary context is sent per request | Portfolio data sent per-request only |
| R7 | User over-trusts AI confidence and approves a bad trade | UX / safety | Medium | High | Confidence is always shown with reasoning, never a bare recommendation; no "approve all"; each proposal is reviewed individually | N/A — UX risk |

## Data that must never be exposed to the client

- Exchange API keys and secrets (server and secrets manager only)
- The raw system prompt / internal model instructions
- Other users' conversation history or portfolio data
- Unredacted internal validator logic that could be used to game the approval check
