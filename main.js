// Experience Counter
function updateExperienceTimer() {
  const startDate = new Date("2019-09-01T00:00:00Z");
  const now = new Date();

  let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  if (now.getDate() < startDate.getDate()) months -= 1;

  const years = Math.floor(months / 12);
  const extraMonths = months % 12;
  const ref = new Date(startDate.getFullYear() + years, startDate.getMonth() + extraMonths, startDate.getDate());
  const days = Math.floor((now - ref) / (1000 * 60 * 60 * 24));

  document.getElementById("experience-timer").textContent = `${years} years, ${extraMonths} months, ${days} days`;
}
updateExperienceTimer();
setInterval(updateExperienceTimer, 12 * 60 * 60 * 1000);

// SECTION SCROLL REVEAL ANIMATION
const sectionEls = document.querySelectorAll('.section');
function revealSections() {
  sectionEls.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) sec.classList.add('visible');
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// PARTICLE BACKGROUND
// Simple parallax particles (for more complex, import particles.js)
const cvs = document.querySelector('.particles-bg');
if (cvs && cvs.getContext) {
  const ctx = cvs.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  cvs.width = W; cvs.height = H;
  let particles = Array.from({ length: 48 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: 0.6 + Math.random() * 2.2,
    dx: -0.7 + Math.random() * 1.4,
    dy: -0.5 + Math.random() * 1.0,
    alpha: 0.19 + Math.random() * 0.3,
  }));
  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI, false);
      ctx.fillStyle = `rgba(114,206,255,${p.alpha})`;
      ctx.shadowBlur = 5; ctx.shadowColor = "#7cf6ff33";
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x += W; if (p.x > W) p.x -= W;
      if (p.y < 0) p.y += H; if (p.y > H) p.y -= H;
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    cvs.width = W; cvs.height = H;
  });
}

// DARK MODE TOGGLE
const toggleBtn = document.getElementById('darkToggle');
let dark = true;
toggleBtn.onclick = function () {
  dark = !dark;
  if (dark) {
    document.body.style.background = '#212534';
    document.body.style.color = '#eaeaea';
    toggleBtn.textContent = "🌙 Dark Mode";
    document.querySelectorAll('.section').forEach(s => s.style.background = 'rgba(34,39,61,0.97)');
  } else {
    document.body.style.background = '#f4f7fa';
    document.body.style.color = '#23292f';
    toggleBtn.textContent = "☀️ Light Mode";
    document.querySelectorAll('.section').forEach(s => s.style.background = '#fff');
  }
}