export function ContactSection() {
  return (
    <section id="contact" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <h2 className="mb-12 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">06.</span> Contact
      </h2>
      <div className="mx-auto max-w-[560px] text-center">
        <p className="mb-8 text-[1.05rem] text-muted-foreground">
          I&apos;m open to discussing or learning more about opportunities -
          particularly in mechatronics, robotics, autonomy, and artificial
          intelligence. Feel free to reach out with a question or just to
          connect.
        </p>
        <a
          href="mailto:manish.mandala07@gmail.com"
          className="inline-block rounded-lg bg-brand px-8 py-3.5 text-[1rem] font-semibold text-primary-foreground transition-colors hover:bg-brand-hover"
        >
          Say Hello
        </a>
        <ul className="mt-8 flex justify-center gap-6">
          <li>
            <a
              href="https://github.com/manishmandala"
              target="_blank"
              rel="noopener"
              className="border-b border-transparent text-[0.9rem] font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener"
              className="border-b border-transparent text-[0.9rem] font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
