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
} from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { categoryStyle } from "@/lib/categories";

const SKILLS = [
  {
    category: "blue",
    label: "Languages",
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
    tags: [
      { icon: FaEye, label: "Computer Vision" },
      { icon: FaPersonWalking, label: "Pose Estimation" },
      { icon: FaPlug, label: "REST APIs" },
      { icon: FaMicrochip, label: "Hardware Integration" },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <h2 className="mb-12 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">03.</span> Skills
      </h2>
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
        {SKILLS.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 items-center gap-2.5 border-b border-border border-l-4 px-6 py-5 transition-colors last:border-b-0 sm:grid-cols-[200px_1fr] sm:gap-6"
            style={{ borderLeftColor: "var(--row-color)", ...categoryStyle(row.category) }}
          >
            <span className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.04em] text-[var(--row-color)]">
              {row.label}
            </span>
            <ul className="flex flex-wrap gap-2">
              {row.tags.map((tag) => (
                <li
                  key={tag.label}
                  className="inline-flex items-center gap-[7px] rounded-full border px-3 py-[5px] font-mono text-[0.85rem] text-[var(--row-color)] transition-transform hover:-translate-y-0.5"
                  style={{
                    borderColor: "color-mix(in srgb, var(--row-color) 30%, transparent)",
                    backgroundColor: "color-mix(in srgb, var(--row-color) 12%, transparent)",
                  }}
                >
                  <tag.icon className="text-[0.95rem]" />
                  {tag.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
