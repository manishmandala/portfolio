import Link from "next/link";
import { Reveal } from "@/components/reveal";

const NOW_ITEMS = [
  {
    date: "Sep 2026",
    content: (
      <>
        A new project is in the works -{" "}
        <Link href="/new-project" className="font-semibold text-brand border-b border-brand">
          follow along
        </Link>
        , full write-up lands once it&apos;s done.
      </>
    ),
  },
  {
    date: "Sep 2026",
    content: "Polished up all three projects (bug fixes, docs) and added this site's Now log.",
  },
];

export function NowSection() {
  return (
    <section id="now" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <h2 className="mb-12 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">05.</span> Now
      </h2>
      <div className="max-w-[680px]">
        <p className="mb-6 text-[1rem] text-muted-foreground">
          What I&apos;m currently working on, updated as I go.
        </p>
        <ul className="flex flex-col gap-4">
          {NOW_ITEMS.map((item, i) => (
            <Reveal key={item.date + i} delay={Math.min(i, 6) * 0.07}>
              <li className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.4)] sm:flex-row sm:gap-5">
                <span className="shrink-0 font-mono text-[0.85rem] font-semibold text-brand sm:w-[90px]">
                  {item.date}
                </span>
                <span className="text-[0.95rem] text-foreground">{item.content}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
