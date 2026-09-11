"use client";

import { motion } from "framer-motion";

// Fade + rise into view, once, replacing the old IntersectionObserver-based
// [data-reveal] behavior from script.js. `delay` lets callers stagger a
// group of siblings (e.g. 0, 0.07, 0.14 ...).
export function Reveal({ children, delay = 0, className, as = "div", ...props }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
