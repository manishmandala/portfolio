"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaXmark } from "react-icons/fa6";
import { categoryStyle } from "@/lib/categories";
import { FrontierPreviewSvg } from "@/components/frontier-preview";

// Quick-preview popup for a project card - image, title, description, tags,
// and a link into the full case-study page. Opened from ProjectsSection's
// activeSlug state; closes on backdrop click, the X, or Escape.
export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    document.documentElement.classList.add("intro-active");
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("intro-active");
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-xl border border-border bg-card shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            style={categoryStyle(project.category)}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-[var(--row-color)] hover:text-[var(--row-color)]"
            >
              <FaXmark className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-secondary">
              {project.media.type === "image" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.media.src}
                  alt={project.media.alt ?? ""}
                  className={`h-full w-full ${project.mediaFit === "contain" ? "object-contain p-4" : "object-cover"}`}
                />
              )}
              {project.media.type === "video" && (
                <video src={project.media.src} autoPlay muted loop playsInline className="h-full w-full object-cover" />
              )}
              {project.media.type === "sparkline" && (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[color-mix(in_srgb,var(--cat-green)_16%,var(--secondary))] to-card">
                  <FrontierPreviewSvg />
                </div>
              )}
            </div>

            <div className="p-6">
              <p className="mb-2 font-mono text-[0.75rem] font-bold tracking-[0.06em] text-[var(--row-color)]">
                PROJECT {project.number}
              </p>
              <h3 className="mb-3 font-display text-[1.5rem] font-bold text-foreground">{project.title}</h3>
              <p className="mb-4 text-[0.95rem] text-muted-foreground">{project.cardDescription}</p>
              <ul className="mb-6 flex flex-wrap gap-2">
                {project.cardTags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-[0.75rem] text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${project.slug}`}
                className="inline-flex items-center gap-2 font-semibold text-[var(--row-color)] hover:underline"
              >
                View Full Case Study <FaArrowUpRightFromSquare className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
