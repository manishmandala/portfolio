import { frontierPreviewDots } from "@/lib/quant-data";

// Shared small preview of the real efficient-frontier scatter, used on the
// homepage project card and inside the preview modal (the full interactive
// version lives on the case-study page via components/quant-charts.jsx).
export function FrontierPreviewSvg({ className = "h-full w-full" }) {
  return (
    <svg viewBox="0 0 200 100" className={className} aria-hidden="true">
      <line x1="10" y1="88" x2="190" y2="88" stroke="var(--cat-green)" strokeWidth="0.75" opacity="0.3" />
      <line x1="10" y1="12" x2="10" y2="88" stroke="var(--cat-green)" strokeWidth="0.75" opacity="0.3" />
      {frontierPreviewDots.dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2.1" fill="var(--cat-green)" opacity="0.75" />
      ))}
      <circle
        cx={frontierPreviewDots.max.x}
        cy={frontierPreviewDots.max.y}
        r="4.5"
        fill="var(--cat-green)"
        stroke="var(--card)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
