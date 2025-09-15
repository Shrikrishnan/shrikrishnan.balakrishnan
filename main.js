// EXPERIENCE TIMER
function diffYMD(start, end) {
  // Calculate difference in years, months, days using actual month lengths
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    // Get days in previous month of 'end'
    let prevMonthDate = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonthDate.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

function sumPeriods(periods) {
  // Sum all periods, then normalize months and days using actual month lengths
  let total = { years: 0, months: 0, days: 0 };
  for (const p of periods) {
    const end = p.endDate ? new Date(p.endDate) : new Date();
    const start = new Date(p.startDate);
    const diff = diffYMD(start, end);
    total.years += diff.years;
    total.months += diff.months;
    total.days += diff.days;
  }

  while (total.days >= 30) {
    total.months += 1;
    total.days -= 30;
  }
  while (total.months >= 12) {
    total.years += 1;
    total.months -= 12;
  }
  return total;
}

function updateExperienceTimer() {
  const periods = [
    { startDate: "2025-07-28", endDate: new Date().toISOString().slice(0, 10) }, // BMW TECHWORKS INDIA PRIVATE LIMITED
    { startDate: "2025-06-06", endDate: "2025-07-25" }, // ASPIRE SYSTEMS (INDIA) PVT LIMITED
    { startDate: "2023-08-16", endDate: "2025-05-22" }, // HAPAG-LLOYD TECHNOLOGY CENTER PRIVATE LIMITED
    { startDate: "2019-09-09", endDate: "2023-06-29" } // WIPRO HR SERVICES INDIA PVT. LTD.
  ];
  const total = sumPeriods(periods);
  const expStr = `${total.years} years, ${total.months} months, ${total.days} days`;
  document.getElementById("experience-timer").textContent = expStr;

  // Set dynamic download filename
  const resumeBtn = document.getElementById("resume-download");
  if (resumeBtn) {
    const fileName = `Shrikrishnan_${total.years}y_${total.months}m_${total.days}d.pdf`;
    resumeBtn.setAttribute('download', fileName);
  }
}

updateExperienceTimer();
setInterval(updateExperienceTimer, 12 * 60 * 60 * 1000);

// SECTION SCROLL REVEAL ANIMATION
const sectionEls = document.querySelectorAll('.section');
function revealSections() {
  let delay = 0;
  sectionEls.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80 && !sec.classList.contains('visible')) {
      sec.style.animationDelay = `${delay}s`;
      sec.classList.add('visible');
      delay += 0.15; // stagger each section
    }
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
    document.body.style.background = 'linear-gradient(135deg, #212534 0%, #2e3a5c 100%)';
    document.body.style.color = '#eaeaea';
    toggleBtn.textContent = "🌙 Dark Mode";
    document.querySelectorAll('.section').forEach(s => {
      s.style.background = 'rgba(34,39,61,0.97)';
      s.style.boxShadow = '0 3px 30px 2px rgba(72, 128, 215, 0.18)';
      s.style.color = '#eaeaea';
      s.style.border = '1px solid #3c4a6b';
      s.style.transition = 'background 0.5s, color 0.5s, box-shadow 0.5s';
    });
    document.querySelector('header').style.background = 'linear-gradient(90deg, #232a44 60%, #2e3a5c 100%)';
    document.querySelector('header').style.color = '#eaeaea';
    toggleBtn.style.background = '#353757';
    toggleBtn.style.color = '#fff';
  } else {
    document.body.style.background = 'linear-gradient(135deg, #f4f7fa 0%, #e3e9f2 100%)';
    document.body.style.color = '#23292f';
    toggleBtn.textContent = "☀️ Light Mode";
    document.querySelectorAll('.section').forEach(s => {
      s.style.background = 'rgba(255,255,255,0.97)';
      s.style.boxShadow = '0 3px 30px 2px rgba(180, 200, 255, 0.13)';
      s.style.color = '#23292f';
      s.style.border = '1px solid #dbe6f7';
      s.style.transition = 'background 0.5s, color 0.5s, box-shadow 0.5s';
    });
    document.querySelector('header').style.background = 'linear-gradient(90deg, #e3e9f2 60%, #f4f7fa 100%)';
    document.querySelector('header').style.color = '#23292f';
    toggleBtn.style.background = '#e3e9f2';
    toggleBtn.style.color = '#23292f';
  }
}