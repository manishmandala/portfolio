import { Reveal } from "@/components/reveal";
import { categoryStyle } from "@/lib/categories";

const EXPERIENCE = [
  {
    category: "aqua",
    dates: "Jun 2026 - Aug 2026",
    location: "Evanston, IL",
    title: "Undergraduate Research Assistant",
    org: "Northwestern University · McCormick School of Engineering, AMPL Lab",
    description:
      "Redesigned a GPU-accelerated additive manufacturing thermal solver's multimaterial system, swapping a 70-band discrete scheme for a continuous per-element field and cutting per-timestep cost roughly 20x. Built a mesh-import pipeline validated to 100% accuracy on convex geometry and ran weekly progress updates for a team of 10+ researchers.",
  },
  {
    category: "violet",
    dates: "Nov 2025 - Feb 2026",
    location: "Columbus, OH",
    title: "AI/ML Developer",
    org: "The Ohio State University · Wexner Medical Center",
    description:
      "Built deep learning models in Python to classify brain tumor MRI scans, cutting training time 10x with GPU acceleration. Designed the full ML pipeline end to end - preprocessing, augmentation, training, and evaluation - and ran experiments comparing architectures and hyperparameters.",
  },
  {
    category: "yellow",
    dates: "Jun 2025 - Aug 2025",
    location: "Dallas, TX",
    title: "Analytics & Strategy Intern",
    org: "Epic Estates",
    description:
      "Led a 4-person team analyzing a $3M, 403-acre land acquisition and presented a 40-slide deck to senior leadership at a board meeting. Built decision frameworks from 50+ pages of market research across 5+ deals, raising projected land value 30%.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <h2 className="mb-12 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">02.</span> Experience
      </h2>
      <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-border bg-border shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={exp.title} delay={Math.min(i, 6) * 0.07}>
            <div
              className="grid grid-cols-1 gap-2.5 border-l-4 bg-card p-6 transition-colors sm:grid-cols-[180px_1fr] sm:gap-6"
              style={{ borderLeftColor: "var(--row-color)", ...categoryStyle(exp.category) }}
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[0.82rem] font-semibold text-[var(--row-color)]">{exp.dates}</span>
                <span className="text-[0.82rem] text-muted-foreground">{exp.location}</span>
              </div>
              <div>
                <h3 className="mb-1 font-display text-[1.05rem]">{exp.title}</h3>
                <p className="mb-2.5 text-[0.88rem] font-semibold text-muted-foreground">{exp.org}</p>
                <p className="text-[0.92rem] text-muted-foreground">{exp.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
