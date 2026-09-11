import Link from "next/link";

// Reusable case-study template, driven by a project data object from
// lib/projects-data.js. Renders the standard WHAT I DID / THE PROBLEM /
// KEY DECISIONS / RESULT / NEXT STEPS layout, or the vague "status update"
// variant used only by the New Project teaser page.
export function CaseStudy({ project }) {
  const isTeaser = Boolean(project.statusUpdate);

  return (
    <>
      <section className="container mx-auto max-w-[1080px] px-6 pt-12 pb-8">
        <p className="mb-3 font-mono text-[0.8rem] font-semibold tracking-[0.08em] text-muted-foreground">
          <Link href="/#projects" className="hover:text-brand">
            PROJECTS
          </Link>{" "}
          / {project.title.toUpperCase()}
        </p>
        <h1 className="mb-3 font-display text-[clamp(2rem,5vw,2.8rem)] font-extrabold tracking-[-0.02em]">
          {project.title}
        </h1>
        <p className="max-w-[640px] text-[1.05rem] text-muted-foreground">{project.subtitle}</p>

        <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-card sm:grid-cols-4 md:grid-cols-[repeat(4,1fr)_auto]">
          <div className="border-b border-r border-border p-5 sm:border-b-0">
            <span className="mb-1.5 block font-mono text-[0.7rem] font-semibold tracking-[0.06em] text-muted-foreground">
              STATUS
            </span>
            <span
              className={`inline-block rounded border px-2.5 py-0.5 font-mono text-[0.75rem] font-bold tracking-[0.04em] ${
                project.statusInProgress
                  ? "border-cat-yellow text-cat-yellow"
                  : "border-brand text-brand"
              }`}
            >
              {project.status}
            </span>
          </div>
          <div className="border-b border-r border-border p-5 sm:border-b-0">
            <span className="mb-1.5 block font-mono text-[0.7rem] font-semibold tracking-[0.06em] text-muted-foreground">
              TIMEFRAME
            </span>
            <span className="text-[0.92rem] font-semibold">{project.timeframe}</span>
          </div>
          <div className="border-r border-border p-5 sm:border-b sm:border-r-0 md:border-b-0 md:border-r">
            <span className="mb-1.5 block font-mono text-[0.7rem] font-semibold tracking-[0.06em] text-muted-foreground">
              ROLE
            </span>
            <span className="text-[0.92rem] font-semibold">{project.role}</span>
          </div>
          <div className="p-5 sm:border-b md:border-r md:border-b-0">
            <span className="mb-1.5 block font-mono text-[0.7rem] font-semibold tracking-[0.06em] text-muted-foreground">
              CONTEXT
            </span>
            <span className="text-[0.92rem] font-semibold">{project.context}</span>
          </div>
          <div className="border-t border-border p-5 sm:col-span-2 sm:border-t md:col-span-1 md:border-t-0">
            <span className="mb-1.5 block font-mono text-[0.7rem] font-semibold tracking-[0.06em] text-muted-foreground">
              ENTRY
            </span>
            <span className="text-[0.92rem] font-semibold">{project.entry}</span>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-[1080px] grid grid-cols-1 items-start gap-12 px-6 pt-10 pb-16 md:grid-cols-[1.7fr_1fr]">
        <div>
          {isTeaser ? (
            <div className="mb-9">
              <div className="mb-3.5 font-mono text-[0.78rem] font-bold tracking-[0.06em] text-brand">
                STATUS UPDATE
              </div>
              {project.statusUpdate.map((p, i) => (
                <p key={i} className="mb-3 text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          ) : (
            <>
              <CaseSection label="WHAT I DID" content={project.whatIDid} />
              <CaseSection label="THE PROBLEM" content={project.theProblem} />
              <CaseSection label="KEY DECISIONS" bullets={project.keyDecisions} />
              <CaseSection label="RESULT" content={project.result} />
              {project.nextSteps && <CaseSection label="NEXT STEPS" bullets={project.nextSteps} />}

              <div className="mb-9">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-block rounded-lg bg-brand px-6 py-3 text-[0.95rem] font-semibold text-primary-foreground transition-colors hover:bg-brand-hover"
                >
                  View Source on GitHub &rarr;
                </a>
              </div>
            </>
          )}
        </div>

        <div>
          {project.builtWith && (
            <div className="mb-8">
              <div className="mb-3.5 font-mono text-[0.78rem] font-bold tracking-[0.06em] text-brand">
                BUILT WITH
              </div>
              <ul className="flex flex-wrap gap-2">
                {project.builtWith.map((tool) => (
                  <li key={tool} className="rounded-md border border-border px-3 py-1.5 font-mono text-[0.82rem]">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.buildMedia?.map((media, i) => (
            <div key={i} className="mb-8">
              {media.type === "video" ? (
                <video
                  src={media.src}
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full rounded-lg border border-border bg-secondary"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={media.src}
                  alt={media.alt ?? ""}
                  className="w-full rounded-lg border border-border bg-secondary"
                />
              )}
              <p className="mt-2.5 text-[0.82rem] text-muted-foreground">{media.caption}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto max-w-[1080px] flex items-center justify-between border-t border-border px-6 py-8">
        <Link
          href={`/${project.prevSlug}`}
          className="font-mono text-[0.9rem] font-semibold text-muted-foreground hover:text-brand"
        >
          &larr; {project.prevTitle}
        </Link>
        <Link href="/#projects" className="font-mono text-[0.9rem] font-semibold text-muted-foreground hover:text-brand">
          All Projects
        </Link>
        <Link
          href={`/${project.nextSlug}`}
          className="font-mono text-[0.9rem] font-semibold text-muted-foreground hover:text-brand"
        >
          {project.nextTitle} &rarr;
        </Link>
      </div>
    </>
  );
}

function CaseSection({ label, content, bullets }) {
  const paragraphs = Array.isArray(content) ? content : content ? [content] : [];
  return (
    <div className="mb-9">
      <div className="mb-3.5 font-mono text-[0.78rem] font-bold tracking-[0.06em] text-brand">{label}</div>
      {paragraphs.map((p, i) => (
        <p key={i} className="mb-3 text-muted-foreground">
          {p}
        </p>
      ))}
      {bullets && (
        <ul className="flex flex-col gap-2.5">
          {bullets.map((b, i) => (
            <li key={i} className="relative pl-5 text-muted-foreground before:absolute before:left-0 before:content-['\2013'] before:text-brand">
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
