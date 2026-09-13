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
} from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { categoryStyle } from "@/lib/categories";

const GROUPS = [
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
      { icon: FaCubes, label: "FEA" },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <h2 className="mb-12 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">03.</span> Skills
      </h2>

      {/* color legend */}
      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
        {GROUPS.map((group) => (
          <div key={group.label} className="flex items-center gap-2" style={categoryStyle(group.category)}>
            <span className="h-[3px] w-4 rounded-full bg-[var(--row-color)]" />
            <span className="font-mono text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-[var(--row-color)]">
              {group.label}
            </span>
          </div>
        ))}
      </div>

      {/* all tags, flowing together, color-coded per group */}
      <Reveal>
        <ul className="flex flex-wrap gap-2.5">
          {GROUPS.flatMap((group) =>
            group.tags.map((tag) => (
              <li
                key={tag.label}
                className="inline-flex items-center gap-[7px] rounded-full border px-3.5 py-[7px] font-mono text-[0.85rem] transition-transform hover:-translate-y-0.5"
                style={{
                  ...categoryStyle(group.category),
                  color: "var(--row-color)",
                  borderColor: "color-mix(in srgb, var(--row-color) 30%, transparent)",
                  backgroundColor: "color-mix(in srgb, var(--row-color) 12%, transparent)",
                }}
              >
                <tag.icon className="text-[0.95rem]" />
                {tag.label}
              </li>
            ))
          )}
        </ul>
      </Reveal>
    </section>
  );
}
