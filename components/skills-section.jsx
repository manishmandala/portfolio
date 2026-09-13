"use client";

import { useState } from "react";
import {
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiReact,
  SiNodedotjs,
  SiOpencv,
  SiArduino,
  SiSqlite,
  SiGithub,
} from "react-icons/si";
import {
  FaDatabase,
  FaChartLine,
  FaHand,
  FaSatelliteDish,
  FaEye,
  FaPersonWalking,
  FaPlug,
  FaMicrochip,
  FaCubes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { categoryStyle } from "@/lib/categories";

const GROUPS = [
  {
    category: "blue",
    label: "Languages",
    blurb: "Core languages I write day to day.",
    tags: [
      { icon: SiPython, label: "Python" },
      { icon: SiJavascript, label: "JavaScript" },
      { icon: SiCplusplus, label: "C++ (Arduino)" },
      { icon: FaDatabase, label: "SQL" },
    ],
  },
  {
    category: "orange",
    label: "Frameworks & Libraries",
    blurb: "The frameworks and libraries I build with.",
    tags: [
      { icon: SiReact, label: "React" },
      { icon: SiNodedotjs, label: "Node.js / Express" },
      { icon: FaChartLine, label: "Streamlit" },
      { icon: SiOpencv, label: "OpenCV" },
      { icon: FaHand, label: "MediaPipe" },
    ],
  },
  {
    category: "aqua",
    label: "Tools & Platforms",
    blurb: "Tools and platforms in my everyday workflow.",
    tags: [
      { icon: SiGithub, label: "Git & GitHub" },
      { icon: SiArduino, label: "Arduino" },
      { icon: SiSqlite, label: "SQLite" },
      { icon: FaSatelliteDish, label: "WebSockets" },
    ],
  },
  {
    category: "violet",
    label: "Other",
    blurb: "Techniques and concepts I apply across projects.",
    tags: [
      { icon: FaEye, label: "Computer Vision" },
      { icon: FaPersonWalking, label: "Pose Estimation" },
      { icon: FaPlug, label: "REST APIs" },
      { icon: FaMicrochip, label: "Hardware Integration" },
      { icon: FaCubes, label: "FEA" },
    ],
  },
];

export function SkillsSection() {
  const [index, setIndex] = useState(0);
  const group = GROUPS[index];
  const prev = () => setIndex((i) => (i - 1 + GROUPS.length) % GROUPS.length);
  const next = () => setIndex((i) => (i + 1) % GROUPS.length);

  return (
    <section id="skills" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <h2 className="mb-12 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">03.</span> Skills
      </h2>

      <Reveal>
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous skill category"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
          >
            <FaChevronLeft className="h-3.5 w-3.5" />
          </button>

          <div
            className="flex-1 rounded-2xl border border-border bg-card px-6 py-10 transition-colors sm:px-10"
            style={categoryStyle(group.category)}
          >
            <p className="text-center font-mono text-[0.8rem] font-bold uppercase tracking-[0.08em] text-[var(--row-color)]">
              {group.label}
            </p>
            <p className="mx-auto mb-8 mt-1 max-w-[380px] text-center text-[0.88rem] text-muted-foreground">
              {group.blurb}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 sm:gap-x-10">
              {group.tags.map((tag) => (
                <div key={tag.label} className="flex w-20 flex-col items-center gap-2 text-center">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-xl border text-2xl"
                    style={{
                      color: "var(--row-color)",
                      borderColor: "color-mix(in srgb, var(--row-color) 35%, transparent)",
                      backgroundColor: "color-mix(in srgb, var(--row-color) 10%, transparent)",
                    }}
                  >
                    <tag.icon />
                  </span>
                  <span className="text-[0.75rem] text-muted-foreground">{tag.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next skill category"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
          >
            <FaChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {GROUPS.map((g, i) => (
            <button
              key={g.label}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${g.label}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-brand" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
