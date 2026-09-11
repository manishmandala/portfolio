// Maps the site's category keys to their CSS custom-property name (defined
// in app/globals.css) and to static Tailwind utility classes built on the
// bg-cat-*/text-cat-*/border-cat-* tokens.
//
// `cssVar` is used for cases that need a *dynamic* per-category color at
// runtime (e.g. a hover state keyed off `--row-color`) via Tailwind's
// arbitrary-value syntax, e.g. `text-[var(--row-color)]` - that whole class
// token is a literal string in source so Tailwind's static scanner can still
// find it, even though the color itself resolves at runtime through the CSS
// variable set inline via `categoryStyle()`.
export const CATEGORY_CLASSES = {
  blue: { text: "text-cat-blue", border: "border-cat-blue", bg: "bg-cat-blue", cssVar: "--cat-blue" },
  orange: { text: "text-cat-orange", border: "border-cat-orange", bg: "bg-cat-orange", cssVar: "--cat-orange" },
  aqua: { text: "text-cat-aqua", border: "border-cat-aqua", bg: "bg-cat-aqua", cssVar: "--cat-aqua" },
  yellow: { text: "text-cat-yellow", border: "border-cat-yellow", bg: "bg-cat-yellow", cssVar: "--cat-yellow" },
  magenta: { text: "text-cat-magenta", border: "border-cat-magenta", bg: "bg-cat-magenta", cssVar: "--cat-magenta" },
  green: { text: "text-cat-green", border: "border-cat-green", bg: "bg-cat-green", cssVar: "--cat-green" },
  violet: { text: "text-cat-violet", border: "border-cat-violet", bg: "bg-cat-violet", cssVar: "--cat-violet" },
  red: { text: "text-cat-red", border: "border-cat-red", bg: "bg-cat-red", cssVar: "--cat-red" },
};

// Inline style that sets --row-color to a given category's color, so
// Tailwind arbitrary-value classes like `text-[var(--row-color)]` or
// `border-[var(--row-color)]` can reference it.
export function categoryStyle(category) {
  const entry = CATEGORY_CLASSES[category] ?? CATEGORY_CLASSES.blue;
  return { "--row-color": `var(${entry.cssVar})` };
}
