// ===================== Particles & Floating Elements =====================
function createParticles() {
  const container = document.querySelector(".particles");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = 3 + Math.random() * 3 + "s";
    container.appendChild(particle);
  }
}
createParticles();

function createFloatingElements() {
  const container = document.createElement("div");
  container.className = "floating-elements";
  document.body.appendChild(container);
  for (let i = 0; i < 10; i++) {
    const el = document.createElement("div");
    el.className = "floating-element";
    el.style.left = Math.random() * 100 + "%";
    el.style.top = Math.random() * 100 + "%";
    el.style.animationDelay = Math.random() * 15 + "s";
    el.style.animationDuration = 10 + Math.random() * 10 + "s";
    container.appendChild(el);
  }
}
createFloatingElements();

// ===================== Smooth Scrolling =====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===================== Background Gradient =====================
let gradientAngle = 0;
function updateGradient() {
  gradientAngle += 0.5;
  document.body.style.background = `linear-gradient(${gradientAngle}deg, #1a1a2e, #16213e, #0f3460, #1a1a2e)`;
  requestAnimationFrame(updateGradient);
}
updateGradient();

// ===================== Matrix Effect =====================
const chars = "01";
function createMatrixEffect() {
  const bg = document.createElement("div");
  bg.className = "matrix-bg";
  document.body.appendChild(bg);
  const columns = Math.floor(window.innerWidth / 20);
  for (let i = 0; i < columns; i++) {
    const col = document.createElement("div");
    col.className = "matrix-column";
    col.style.left = i * 20 + "px";
    col.style.animationDelay = Math.random() * 10 + "s";
    col.style.animationDuration = 5 + Math.random() * 5 + "s";
    let text = "";
    for (let j = 0; j < 20; j++) {
      text += chars[Math.floor(Math.random() * chars.length)] + "<br>";
    }
    col.innerHTML = text;
    bg.appendChild(col);
  }
}
createMatrixEffect();

// ===================== Hero Typing Effect =====================
function addTypingEffect() {
  const heroTitle = document.querySelector(".hero-content h1");
  if (!heroTitle) return;
  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
    } else clearInterval(timer);
  }, 100);
}
addTypingEffect();

// ===================== Project Cards 3D Tilt =====================
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 10;
    const rotateY = (rect.width / 2 - x) / 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  });
});

// ===================== Intersection Observer =====================
const enhancedObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = "fadeInUp 0.8s ease forwards";
          entry.target.style.transform = "translateY(0)";
          entry.target.style.opacity = "1";
        }, index * 200);
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(".project-card, .contact-method, .about-content")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    enhancedObserver.observe(el);
  });

// ===================== Scroll / Parallax Effects =====================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector("#hero");
  if (hero) hero.style.transform = `translateY(${-scrolled * 0.5}px)`;

  const header = document.querySelector("header");
  header.style.background = `rgba(26,26,46,${
    Math.min(scrolled / 100, 1) * 0.9
  })`;

  document.querySelectorAll(".project-card").forEach((card, index) => {
    const speed = 0.02 + index * 0.01;
    const rotation = scrolled * speed;
    card.style.transform += ` rotateY(${rotation}deg)`;
  });
});

// ===================== Mobile Menu =====================
const toggleBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
