import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { TiltCard } from "@/components/tilt-card";
import { categoryStyle } from "@/lib/categories";
import { frontierData } from "@/lib/quant-data";

// Small static preview of the real efficient-frontier scatter (the full
// interactive version lives on the case-study page) - a genuine preview of
// what's inside instead of a generic decorative squiggle.
const FRONTIER_PREVIEW = (() => {
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

// Large, faint decorative marks sitting behind the photo on a couple of
// cards (dimmed by the same gradient overlay as everything else) - a nod to
// the "big faded logo behind the project" treatment, using generic
// non-trademarked shapes rather than reproducing any org's actual wordmark.
const WATERMARKS = {
  crosshair: (
    <svg viewBox="0 0 200 200" className="absolute -right-6 -top-6 h-40 w-40 opacity-[0.14]" aria-hidden="true">
      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M100 10v40M100 150v40M10 100h40M150 100h40" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  osu: (
    <svg viewBox="0 0 200 200" className="absolute -right-8 -top-8 h-44 w-44 opacity-[0.14]" aria-hidden="true">
      <rect x="20" y="20" width="160" height="160" rx="18" fill="none" stroke="currentColor" strokeWidth="10" />
      <rect x="55" y="55" width="90" height="90" rx="8" fill="none" stroke="currentColor" strokeWidth="8" />
    </svg>
  ),
};

// Numbered (01-07) bento project card: full-bleed background image/video,
// dark gradient overlay for legibility, number + external-link arrow icon
// top corners, title, short description, tag pills, category-color accent.
// Used for every homepage project entry, including the full-width feature
// card (project 1, Laser Turret).
export function ProjectCard({ project, featured = false }) {
  return (
    <TiltCard
      className={`group relative flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-secondary p-5 shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-200 hover:border-[var(--row-color)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] ${
        featured ? "min-h-[340px] md:col-span-2" : "min-h-[250px]"
      }`}
      style={categoryStyle(project.category)}
    >
      <Link href={`/${project.slug}`} className="absolute inset-0 z-10" aria-label={project.title} />

      {/* background media */}
      <div className="absolute inset-0 -z-20">
        {project.media.type === "image" && (
          <div className={`h-full w-full ${project.mediaFit === "contain" ? "bg-secondary" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.media.src}
              alt={project.media.alt ?? ""}
              loading="lazy"
              className={`h-full w-full saturate-[0.85] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:saturate-100 ${
                project.mediaFit === "contain"
                  ? "object-contain p-4 group-hover:scale-[1.015]"
                  : "object-cover group-hover:scale-[1.03]"
              }`}
            />
          </div>
        )}
        {project.media.type === "video" && (
          <video
            src={project.media.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover saturate-[0.85] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:saturate-100"
          />
        )}
        {project.media.type === "sparkline" && (
          <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden="true">
            {FRONTIER_PREVIEW.dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r="1.6" fill="var(--cat-green)" opacity="0.45" />
            ))}
            <circle cx={FRONTIER_PREVIEW.max.x} cy={FRONTIER_PREVIEW.max.y} r="3.5" fill="var(--cat-green)" />
          </svg>
        )}
        {project.watermark && (
          <div className="absolute inset-0 text-[var(--row-color)]">{WATERMARKS[project.watermark]}</div>
        )}
      </div>

      {/* gradient overlay */}
      <div
        className={`absolute inset-0 -z-10 ${
          project.solidCard
            ? `bg-gradient-to-br from-[color-mix(in_srgb,var(--cat-green)_16%,var(--secondary))] to-card`
            : "bg-gradient-to-t from-[rgba(8,10,15,0.92)] via-[rgba(8,10,15,0.55)] to-[rgba(8,10,15,0.2)]"
        }`}
      />

      <div className="relative z-[1] flex items-start justify-between">
        <span className="font-mono text-[0.8rem] font-bold tracking-[0.05em] text-[var(--row-color)] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          {project.number}
        </span>
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/30 bg-black/40 text-foreground backdrop-blur-md transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-[var(--row-color)] group-hover:text-[var(--row-color)]">
          <FaArrowUpRightFromSquare className="h-3 w-3" />
        </span>
      </div>

      <div className="relative z-[1]">
        <h3 className={`mb-1.5 font-display font-bold text-foreground ${featured ? "text-[1.35rem]" : "text-[1.15rem]"}`}>
          {project.title}
        </h3>
        <p className="mb-3.5 max-w-[46ch] text-[0.88rem] text-foreground/80">{project.cardDescription}</p>
        <ul className="flex flex-wrap gap-1.5">
          {project.cardTags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/20 bg-black/55 px-2.5 py-1 font-mono text-[0.72rem] text-foreground backdrop-blur-md"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </TiltCard>
  );
}
