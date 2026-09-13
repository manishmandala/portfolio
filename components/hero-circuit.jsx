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

const GLOW_RADIUS_PX = 140;

export function HeroCircuit() {
  const svgRef = useRef(null);
  const padRefs = useRef([]);

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
      <g stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0,60 L90,60 L90,20 L240,20" />
        <path d="M560,10 L560,75 L470,75 L470,110 L380,110" />
        <path d="M150,110 L150,80 L60,80" />
        <path d="M20,560 L20,610 L140,610" />
        <path d="M300,640 L300,590 L420,590 L420,555" />
        <path d="M480,610 L580,610 L580,570" />
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
