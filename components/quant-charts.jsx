"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  Cell,
} from "recharts";
import { riskBarData, frontierData } from "@/lib/quant-data";

const AXIS_COLOR = "#8a90a3";
const GRID_COLOR = "#2b3142";

function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-[0.82rem] shadow-lg">
      {label && <p className="mb-1 font-mono font-semibold text-foreground">{label}</p>}
      {payload.map((p) => (
        <p key={p.dataKey ?? p.name} className="text-muted-foreground">
          {formatter ? formatter(p) : `${p.name}: ${p.value}`}
        </p>
      ))}
    </div>
  );
}

function ReturnVolatilityChart() {
  return (
    <div>
      <p className="mb-1 font-mono text-[0.75rem] font-bold tracking-[0.06em] text-brand">RISKTESTER.PY</p>
      <p className="mb-3 text-[0.85rem] text-muted-foreground">
        Real annualized return vs. volatility, computed from live market data (2022-2025). Swap in any
        tickers - these four are just an example.
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={riskBarData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="googleGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="35%" stopColor="#EA4335" />
              <stop offset="65%" stopColor="#FBBC05" />
              <stop offset="100%" stopColor="#34A853" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="ticker" stroke={AXIS_COLOR} fontSize={12} tickLine={false} axisLine={{ stroke: GRID_COLOR }} />
          <YAxis stroke={AXIS_COLOR} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            content={
              <ChartTooltip
                formatter={(p) => `${p.name === "return" ? "Return" : "Volatility"}: ${(p.value * 100).toFixed(1)}%`}
              />
            }
          />
          <Bar dataKey="return" name="return" radius={[4, 4, 0, 0]} maxBarSize={28}>
            {riskBarData.map((d) => (
              <Cell key={`r-${d.ticker}`} fill={d.ticker === "GOOGL" ? "url(#googleGradient)" : d.color} />
            ))}
          </Bar>
          <Bar dataKey="volatility" name="volatility" radius={[4, 4, 0, 0]} maxBarSize={28} fillOpacity={0.45}>
            {riskBarData.map((d) => (
              <Cell key={`v-${d.ticker}`} fill={d.ticker === "GOOGL" ? "url(#googleGradient)" : d.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.72rem] text-muted-foreground">
        <span><span className="mr-1 inline-block h-2 w-2 rounded-sm bg-muted-foreground align-middle" />solid = return</span>
        <span><span className="mr-1 inline-block h-2 w-2 rounded-sm bg-muted-foreground/45 align-middle" />faded = volatility</span>
      </div>
    </div>
  );
}

function EfficientFrontierChart() {
  const [selected, setSelected] = useState(frontierData.maxSharpe);

  return (
    <div className="mt-10">
      <p className="mb-1 font-mono text-[0.75rem] font-bold tracking-[0.06em] text-brand">PROJECT2.PY</p>
      <p className="mb-3 text-[0.85rem] text-muted-foreground">
        10,000 randomly-weighted portfolios across {frontierData.tickers.join(", ")}, computed from real historical
        data (2020-2025). Click a dot to see its stats - the highlighted point is the true max-Sharpe
        portfolio from the full run.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
          <CartesianGrid stroke={GRID_COLOR} />
          <XAxis
            type="number"
            dataKey="volatility"
            name="Volatility"
            domain={["dataMin - 0.005", "dataMax + 0.005"]}
            stroke={AXIS_COLOR}
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: GRID_COLOR }}
            tickFormatter={(v) => `${(v * 100).toFixed(1)}%`}
            label={{ value: "Volatility (risk)", position: "insideBottom", offset: -2, fill: AXIS_COLOR, fontSize: 11 }}
          />
          <YAxis
            type="number"
            dataKey="return"
            name="Expected Return"
            domain={["dataMin - 0.005", "dataMax + 0.005"]}
            stroke={AXIS_COLOR}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${(v * 100).toFixed(1)}%`}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3", stroke: GRID_COLOR }}
            content={
              <ChartTooltip
                formatter={(p) =>
                  `${p.name === "Expected Return" || p.dataKey === "return" ? "Return" : "Volatility"}: ${(p.value * 100).toFixed(1)}%`
                }
              />
            }
          />
          <Scatter
            data={frontierData.points}
            onClick={(point) => setSelected(point)}
            cursor="pointer"
          >
            {frontierData.points.map((p, i) => (
              <Cell
                key={i}
                fill={p === selected ? "var(--cat-red)" : "var(--brand)"}
                fillOpacity={p === selected ? 1 : 0.35 + Math.min(0.4, p.sharpe / 2)}
                r={p === selected ? 6 : 3}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div className="mt-3 grid grid-cols-3 gap-3 rounded-lg border border-border bg-secondary p-4 text-center sm:grid-cols-3">
        <div>
          <p className="font-mono text-[0.68rem] tracking-[0.05em] text-muted-foreground">RETURN</p>
          <p className="font-display text-[1.1rem] font-bold text-foreground">{(selected.return * 100).toFixed(1)}%</p>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] tracking-[0.05em] text-muted-foreground">VOLATILITY</p>
          <p className="font-display text-[1.1rem] font-bold text-foreground">{(selected.volatility * 100).toFixed(1)}%</p>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] tracking-[0.05em] text-muted-foreground">SHARPE</p>
          <p className="font-display text-[1.1rem] font-bold text-brand">{selected.sharpe.toFixed(2)}</p>
        </div>
      </div>
      {selected === frontierData.maxSharpe && (
        <p className="mt-2 text-center font-mono text-[0.72rem] text-muted-foreground">
          Max-Sharpe weights: {frontierData.tickers.map((t) => `${t} ${(frontierData.maxSharpe.weights[t] * 100).toFixed(0)}%`).join(" · ")}
        </p>
      )}
    </div>
  );
}

export function QuantCharts() {
  return (
    <div className="mb-4 rounded-xl border border-border bg-card p-6">
      <ReturnVolatilityChart />
      <EfficientFrontierChart />
    </div>
  );
}
