"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SESSION_KEY = "mmRevealSeen";

// Cached once per page load (module-level, not per-component), so every
// Reveal instance on the page agrees on the same "have I already loaded
// this site in this browser session" answer. An earlier version had each
// instance independently write sessionStorage on its own viewport-enter -
// whichever one happened to trigger first (usually something already near
// the top of the page) would flip the flag, so everything further down the
// page would see it already "seen" and skip its own animation, even on a
// genuinely first-ever visit.
let cachedSeen = null;
function wasAlreadySeenThisSession() {
  if (cachedSeen === null) {
    if (typeof window === "undefined") return false; // SSR default
    try {
      cachedSeen = sessionStorage.getItem(SESSION_KEY) === "1";
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      cachedSeen = false;
    }
  }
  return cachedSeen;
}

// Fade + rise into view, replacing the old IntersectionObserver-based
// [data-reveal] behavior from script.js (this rebuilds that same technique
// directly, rather than Framer Motion's whileInView - see below). `delay`
// lets callers stagger a group of siblings (e.g. 0, 0.07, 0.14 ...).
//
// Plays only on the first page load per browser session - any reload or
// client-side navigation back to a page within that same session shows
// everything immediately, no re-animating.
//
// Uses a real IntersectionObserver + animate (not whileInView) because
// whileInView combined with a conditional `initial` value turned out to
// behave unreliably here - elements were resolving to fully visible
// immediately regardless of scroll position or session state, verified
// directly against the built HTML/computed styles rather than assumed.
// This version is driven entirely by explicit state this component
// controls, so its behavior isn't dependent on Framer Motion's internal
// SSR/hydration handling for that particular prop combination.
export function Reveal({ children, delay = 0, className, as = "div", ...props }) {
  const [seenAtLoad] = useState(wasAlreadySeenThisSession);
  const [entered, setEntered] = useState(seenAtLoad);
  const elRef = useRef(null);

  useEffect(() => {
    if (seenAtLoad) return; // already visible from first render, nothing to observe
    const el = elRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [seenAtLoad]);

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      ref={elRef}
      initial={false}
      animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
