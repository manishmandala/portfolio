"use client";

import { useEffect, useRef } from "react";

// Faint circuit-trace line art confined to the empty margins above/below
// the hero text block, plus a small decorative geometric mark. Recreated
// from the original inline SVGs in index.html (.hero-bg-circuit /
// .hero-bg-art) - simplified, not pixel-identical, same visual idea.
//
// Each pad glows in its own category color based on proximity to the
// cursor (tracked on window, since the SVG itself stays pointer-events:
// none so it never blocks clicking through to the hero content) - a nod
// to the "hex grid lights up on hover" effect, applied to this site's own
// circuit-trace motif instead of copying a hex grid wholesale.
const PADS = [
  { x: 240, y: 20, cssVar: "--cat-blue" },
  { x: 90, y: 60, cssVar: "--cat-orange" },
  { x: 380, y: 110, cssVar: "--cat-aqua" },
  { x: 560, y: 10, cssVar: "--cat-yellow" },
  { x: 60, y: 80, cssVar: "--cat-magenta" },
  { x: 140, y: 610, cssVar: "--cat-green" },
  { x: 420, y: 555, cssVar: "--cat-violet" },
  { x: 580, y: 570, cssVar: "--cat-red" },
  { x: 20, y: 560, cssVar: "--cat-blue" },
];

const TRACES = [
  { d: "M0,60 L90,60 L90,20 L240,20", points: [[0, 60], [90, 60], [90, 20], [240, 20]] },
  { d: "M560,10 L560,75 L470,75 L470,110 L380,110", points: [[560, 10], [560, 75], [470, 75], [470, 110], [380, 110]] },
  { d: "M150,110 L150,80 L60,80", points: [[150, 110], [150, 80], [60, 80]] },
  { d: "M20,560 L20,610 L140,610", points: [[20, 560], [20, 610], [140, 610]] },
  { d: "M300,640 L300,590 L420,590 L420,555", points: [[300, 640], [300, 590], [420, 590], [420, 555]] },
  { d: "M480,610 L580,610 L580,570", points: [[480, 610], [580, 610], [580, 570]] },
];

const GLOW_RADIUS_PX = 140;

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  let t = lenSq === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const cx = x1 + t * dx;
  const cy = y1 + t * dy;
  return Math.hypot(px - cx, py - cy);
}

function distToPolyline(px, py, points) {
  let min = Infinity;
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    min = Math.min(min, distToSegment(px, py, x1, y1, x2, y2));
  }
  return min;
}

export function HeroCircuit() {
  const svgRef = useRef(null);
  const padRefs = useRef([]);
  const traceRefs = useRef([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    function handleMove(e) {
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const scaleX = rect.width / 640;
      const scaleY = rect.height / 640;

      PADS.forEach((pad, i) => {
        const el = padRefs.current[i];
        if (!el) return;
        const padScreenX = rect.left + pad.x * scaleX;
        const padScreenY = rect.top + pad.y * scaleY;
        const dist = Math.hypot(e.clientX - padScreenX, e.clientY - padScreenY);
        const intensity = Math.max(0, 1 - dist / GLOW_RADIUS_PX);
        el.style.setProperty("--glow", intensity.toFixed(3));
      });

      // mouse position in viewBox space, for trace proximity (non-uniform
      // scale since preserveAspectRatio="none")
      const vx = (e.clientX - rect.left) / scaleX;
      const vy = (e.clientY - rect.top) / scaleY;
      TRACES.forEach((trace, i) => {
        const el = traceRefs.current[i];
        if (!el) return;
        // approximate screen-space distance by scaling the closer axis
        const dist = distToPolyline(vx, vy, trace.points) * Math.min(scaleX, scaleY);
        const intensity = Math.max(0, 1 - dist / GLOW_RADIUS_PX);
        el.style.setProperty("--glow", intensity.toFixed(3));
      });
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute top-0 left-0 h-full w-[min(640px,58%)] fill-none opacity-70"
      viewBox="0 0 640 640"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {TRACES.map((trace, i) => (
          <path
            key={i}
            ref={(el) => (traceRefs.current[i] = el)}
            d={trace.d}
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.5"
            style={{
              "--glow": 0,
              stroke: "color-mix(in srgb, white calc(20% + var(--glow) * 80%), transparent)",
              filter: "drop-shadow(0 0 calc(var(--glow) * 5px) white)",
            }}
          />
        ))}
      </g>
      <g strokeLinecap="round" fill="none">
        {TRACES.map((trace, i) => (
          <path
            key={i}
            d={trace.d}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="14 900"
            className="circuit-pulse"
            style={{ animationDelay: `${i * -0.6}s`, filter: "drop-shadow(0 0 4px white)" }}
          />
        ))}
      </g>
      <g>
        {PADS.map((pad, i) => (
          <circle
            key={i}
            ref={(el) => (padRefs.current[i] = el)}
            cx={pad.x}
            cy={pad.y}
            r="5"
            style={{
              "--glow": 0,
              fill: `color-mix(in srgb, var(${pad.cssVar}) calc(var(--glow) * 100%), var(--border))`,
              filter: `drop-shadow(0 0 calc(var(--glow) * 7px) var(${pad.cssVar}))`,
            }}
          />
        ))}
      </g>

      <style jsx>{`
        .circuit-pulse {
          opacity: 0.85;
          animation: circuit-pulse-move 3.5s linear infinite;
        }
        @keyframes circuit-pulse-move {
          to {
            stroke-dashoffset: -914;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .circuit-pulse {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </svg>
  );
}

export function HeroArtMark() {
  return (
    <svg
      className="pointer-events-none absolute top-6 left-6 h-[90px] w-[90px] fill-none opacity-70"
      viewBox="0 0 400 400"
      aria-hidden="true"
    >
      <g stroke="var(--border)" strokeWidth="2" transform="rotate(-8 200 200)">
        <line x1="200" y1="200" x2="90" y2="90" />
        <line x1="200" y1="200" x2="310" y2="90" />
        <line x1="200" y1="200" x2="90" y2="310" />
        <line x1="200" y1="200" x2="310" y2="310" />
        <rect x="175" y="175" width="50" height="50" rx="8" />
        <circle cx="90" cy="90" r="40" />
        <circle cx="310" cy="90" r="40" />
        <circle cx="90" cy="310" r="40" />
        <circle cx="310" cy="310" r="40" />
      </g>
    </svg>
  );
}
