"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Cursor-follow tilt + hover-lift, replacing the vanilla-JS .tilt-card
// mousemove/mouseleave handlers from script.js with Framer Motion springs.
export function TiltCard({ children, className, style, ...props }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { stiffness: 250, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), springConfig);
  const lift = useSpring(0, springConfig);

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseEnter() {
    lift.set(-6);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
    lift.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        y: lift,
        transformPerspective: 900,
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
