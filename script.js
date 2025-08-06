// Custom Cursor
const cursor = document.querySelector(".cursor");
const cursorTrail = document.querySelector(".cursor-trail");
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Main cursor (faster movement)
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;
  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  // Trail cursor (slower, smoother movement)
  trailX += (mouseX - trailX) * 0.05;
  trailY += (mouseY - trailY) * 0.05;
  cursorTrail.style.left = trailX + "px";
  cursorTrail.style.top = trailY + "px";

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll(
  "a, button, .project-card, input, textarea, [data-cursor-hover]"
);
hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    cursorTrail.classList.add("hover");
  });
  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    cursorTrail.classList.remove("hover");
  });
});

// Click effect
document.addEventListener("mousedown", () => {
  cursor.classList.add("click");
  cursorTrail.classList.add("click");
});

document.addEventListener("mouseup", () => {
  cursor.classList.remove("click");
  cursorTrail.classList.remove("click");
});

// Hide cursor on mobile/touch devices
if ("ontouchstart" in window || navigator.maxTouchPoints) {
  cursor.style.display = "none";
  cursorTrail.style.display = "none";
  document.body.style.cursor = "auto";
}
// Create floating particles
function createParticles() {
  const particlesContainer = document.querySelector(".particles");

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particlesContainer.appendChild(particle);
  }
}
createParticles();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Parallax effect for sections
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".project-card");

  parallaxElements.forEach((element, index) => {
    const speed = 0.1 + index * 0.05;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards";
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card, .about-content").forEach((el) => {
  observer.observe(el);
});

// Dynamic background gradient
let gradientAngle = 0;
function updateGradient() {
  gradientAngle += 0.5;
  document.body.style.background = `linear-gradient(${gradientAngle}deg, #1a1a2e, #16213e, #0f3460, #1a1a2e)`;
  document.body.style.backgroundSize = "400% 400%";
}
setInterval(updateGradient, 100);

// Form submission with advanced animation
document.querySelector("#contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const btn = this.querySelector(".submit-btn");
  const btnText = btn.querySelector(".btn-text");

  // Loading animation
  btnText.innerHTML = "Sending...";
  btn.style.background = "linear-gradient(45deg, #ffa500, #ff6b6b)";
  btn.style.transform = "scale(0.95)";

  // Simulate sending
  setTimeout(() => {
    btnText.innerHTML = "✓ Message Sent!";
    btn.style.background = "linear-gradient(45deg, #4CAF50, #45a049)";
    btn.style.transform = "scale(1)";

    // Reset form and button
    setTimeout(() => {
      btnText.innerHTML = "Send Message";
      btn.style.background = "linear-gradient(45deg, #00d4ff, #ff6b6b)";
      this.reset();

      // Reset all form labels
      const labels = this.querySelectorAll("label");
      labels.forEach((label) => {
        label.style.top = "50%";
        label.style.fontSize = "1rem";
        label.style.color = "rgba(255, 255, 255, 0.6)";
        label.style.background = "transparent";
      });
    }, 3000);
  }, 2000);
});

// Create floating elements
function createFloatingElements() {
  const floatingContainer = document.createElement("div");
  floatingContainer.className = "floating-elements";
  document.body.appendChild(floatingContainer);

  for (let i = 0; i < 10; i++) {
    const element = document.createElement("div");
    element.className = "floating-element";
    element.style.left = Math.random() * 100 + "%";
    element.style.top = Math.random() * 100 + "%";
    element.style.animationDelay = Math.random() * 15 + "s";
    element.style.animationDuration = Math.random() * 10 + 10 + "s";
    floatingContainer.appendChild(element);
  }
}
createFloatingElements();

// Matrix effect
function createMatrixEffect() {
  const matrixBg = document.createElement("div");
  matrixBg.className = "matrix-bg";
  document.body.appendChild(matrixBg);

  const columns = Math.floor(window.innerWidth / 20);
  const chars =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  for (let i = 0; i < columns; i++) {
    const column = document.createElement("div");
    column.className = "matrix-column";
    column.style.left = i * 20 + "px";
    column.style.animationDelay = Math.random() * 10 + "s";
    column.style.animationDuration = Math.random() * 5 + 5 + "s";

    let text = "";
    for (let j = 0; j < 20; j++) {
      text += chars[Math.floor(Math.random() * chars.length)] + "<br>";
    }
    column.innerHTML = text;
    matrixBg.appendChild(column);
  }
}
createMatrixEffect();

// Enhanced scroll animations
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  // Parallax for hero section
  const hero = document.querySelector("#hero");
  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }

  // Rotate project cards on scroll
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    const speed = 0.02 + index * 0.01;
    const rotation = scrolled * speed;
    card.style.transform = `rotateY(${rotation}deg)`;
  });

  // Header background opacity
  const header = document.querySelector("header");
  const opacity = Math.min(scrolled / 100, 1);
  header.style.background = `rgba(26, 26, 46, ${0.9 * opacity})`;
});

// Add typing effect to hero title
function addTypingEffect() {
  const heroTitle = document.querySelector(".hero-content h1");
  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  heroTitle.style.width = "0";
  heroTitle.classList.add("typing-effect");

  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      heroTitle.classList.remove("typing-effect");
    }
  }, 100);
}

// 3D tilt effect for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  });
});

// Enhanced intersection observer with stagger effect
const enhancedObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animation = `fadeInUp 0.8s ease forwards`;
          entry.target.style.transform = "translateY(0)";
          entry.target.style.opacity = "1";
        }, index * 200);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".project-card, .contact-method").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(50px)";
  enhancedObserver.observe(el);
});

// Mobile menu toggle (if needed)
const mobileBreakpoint = 768;
if (window.innerWidth <= mobileBreakpoint) {
  document.querySelector(".cursor").style.display = "none";
  document.querySelector(".cursor-trail").style.display = "none";
}
