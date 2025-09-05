// Current year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  // Initialize theme from localStorage or prefers-color-scheme
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved ? saved : (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initial);
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateNavbarBg();
    });
  }
  updateNavbarBg();
});

// Smooth scrolling for internal links (improves native behavior and offset)
document.addEventListener('click', (e) => {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;
  const id = target.getAttribute('href');
  if (id && id.length > 1) {
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
});

// Fade in on scroll using IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }
}, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

document.querySelectorAll('.animate-in').forEach((el) => observer.observe(el));

// Accessibility: close other FAQ items optionally (progressive enhancement)
// FAQ accordion (portfolio-style button + max-height)
document.querySelectorAll('.accordion').forEach((acc) => {
  const items = acc.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;
    answer.style.maxHeight = '0px';
    btn.addEventListener('click', () => {
      items.forEach((i) => {
        if (i !== item) {
          i.classList.remove('open');
          const a = i.querySelector('.faq-answer');
          if (a) a.style.maxHeight = '0px';
        }
      });
      const isOpen = item.classList.toggle('open');
      answer.style.maxHeight = isOpen ? answer.scrollHeight + 'px' : '0px';
    });
  });
});

// Navbar background update on scroll (portfolio-like behavior)
const header = document.querySelector('.site-header');
function updateNavbarBg(){
  if (!header) return;
  const theme = document.documentElement.getAttribute('data-theme');
  if (window.scrollY > 50) {
    header.style.background = theme === 'dark' ? 'rgba(15,23,42,0.98)' : 'rgba(255,255,255,0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,.15)';
  } else {
    header.style.background = theme === 'dark' ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)';
    header.style.boxShadow = 'none';
  }
}
window.addEventListener('scroll', updateNavbarBg);

// Mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navRight = document.querySelector('.nav-right');
if (mobileMenuBtn && navRight) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    const active = navRight.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', active ? 'true' : 'false');
    document.body.style.overflow = active ? 'hidden' : '';
  });
  document.querySelectorAll('.nav-link').forEach((l) => l.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navRight.classList.remove('active');
    document.body.style.overflow = '';
  }));
}


