/* ═══════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════ */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateTrail() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
})();

document.querySelectorAll('a, button, .gallery-item, .img-main, .img-secondary').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorTrail.style.width  = '56px';
    cursorTrail.style.height = '56px';
    cursorTrail.style.borderColor = 'var(--pink-deep)';
  });
  el.addEventListener('mouseleave', () => {
    cursorTrail.style.width  = '36px';
    cursorTrail.style.height = '36px';
    cursorTrail.style.borderColor = 'var(--pink-mid)';
  });
});

/* ═══════════════════════════════════════════
   NAV SCROLL STATE
═══════════════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ═══════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════ */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function toggleMenu(force) {
  menuOpen = typeof force === 'boolean' ? force : !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    document.body.style.overflow = 'hidden';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    document.body.style.overflow = '';
  }
}

burger.addEventListener('click', () => toggleMenu());
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => toggleMenu(false)));
mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) toggleMenu(false); });

/* ═══════════════════════════════════════════
   REVEAL ON SCROLL (IntersectionObserver)
═══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════
   SKILL BARS (animate when section enters viewport)
═══════════════════════════════════════════ */
let skillsAnimated = false;
const skillsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !skillsAnimated) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(fill => {
      fill.style.width = fill.dataset.width + '%';
    });
    skillsObserver.disconnect();
  }
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillsObserver.observe(skillsSection);

/* ═══════════════════════════════════════════
   BLOB PARALLAX ON MOUSE
═══════════════════════════════════════════ */
const heroBlobs = document.querySelectorAll('.hero-bg .blob');
window.addEventListener('mousemove', e => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  heroBlobs.forEach((b, i) => {
    const f = (i + 1) * 9;
    b.style.transform = `translate(${dx*f}px, ${dy*f}px)`;
  });
}, { passive: true });

/* ═══════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ═══════════════════════════════════════════
   GALLERY: subtle 3-D TILT
═══════════════════════════════════════════ */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mousemove', e => {
    const r  = item.getBoundingClientRect();
    const x  = ((e.clientX - r.left)  / r.width  - 0.5) * 7;
    const y  = ((e.clientY - r.top)   / r.height - 0.5) * 7;
    item.style.transform    = `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.01)`;
    item.style.transition   = 'transform 0.1s';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform  = '';
    item.style.transition = 'transform 0.5s ease';
  });
});
