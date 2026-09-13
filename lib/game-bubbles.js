// Default content-bubble config for the hero game's "Explore" mode, derived
// from the real project data instead of being hand-duplicated - pass a
// different array as the `bubbleConfig` prop to HeroGame to override.
import { homepageProjects } from "./projects-data";
import { CATEGORY_CLASSES } from "./categories";

export const defaultBubbleConfig = [
  ...homepageProjects.map((p) => ({
    id: p.slug,
    type: "project",
    label: p.shortTitle,
    description: p.cardDescription,
    route: `/${p.slug}`,
    cssVar: (CATEGORY_CLASSES[p.category] ?? CATEGORY_CLASSES.blue).cssVar,
  })),
  {
    id: "about",
    type: "about",
    label: "About Me",
    description: "Mechanical Engineering student at Ohio State, building hardware and software end to end.",
    route: "/#about",
    cssVar: "--brand",
  },
  {
    id: "experience",
    type: "about",
    label: "Experience",
    description: "Research and internship roles - Northwestern, OSU Wexner Medical Center, Epic Estates.",
    route: "/#experience",
    cssVar: "--brand",
  },
];
