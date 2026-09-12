import { Reveal } from "@/components/reveal";

export function AboutSection() {
  return (
    <section id="about" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <h2 className="mb-12 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">01.</span> About Me
      </h2>
      <Reveal className="max-w-[640px]">
        <p className="mb-4 text-muted-foreground">
          I&apos;m a Mechanical Engineering student at Ohio State University,
          open to roles anywhere in the United States. I&apos;m drawn to
          problems that sit at the intersection of hardware and software -
          whether that&apos;s a servo-driven turret tracking a hand in real
          time, or a dashboard that turns messy data into a clear decision.
        </p>
        <p className="mb-4 text-muted-foreground">
          Outside coursework, I build side projects to learn by shipping:
          computer vision, embedded systems, and full-stack web apps. Right
          now I&apos;m focused on internship search tooling and expanding
          into more robotics/AI work, with a growing interest in defense
          tech specifically.
        </p>
        <ul className="mt-6 grid gap-2">
          <li className="text-[0.95rem]">
            <strong className="text-foreground">Location:</strong> United States
          </li>
          <li className="text-[0.95rem]">
            <strong className="text-foreground">Education:</strong> B.S. Mechanical Engineering, Ohio State University
          </li>
          <li className="text-[0.95rem]">
            <strong className="text-foreground">Currently:</strong> Open to opportunities, feel free to reach out
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
