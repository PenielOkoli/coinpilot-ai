# System Boundary Diagram

This shows exactly what runs where: the browser (client), the Next.js server, the AI model layer, external tools, and the data layer. No path from the client reaches an exchange directly — every order goes through server-side validation first.

```mermaid
flowchart TB
    subgraph CLIENT["Client (Browser)"]
        UI[Chat UI]
        Cards[Proposal / approval cards]
        Prefs[Preferences UI]
    end

    subgraph SERVER["Server (Next.js API routes, on Vercel)"]
        ChatAPI["/api/chat"]
        ActionAPI["/api/actions/execute"]
        Validator[Risk and proposal validator]
        SessionStore[Session and conversation store]
    end

    subgraph MODEL["Model layer"]
        Claude[Anthropic Claude - Messages API]
    end

    subgraph TOOLS["External tools"]
        MarketData[Market data API]
        ExchangeAPI[Exchange API - order placement]
    end

    subgraph DATA["Data layer"]
        DB[(User prefs, watchlists, conversation history)]
        Secrets[(Exchange API keys, secrets)]
    end

    UI -->|user message| ChatAPI
    ChatAPI -->|prompt + context| Claude
    Claude -->|tool call request| ChatAPI
    ChatAPI -->|fetch price/signal data| MarketData
    MarketData -->|data| ChatAPI
    ChatAPI -->|answer| UI

    Cards -->|approve action| ActionAPI
    ActionAPI --> Validator
    Validator -->|validated order| ExchangeAPI
    ExchangeAPI -->|confirmation| ActionAPI
    ActionAPI -->|result| Cards

    ChatAPI <--> SessionStore
    SessionStore <--> DB
    ActionAPI -.->|reads only, never returned to client| Secrets
```

## Boundary rules — what runs where

| Layer | Runs | Holds | Never holds |
|---|---|---|---|
| Client (browser) | Chat UI, proposal cards, settings form | Rendered messages, opaque session id | Exchange API keys/secrets, raw system prompt, other users' data |
| Server (Next.js API routes) | Prompt assembly, tool orchestration, proposal validation, auth | Session reference, short-lived request context | Long-term secret storage (delegated to data layer / secrets manager) |
| Model layer (Claude, Messages API) | Reasoning, drafting answers and proposals, tool-use requests | Only the context the server explicitly sends it | Exchange credentials, or the ability to execute a trade itself |
| External tools | Market data API, exchange API | Their own auth, called server-side only | Direct access from the client |
| Data layer | Database, secrets manager | Conversation history, preferences, encrypted API keys | — |

## Key boundary decision

The model can **request** a tool call (e.g. "place this order") but only the server-side validator can actually call the exchange API — and only after an explicit user approval was captured on the client and re-verified server-side against the exact proposal. The model never receives exchange secrets in its context, and the client never receives them either.
