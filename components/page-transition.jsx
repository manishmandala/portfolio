"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Wraps every route's content so navigating between pages (including from
// a project preview modal into its full case-study page) gets a real
// fade + rise transition instead of an instant swap.
export function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
