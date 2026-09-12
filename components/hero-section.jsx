import Link from "next/link";
import { HeroCircuit, HeroArtMark } from "@/components/hero-circuit";
import { HeroGame } from "@/components/hero-game";

export function HeroSection() {
  return (
    <section
      id="home"
      className="container mx-auto max-w-[1080px] px-6 relative flex flex-col-reverse items-center gap-12 overflow-hidden py-12 text-center md:min-h-[calc(100vh-68px)] md:flex-row md:items-center md:justify-between md:text-left"
    >
      <div className="relative z-[1] max-w-[620px]">
        <p className="mb-4 font-mono text-[0.85rem] font-semibold tracking-[0.06em] text-brand">
          AI &middot; ROBOTICS &middot; AUTONOMY &middot; TECH &amp; DEFENSE
        </p>
        <div className="mb-5 flex items-center justify-center gap-[18px] md:justify-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/headshot.png"
            alt="Manish Mandala"
            className="h-14 w-14 shrink-0 rounded-full border border-border object-cover md:h-[76px] md:w-[76px]"
          />
          <h1 className="font-display text-[clamp(2.4rem,6vw,3.6rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
            Manish Mandala
          </h1>
        </div>

        <Link
          href="/new-project"
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border py-2.5 pl-3 pr-4 transition-[border-color,background-color,transform] duration-150 hover:-translate-y-px"
          style={{
            borderColor: "color-mix(in srgb, var(--cat-yellow) 45%, var(--border))",
            backgroundColor: "color-mix(in srgb, var(--cat-yellow) 8%, transparent)",
          }}
        >
          <span className="wip-dot h-2 w-2 shrink-0 rounded-full bg-cat-yellow" />
          <span className="flex flex-col text-left leading-tight">
            <span className="font-mono text-[0.68rem] font-bold tracking-[0.07em] text-cat-yellow">
              WORKING ON RN
            </span>
            <span className="text-[0.82rem] text-muted-foreground">
              New project - in progress, details upcoming soon
            </span>
          </span>
        </Link>

        <p className="mx-auto mb-6 max-w-[520px] font-display text-[1.12rem] font-medium leading-snug text-muted-foreground md:mx-0">
          Mechanical Engineering student at Ohio State University building
          small, working projects end-to-end - hardware, software, or both -
          with a particular pull toward robotics, AI, and defense tech. Feel
          free to reach out with questions or opportunities.
        </p>

        <div className="mb-7 flex flex-wrap justify-center gap-3 md:justify-start">
          <span className="rounded-full border px-4 py-[7px] font-mono text-[0.78rem] font-semibold tracking-[0.03em] text-brand" style={{ borderColor: "color-mix(in srgb, var(--brand) 40%, transparent)", backgroundColor: "color-mix(in srgb, var(--brand) 10%, transparent)" }}>
            OPEN TO OPPORTUNITIES
          </span>
          <span className="rounded-full border border-border px-4 py-[7px] font-mono text-[0.78rem] font-semibold tracking-[0.03em] text-muted-foreground">
            UNITED STATES
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          <a
            href="https://github.com/manishmandala"
            target="_blank"
            rel="noopener"
            className="rounded-lg bg-brand px-6 py-3 text-[0.95rem] font-semibold text-primary-foreground transition-colors hover:bg-brand-hover"
          >
            GitHub
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="rounded-lg border border-border px-6 py-3 text-[0.95rem] font-semibold transition-colors hover:border-brand hover:text-brand"
          >
            LinkedIn
          </a>
          <a
            href="mailto:manish.mandala07@gmail.com"
            className="rounded-lg border border-border px-6 py-3 text-[0.95rem] font-semibold transition-colors hover:border-brand hover:text-brand"
          >
            Email
          </a>
        </div>
      </div>

      <HeroCircuit />
      <HeroArtMark />

      <HeroGame />
    </section>
  );
}
