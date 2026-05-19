/* ============================================
   CANADA P.J MEDIA - ACADEMIC MEDIA HUB
   Main JavaScript File
   ============================================ */

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar && navbar.classList.add('scrolled');
  } else {
    navbar && navbar.classList.remove('scrolled');
  }
});

// ---- MOBILE TOGGLE ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.innerHTML = navLinks.classList.contains('open')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
}

// ---- SMOOTH CLOSE NAV ON LINK CLICK ----
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks && navLinks.classList.remove('open');
    if (navToggle) navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// ---- GROUP JOIN POPUP ----
document.querySelectorAll('.group-join-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const groupName = btn.getAttribute('data-group');
    const nameEl = document.getElementById('groupPopupName');
    if (nameEl) nameEl.textContent = groupName || 'Our Community';
    openPopup('groupPopup');
  });
});

// ---- POPUP FUNCTIONS ----
function openPopup(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}
function closePopup(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}
// Close on overlay click
document.querySelectorAll('.popup-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
});

// ---- COPY REFERRAL LINK ----
function copyReferral() {
  const input = document.getElementById('referralLinkInput');
  if (!input) return;
  input.select();
  document.execCommand('copy');
  const btn = input.nextElementSibling;
  if (btn) {
    btn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => btn.innerHTML = '<i class="fas fa-copy"></i>', 2000);
  }
}

// ---- SHOW REFERRAL POPUP ON SERVICE CLICK ----
// (Simulated for demo - in production this triggers after payment confirmation)
const serviceLinks = document.querySelectorAll('.service-btn');
serviceLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (!link.href || link.href === '#') {
      e.preventDefault();
      setTimeout(() => openPopup('referralPopup'), 600);
    }
  });
});

// ---- ANIMATE ON SCROLL ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .pillar-card, .tier-card, .advert-card, .group-card, .booster-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

const styleEl = document.createElement('style');
styleEl.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(styleEl);

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseInt(el.textContent.replace(/[^0-9]/g, ''));
  const suffix = el.textContent.replace(/[0-9]/g, '');
  if (isNaN(target)) return;
  let start = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = start + suffix;
    }
  }, 30);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);
