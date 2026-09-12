"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { homepageProjects } from "@/lib/projects-data";

export function ProjectsSection() {
  const [activeSlug, setActiveSlug] = useState(null);
  const activeProject = homepageProjects.find((p) => p.slug === activeSlug) ?? null;

  return (
    <section id="projects" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <h2 className="mb-12 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">04.</span> Projects
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {homepageProjects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={Math.min(i, 6) * 0.07}
            className={project.featured ? "md:col-span-2" : ""}
          >
            <ProjectCard project={project} featured={project.featured} onOpen={() => setActiveSlug(project.slug)} />
          </Reveal>
        ))}
      </div>
      <ProjectModal project={activeProject} onClose={() => setActiveSlug(null)} />
    </section>
  );
}
