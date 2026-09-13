"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// A soft, blurred glow that trails the cursor around the whole site - a
// spring-smoothed radial gradient sitting behind all content, subtle enough
// not to compete with anything, ignored on touch devices and for anyone
// with reduced-motion set.
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const x = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.5 });
  const y = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;
    setEnabled(true);

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[540px] w-[540px] rounded-full"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--brand) 21%, transparent) 0%, transparent 70%)",
        filter: "blur(40px)",
        mixBlendMode: "screen",
      }}
    />
  );
}
