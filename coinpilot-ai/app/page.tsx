export default function Home() {
  return (
    <main className="wrap">
      <p className="status-line">
        Week 1 build — this page exists to prove the deploy pipeline. The
        chat itself ships in a later module.
      </p>

      <div className="hero">
        <div>
          <h1>A copilot that explains the trade, never makes it for you</h1>
          <p className="lede">
            CoinPilot AI reads a signal, checks it against live market data,
            and drafts what it thinks you should do. Nothing reaches an
            exchange until you approve it.
          </p>
          <ul className="jtbd">
            <li>
              <strong>See a call, understand it fast</strong> — without
              manually pulling up five tabs of charts.
            </li>
            <li>
              <strong>Catch portfolio risk early</strong> — before
              concentration becomes a problem.
            </li>
            <li>
              <strong>Stay in control</strong> — every action is a proposal
              until you say otherwise.
            </li>
          </ul>
        </div>

        <div className="panel">
          <div className="bubble">
            <strong>You</strong>
            someone just called $SOL, worth looking at?
          </div>
          <div className="bubble">
            <strong>CoinPilot</strong>
            SOL is up <span className="ticker">+6.2%</span> in the last 4h on
            above-average volume. That matches the call's timing — I'd flag
            this as moderate confidence, not high.
          </div>

          <div className="proposal">
            <div className="proposal-head">
              <span>Suggested action</span>
              <span className="risk-tag">RISK: MODERATE</span>
            </div>
            <p>
              Add a small SOL position (2% of portfolio) rather than full
              size, given moderate confidence.
            </p>
            <div className="actions">
              <button className="approve">Approve</button>
              <button>Edit</button>
              <button>Reject</button>
            </div>
            <div className="awaiting">
              Nothing executes until you choose — see the review/approval
              flow in the product brief.
            </div>
          </div>
        </div>
      </div>

      <footer>
        Product brief, system diagram, acceptance criteria, and risk
        register live in <a href="/docs">/docs</a>.
      </footer>
    </main>
  );
}
