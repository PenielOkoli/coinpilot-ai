# Acceptance Criteria

| Dimension | Criteria |
|---|---|
| **Accuracy** | Market data shown in chat matches the source API within the last 60 seconds. AI-stated confidence correlates with real outcome accuracy, tracked via a feedback log — target ≥90% of "high confidence" answers verified correct on spot-check. |
| **Latency** | Chat first-token response under 2s (p95). Full assistive proposal, including tool calls, under 6s (p95). Fallback triggers automatically if any tool call exceeds 4s. |
| **Accessibility** | WCAG 2.1 AA. Full keyboard navigation for chat and approval cards. Visible focus states. Proposal cards are screen-reader readable, announcing action and risk level. Risk level is never conveyed by color alone. |
| **Safety** | No action reaches `/api/actions/execute` without an explicit, logged user approval. Every executed action is fully auditable (timestamp, proposal, approving user). The AI never claims to have executed something it hasn't. |
| **UX quality** | Every answer distinguishes "verified from live data" from "model reasoning only." Every proposal card states its reasoning in plain language, not just the action. Fallback states are never silent — the user always sees why a degraded answer occurred. |
