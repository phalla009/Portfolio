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
// createParticles();

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
// createFloatingElements();

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
function typingLoopEffect() {
  const heroTitle = document.querySelector(".hero-content h1");
  if (!heroTitle) return;

  const text = heroTitle.dataset.text || heroTitle.textContent;
  if (!heroTitle.dataset.text) heroTitle.dataset.text = text;
  heroTitle.textContent = "";

  let i = 0;
  let forward = true;

  function type() {
    if (forward) {
      heroTitle.textContent += text.charAt(i);
      i++;
      if (i === text.length) {
        forward = false;
        setTimeout(type, 2000); // wait 1s before deleting
      } else {
        setTimeout(type, 200); // typing speed
      }
    } else {
      heroTitle.textContent = text.substring(0, i - 1);
      i--;
      if (i === 0) {
        forward = true;
        setTimeout(type, 200); // pause before typing again
      } else {
        setTimeout(type, 100); // deleting speed
      }
    }
  }

  type();
}
typingLoopEffect();

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

// ===================== Mobile Menu =====================
const toggleBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ===================== Scroll Animations =====================
const scrollElements = document.querySelectorAll(".scroll-animate");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.2 } // trigger when 20% visible
);

scrollElements.forEach((el) => observer.observe(el));

// // Modal logic
// const modal = document.getElementById("projectModal");
// const modalTitle = document.getElementById("modalTitle");
// const modalImage = document.getElementById("modalImage");
// const modalDescription = document.getElementById("modalDescription");
// const modalFrameworks = document.getElementById("modalFrameworks");
// const modalLinks = document.getElementById("modalLinks");
// const closeBtn = document.querySelector(".modal .close");

// // Example data for projects
// const projectDetails = [
//   {
//     title: "Project One",
//     description:
//       "Create a project (E-commerce) website name KRSTORE using Python and Flask.",
//     image: "/images/project1.png", // Add your image path
//     frameworks: [
//       {
//         src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
//         alt: "Python",
//       },
//       {
//         src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
//         alt: "Flask",
//       },
//     ],
//     links: [
//       { href: "https://krstore.hphalla.lol/", text: "Demo" },
//       {
//         href: "https://github.com/phalla009/KR_Store_Ecommerce",
//         text: "Source Code",
//       },
//     ],
//   },
//   // Add other projects here with the same structure
// ];

// // Open modal on project-card click
// document.querySelectorAll(".project-card").forEach((card, index) => {
//   card.addEventListener("click", () => {
//     const project = projectDetails[index];
//     modalTitle.textContent = project.title;
//     modalDescription.textContent = project.description;
//     modalImage.src = project.image;

//     // Frameworks
//     modalFrameworks.innerHTML = "";
//     project.frameworks.forEach((fw) => {
//       const img = document.createElement("img");
//       img.src = fw.src;
//       img.alt = fw.alt;
//       img.style.width = "50px";
//       img.style.margin = "0 5px";
//       modalFrameworks.appendChild(img);
//     });

//     // Links
//     modalLinks.innerHTML = "";
//     project.links.forEach((link) => {
//       const a = document.createElement("a");
//       a.href = link.href;
//       a.textContent = link.text;
//       a.target = "_blank";
//       a.style.display = "inline-block";
//       a.style.margin = "5px";
//       a.style.color = "#00d4ff";
//       modalLinks.appendChild(a);
//     });

//     modal.style.display = "block";
//   });
// });

// // Close modal
// closeBtn.addEventListener("click", () => (modal.style.display = "none"));
// window.addEventListener("click", (e) => {
//   if (e.target == modal) modal.style.display = "none";
// });
