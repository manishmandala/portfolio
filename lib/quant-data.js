// Real, computed data from actually running the two quant-finance-scripts
// scripts against live market data (snapshotted, not fetched live in the
// browser - see the caption in components/quant-charts.jsx for the honesty
// note). The scripts themselves in the GitHub repo are untouched; this is
// just how the portfolio site presents their output.

import frontierRaw from "./frontier_data.json";

// Approximate brand colors, used purely as a visual identifier per ticker.
export const TICKER_COLORS = {
  AAPL: "#a1a1a6",
  MSFT: "#00a4ef",
  GOOG: "#4285f4",
  GOOGL: "#4285f4",
  AMZN: "#ff9900",
  JPM: "#5a7ca8",
  NVDA: "#76b900",
  META: "#0866ff",
};

// Project2.py: 10,000-portfolio Monte Carlo efficient frontier over
// AAPL/MSFT/GOOG/AMZN/JPM, 2020-01-01 to 2025-01-01. Downsampled to ~400
// points for the chart; maxSharpe is the true argmax from the full run.
export const frontierData = frontierRaw;

// RiskTester.py: real annualized return/volatility and correlation matrix
// for NVDA/GOOGL/META/AMZN, 2022-01-01 to 2025-01-01.
export const riskTesterTickers = ["NVDA", "GOOGL", "META", "AMZN"];

export const riskBarData = riskTesterTickers.map((ticker) => ({
  ticker,
  color: TICKER_COLORS[ticker],
  return: { NVDA: 0.652247, GOOGL: 0.144144, META: 0.305542, AMZN: 0.158071 }[ticker],
  volatility: { NVDA: 0.55271, GOOGL: 0.327441, META: 0.487222, AMZN: 0.383321 }[ticker],
}));

export const correlationMatrix = {
  NVDA: { NVDA: 1, GOOGL: 0.55, META: 0.5, AMZN: 0.56 },
  GOOGL: { NVDA: 0.55, GOOGL: 1, META: 0.6, AMZN: 0.65 },
  META: { NVDA: 0.5, GOOGL: 0.6, META: 1, AMZN: 0.6 },
  AMZN: { NVDA: 0.56, GOOGL: 0.65, META: 0.6, AMZN: 1 },
};
