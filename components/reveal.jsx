"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

const SESSION_KEY = "mmRevealSeen";
// useLayoutEffect warns when it runs during SSR; alias to useEffect there
// since this only ever needs to run in the browser anyway.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Fade + rise into view, replacing the old IntersectionObserver-based
// [data-reveal] behavior from script.js. `delay` lets callers stagger a
// group of siblings (e.g. 0, 0.07, 0.14 ...).
//
// Plays only once per browser session (sessionStorage-gated, same pattern
// as the intro splash) - the first time the site's opened, sections
// animate in as you scroll to them; any reload/revisit within that same
// session just shows everything immediately, no re-animating, so it
// doesn't get repetitive.
export function Reveal({ children, delay = 0, className, as = "div", ...props }) {
  const [skipAnimation, setSkipAnimation] = useState(false);

  useIsoLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") setSkipAnimation(true);
    } catch {
      // sessionStorage unavailable - just animate normally
    }
  }, []);

  const MotionTag = motion[as] ?? motion.div;

  if (skipAnimation) {
    return (
      <MotionTag className={className} {...props}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y: 22 }}
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
