"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/reveal";

const EXPERIENCE = [
  {
    mark: "NU",
    markColor: "#4E2A84",
    dates: "Jun 2026 - Aug 2026",
    title: "Undergraduate Research Assistant",
    org: "Northwestern University · AMPL Lab",
    description:
      "Researching faster GPU-based simulation methods for 3D printing, working alongside a team of PhD researchers at Northwestern's AMPL Lab.",
    badges: ["Research", "On-site", "Evanston, IL"],
  },
  {
    mark: "OSU",
    markColor: "#BB0000",
    dates: "Nov 2025 - Feb 2026",
    title: "AI/ML Developer",
    org: "Ohio State · Wexner Medical Center",
    description:
      "Built machine learning models to help classify brain tumor MRI scans for a hospital research team.",
    badges: ["Research", "On-site", "Columbus, OH"],
  },
  {
    mark: "EE",
    markColor: "#8a90a3",
    dates: "Jun 2025 - Aug 2025",
    title: "Analytics & Strategy Intern",
    org: "Epic Estates",
    description:
      "Analyzed a multi-million dollar land acquisition and helped shape the recommendation presented to senior leadership.",
    badges: ["Internship", "On-site", "Dallas, TX"],
  },
];

function ExperienceCard({ exp }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card px-6 py-5 transition-colors hover:border-[color-mix(in_srgb,var(--mark-color)_45%,var(--border))]" style={{ "--mark-color": exp.markColor }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 text-left"
      >
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold text-white"
          style={{ backgroundColor: exp.markColor }}
        >
          {exp.mark}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-[1.02rem] font-semibold text-foreground">{exp.title}</span>
          <span className="block truncate text-[0.88rem] text-muted-foreground">{exp.org}</span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="hidden font-mono text-[0.8rem] font-semibold sm:inline" style={{ color: exp.markColor }}>
            {exp.dates}
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-muted-foreground">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.span>
        </span>
      </button>
      <span className="mt-1 block font-mono text-[0.78rem] font-semibold sm:hidden" style={{ color: exp.markColor }}>
        {exp.dates}
      </span>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-[0.92rem] text-muted-foreground">{exp.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-secondary px-3 py-1 font-mono text-[0.72rem] text-muted-foreground"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <h2 className="mb-12 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">02.</span> Experience
      </h2>
      <div className="flex flex-col gap-4">
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={exp.title} delay={Math.min(i, 6) * 0.07}>
            <ExperienceCard exp={exp} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
