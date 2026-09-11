// Faint circuit-trace line art confined to the empty margins above/below
// the hero text block, plus a small decorative geometric mark. Recreated
// from the original inline SVGs in index.html (.hero-bg-circuit /
// .hero-bg-art) - simplified, not pixel-identical, same visual idea.
export function HeroCircuit() {
  return (
    <svg
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
      <g fill="var(--border)">
        <circle cx="240" cy="20" r="5" />
        <circle cx="90" cy="60" r="5" />
        <circle cx="380" cy="110" r="5" />
        <circle cx="560" cy="10" r="5" />
        <circle cx="60" cy="80" r="5" />
        <circle cx="140" cy="610" r="5" />
        <circle cx="420" cy="555" r="5" />
        <circle cx="580" cy="570" r="5" />
        <circle cx="20" cy="560" r="5" />
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
