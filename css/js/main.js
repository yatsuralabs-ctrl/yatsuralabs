// ========== STARS BACKGROUND ==========
const canvas = document.getElementById('stars-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars(count = 160) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.003 + 0.001,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.alpha += s.speed * s.twinkleDir;
      if (s.alpha >= 1 || s.alpha <= 0.1) s.twinkleDir *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize();
  initStars();
  drawStars();
}

// ========== NAVBAR SCROLL ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== MOBILE MENU ==========
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow =
      mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ========== SCROLL REVEAL ==========
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

// ========== CONTACT FORM ==========
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate send (replace with Formspree/EmailJS later)
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      if (formSuccess) {
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }
    }, 1500);
  });
}

// ========== CURSOR GLOW (optional) ==========
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,107,157,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
  transform: translate(-50%, -50%);
  transition: left 0.1s ease, top 0.1s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});
