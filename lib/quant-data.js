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

// Small static preview of the real efficient-frontier scatter, normalized
// into a 200x100 viewBox - shared by the homepage project card and the
// project preview modal (the full interactive version lives on the
// case-study page via components/quant-charts.jsx).
export const frontierPreviewDots = (() => {
  const vols = frontierData.points.map((p) => p.volatility);
  const rets = frontierData.points.map((p) => p.return);
  const minV = Math.min(...vols), maxV = Math.max(...vols);
  const minR = Math.min(...rets), maxR = Math.max(...rets);
  const pad = 12;
  const scaleX = (v) => pad + ((v - minV) / (maxV - minV)) * (200 - pad * 2);
  const scaleY = (r) => 100 - pad - ((r - minR) / (maxR - minR)) * (100 - pad * 2);
  return {
    dots: frontierData.points
      .filter((_, i) => i % 3 === 0)
      .map((p) => ({ x: scaleX(p.volatility), y: scaleY(p.return) })),
    max: { x: scaleX(frontierData.maxSharpe.volatility), y: scaleY(frontierData.maxSharpe.return) },
  };
})();
