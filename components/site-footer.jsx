export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center px-6 py-8 text-muted-foreground text-[0.85rem] border-t border-border">
      <p>&copy; {year} Manish Mandala. Built with React &amp; Next.js.</p>
    </footer>
  );
}
