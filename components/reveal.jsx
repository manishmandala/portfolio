"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SESSION_KEY = "mmRevealSeen";

// Fade + rise into view, replacing the old IntersectionObserver-based
// [data-reveal] behavior from script.js. `delay` lets callers stagger a
// group of siblings (e.g. 0, 0.07, 0.14 ...).
//
// Plays only once per browser session (sessionStorage-gated, same pattern
// as the intro splash) - the first time the site's opened, sections
// animate in as you scroll to them; any reload/revisit within that same
// session (including client-side navigation back to this page) just shows
// everything immediately, no re-animating.
//
// Decided once via a lazy useState initializer (runs synchronously on the
// client's first render, before Framer Motion ever applies a style) rather
// than flipping `initial`/`animate` props after mount via an effect - an
// earlier version did that and left content permanently stuck at
// opacity:0 whenever the props shape changed out from under Framer Motion
// mid-lifecycle. Here the prop *shape* never changes, only `initial`'s
// value does, decided before first paint.
export function Reveal({ children, delay = 0, className, as = "div", ...props }) {
  const [seen] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      initial={seen ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onViewportEnter={() => {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // ignore
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
