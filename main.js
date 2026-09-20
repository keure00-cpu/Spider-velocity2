// VELOCITY SPIDER — main.js

// Hamburger menu toggle
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Scroll-reveal: fade-up elements
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

// Animated stat counters
function animateCounter(el, target, suffix, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = (Number.isInteger(target) ? Math.floor(start) : start.toFixed(1)) + suffix;
    if (start >= target) clearInterval(timer);
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix, 1400);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => statObserver.observe(el));

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + sec.id ? 'var(--gold)' : '';
      });
    }
  });
}, { passive: true });
