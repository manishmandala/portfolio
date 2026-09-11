// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll reveal (fade + rise into view, staggered within a group)
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length) {
  const groups = new Map();
  revealEls.forEach((el) => {
    const group = el.getAttribute('data-reveal-group') || 'default';
    if (!groups.has(group)) groups.set(group, []);
    const list = groups.get(group);
    el.style.setProperty('--reveal-delay', `${Math.min(list.length, 6) * 70}ms`);
    list.push(el);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
}

// Card tilt/lift follows the cursor (subtle, Framer-Motion-style spring feel)
document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--tilt-x', `${(-py * 5).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${(px * 5).toFixed(2)}deg`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  });
});
