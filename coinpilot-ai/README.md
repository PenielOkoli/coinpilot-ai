# CoinPilot AI

An AI-native crypto trading copilot: chat-first signal explanations and portfolio suggestions, with every action gated behind explicit human approval before it can touch an exchange.

## Status

📋 **Week 1 / Module 1 — Planning phase.** No trading logic is implemented yet. This repo currently holds the product brief, architecture, and a minimal placeholder frontend that proves the deploy pipeline end to end.

## Docs

- [Product Brief](docs/product-brief.md) — target users, jobs-to-be-done, core AI use cases, user flows, state management
- [System Boundary Diagram](docs/system-diagram.md) — client / server / model / tools / data boundaries
- [Acceptance Criteria](docs/acceptance-criteria.md) — accuracy, latency, accessibility, safety, UX quality
- [Risk Register](docs/risk-register.md) — privacy risks and data that must never reach the client

## Tech stack (planned)

- **Frontend**: Next.js (App Router), deployed on Vercel
- **AI provider**: Anthropic Claude (Messages API) — swappable behind the Vercel AI SDK in a later module
- **State**: server-side session and conversation store, not client-side storage

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deployment

This repo is connected to Vercel for automatic deployment on every push to `main`.

- Live URL: _add here once Vercel is connected_

## Environment variables

See `.env.example`. Never commit real API keys — exchange and market-data credentials belong on the server only (see [Risk Register](docs/risk-register.md), R1).
