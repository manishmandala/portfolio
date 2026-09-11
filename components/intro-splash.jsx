"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SESSION_KEY = "mmIntroSeen";
const AUTO_DISMISS_MS = 2600;

// SVG stroke-draw animation of "MM", shown once per browser session, on
// click or after ~2.6s. Locks page scroll while visible. Ports the old
// .intro-splash / #introSplash behavior from index.html + script.js.
export function IntroSplash() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage unavailable (e.g. private mode) - just show it once.
    }
    if (!seen) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    document.documentElement.classList.add("intro-active");
    const timer = setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove("intro-active");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function dismiss() {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-background cursor-pointer"
          onClick={dismiss}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          aria-hidden="true"
        >
          <svg
            className="w-[min(70vw,340px)] overflow-visible"
            viewBox="0 0 300 130"
          >
            <text
              x="50%"
              y="68%"
              textAnchor="middle"
              className="intro-text"
            >
              MM
            </text>
          </svg>
          <span className="intro-skip absolute bottom-12 left-0 right-0 text-center font-mono text-[0.7rem] tracking-[0.1em] uppercase text-muted-foreground">
            Tap to skip
          </span>

          <style jsx>{`
            .intro-text {
              font-family: var(--font-display);
              font-size: 100px;
              font-weight: 700;
              fill: none;
              stroke: var(--brand);
              stroke-width: 1.4;
              stroke-dasharray: 2200;
              stroke-dashoffset: 2200;
              filter: drop-shadow(0 0 10px color-mix(in srgb, var(--brand) 65%, transparent));
              animation:
                intro-draw 1.5s ease forwards,
                intro-fill 0.5s ease forwards 1.3s;
            }
            @keyframes intro-draw {
              to {
                stroke-dashoffset: 0;
              }
            }
            @keyframes intro-fill {
              to {
                fill: var(--foreground);
              }
            }
            .intro-skip {
              opacity: 0;
              animation: intro-skip-in 0.5s ease forwards 1.6s;
            }
            @keyframes intro-skip-in {
              to {
                opacity: 1;
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .intro-text {
                stroke-dashoffset: 0;
                fill: var(--foreground);
                animation: none;
              }
              .intro-skip {
                opacity: 1;
                animation: none;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
