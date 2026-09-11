"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#now", label: "Now" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="container mx-auto max-w-[1080px] px-6 flex items-center justify-between h-[68px]">
        <Link href="/" className="font-display font-bold text-[1.1rem] tracking-[-0.01em]">
          Manish Mandala
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 bg-transparent border-none cursor-pointer"
        >
          <span
            className={`block h-0.5 w-full bg-foreground rounded transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-foreground rounded transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-foreground rounded transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>

        <ul
          className={`
            md:flex md:items-center md:gap-8 md:static md:translate-y-0 md:opacity-100 md:pointer-events-auto md:bg-transparent md:border-none md:p-0 md:flex-row
            absolute top-[68px] left-0 right-0 flex-col items-start gap-5 p-6 bg-background border-b border-border
            transition-all duration-200
            ${open ? "flex translate-y-0 opacity-100 pointer-events-auto" : "hidden md:flex -translate-y-2 opacity-0 pointer-events-none"}
          `}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[0.95rem] font-medium text-muted-foreground transition-colors hover:text-brand"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
