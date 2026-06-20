const botToken = "8347289983:AAEj6d664dpnYUuG1sfsVfXNlYayJU-rs7U";
const chatId = "-1003811778242"; // <--- សូមប្តូរដាក់ Group ID របស់អ្នកនៅទីនេះ

function showNotification(message, type) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.innerHTML = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  }
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".submit-btn");
    const btnText = this.querySelector(".btn-text");

    // ចាប់យកទិន្នន័យតាមរយៈ FormData (ងាយស្រួលសម្រាប់ Form ច្រើន Input)
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // ប្តូរស្ថានភាពប៊ូតុង
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = "Sending to Group...";

    // រៀបចំសារសម្រាប់ Group
    const text = `
✨ *NEW CONTACT INQUIRY* ✨
━━━━━━━━━━━━━━━━━━
👤 *From:* ${name}
📧 *Email:* ${email}
📂 *Subject:* ${subject}

📝 *Message:*
"${message}"

━━━━━━━━━━━━━━━━━━
📅 ${new Date().toLocaleString()}
    `;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          showNotification(
            "<strong>Success!</strong><br>Your message has been sent to the group. ✨",
            "success",
          );
          contactForm.reset();
        } else {
          showNotification("Error: " + data.description, "error");
        }
      })
      .catch((err) => {
        showNotification(
          "Failed to connect. Please check internet. ⚠️",
          "error",
        );
      })
      .finally(() => {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = "Send Message";
      });
  });
}

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
  document.body.style.background = `linear-gradient(${gradientAngle}deg, #171717ff, #080909ff, #1b1e1eff, #101013f1)`;
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
  { threshold: 0.1 },
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

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("active") &&
    !navLinks.contains(e.target) &&
    !toggleBtn.contains(e.target)
  ) {
    navLinks.classList.remove("active");
  }
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
  { threshold: 0.2 }, // trigger when 20% visible
);

scrollElements.forEach((el) => observer.observe(el));

// ===================== NEW POPUP LOGIC (Added) =====================
document.addEventListener("DOMContentLoaded", () => {
  const popupOverlay = document.getElementById("project-popup");
  const closeBtn = document.querySelector(".close-popup");
  const popupImg = document.getElementById("popup-img");
  const popupTitle = document.getElementById("popup-title");
  const popupDesc = document.getElementById("popup-desc");
  const popupTech = document.getElementById("popup-tech");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const viewButtons = document.querySelectorAll(".view-project-btn");

  let currentImages = [];
  let currentIndex = 0;

  // Open Popup
  viewButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // Get Data
      const title = btn.getAttribute("data-title");
      const desc = btn.getAttribute("data-desc");
      const tech = btn.getAttribute("data-tech");
      const imagesRaw = btn.getAttribute("data-images");

      // Parse Images
      currentImages = imagesRaw
        ? imagesRaw.split(",").map((img) => img.trim())
        : [];
      currentIndex = 0;

      // Set Content
      popupTitle.textContent = title;
      popupDesc.textContent = desc;
      popupTech.textContent = `Tech Stack: ${tech}`;

      if (currentImages.length > 0) {
        popupImg.src = currentImages[0];
        popupImg.style.display = "block";
      } else {
        popupImg.style.display = "none";
      }

      // Toggle Buttons
      if (currentImages.length > 1) {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      } else {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      }

      // Show Popup
      popupOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Stop background scrolling
    });
  });

  // Close Popup
  const closePopup = () => {
    popupOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  closeBtn.addEventListener("click", closePopup);
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) closePopup();
  });

  // Image Navigation
  const updateImage = () => {
    popupImg.src = currentImages[currentIndex];
  };

  prevBtn.addEventListener("click", () => {
    currentIndex =
      currentIndex === 0 ? currentImages.length - 1 : currentIndex - 1;
    updateImage();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex =
      currentIndex === currentImages.length - 1 ? 0 : currentIndex + 1;
    updateImage();
  });
});

// ===================== API Copy Link Logic =====================
function copyLink(inputId) {
  const input = document.getElementById(inputId);
  input.select();
  input.setSelectionRange(0, 99999);

  navigator.clipboard
    .writeText(input.value)
    .then(() => {
      const msg = document.getElementById("copyMessage");
      msg.style.display = "block";
      msg.innerText = "Link Copied!";
      setTimeout(() => (msg.style.display = "none"), 2000);
    })
    .catch(() => alert("Failed to copy link."));
}

//disble inspact
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  // alert("Right-click is disabled on this page!");
});

// Disable certain keys (F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J, Ctrl+U)
document.addEventListener("keydown", function (e) {
  if (
    e.key === "F12" || // F12
    (e.ctrlKey &&
      e.shiftKey &&
      (e.key === "I" || e.key === "C" || e.key === "J")) || // Ctrl+Shift+I/C/J
    (e.ctrlKey && e.key === "U") // Ctrl+U
  ) {
    e.preventDefault();
    alert("Inspecting is disabled!");
  }
});

// ===================== Dynamic View Counter (Firebase - Count Once Per Session) =====================
const DB_URL =
  "https://phalla-1ca4d-default-rtdb.asia-southeast1.firebasedatabase.app";

async function updateViewCount() {
  const el = document.getElementById("viewCount");
  if (!el) return;
  try {
    const alreadyCounted = sessionStorage.getItem("viewCounted");

    if (!alreadyCounted) {
      // ✅ First visit — increment
      const res = await fetch(`${DB_URL}/views.json?t=${Date.now()}`);
      const data = await res.json();
      const current = typeof data === "number" ? data : 0;
      const newCount = current + 1;

      await fetch(`${DB_URL}/views.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCount),
      });

      el.textContent = newCount.toLocaleString();

      // ✅ Mark as counted for this session
      sessionStorage.setItem("viewCounted", "true");
    } else {
      // ✅ Already counted — just display current value
      const res = await fetch(`${DB_URL}/views.json?t=${Date.now()}`);
      const data = await res.json();
      el.textContent = typeof data === "number" ? data.toLocaleString() : "—";
    }
  } catch (err) {
    console.error("Firebase error:", err);
    el.textContent = "—";
  }
}

updateViewCount();
// // ===================== Back to Top Button =====================
// const backToTopBtn = document.getElementById("backToTop");

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 400) {
//     backToTopBtn.classList.add("show");
//   } else {
//     backToTopBtn.classList.remove("show");
//   }
// });

// backToTopBtn.addEventListener("click", () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// });
// ===================== Back to Top + Telegram Float =====================
const backToTopBtn = document.getElementById("backToTop");
const telegramFloat = document.getElementById("telegramFloat");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
    telegramFloat.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
    telegramFloat.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===================== API Docs: typing animation + Prism highlighting =====================
const jsCode = `fetch('https://krstoreapi.phalla.lol/api/products/kr')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;

const pyCode = `import requests
response = requests.get("https://krstoreapi.phalla.lol/api/products/kr")
if response.status_code == 200:
    data = response.json()
    print(data)`;

const jsonDataSample = [
  {
    category_name: "friends",
    create_at: "2025-12-27",
    description: "Adriana Bouquet ",
    id: 1,
    image: "images/c317ae589ec34373958cf3bf3311f54f_Adriana_Bouquet.jpg",
    price: 34.0,
    product_name: "ADRIANA BOUQUET",
    stock: 12,
  },
  {
    category_name: "friends",
    create_at: "2025-12-27",
    description: "Alexandra Bouquet",
    id: 2,
    image: "images/09fe024ad0fe405b94f172f03cc0cc29_Alexandra_Bouquet.jpg",
    price: 35.0,
    product_name: "ALEXANDRA BOUQUET",
    stock: 12,
  },
];
const jsonCode = JSON.stringify(jsonDataSample, null, 2);

function typeRaw(elId, cursorId, source, speed, onDone) {
  const el = document.getElementById(elId);
  const cursor = document.getElementById(cursorId);
  if (!el || !cursor) {
    if (onDone) onDone();
    return;
  }
  cursor.classList.add("blink");
  let i = 0;
  function step() {
    if (i <= source.length) {
      el.textContent = source.slice(0, i);
      i++;
      setTimeout(step, speed);
    } else {
      cursor.classList.remove("blink");
      cursor.classList.add("done");
      if (window.Prism) Prism.highlightElement(el);
      if (onDone) setTimeout(onDone, 300);
    }
  }
  step();
}

function runApiDocsAnimation() {
  typeRaw("code-js", "cursor-js", jsCode, 14, function () {
    typeRaw("code-py", "cursor-py", pyCode, 14, function () {
      typeRaw("code-json", "cursor-json", jsonCode, 8);
    });
  });
}

const apiDocsSection = document.getElementById("api-docs");
if (apiDocsSection) {
  let apiDocsHasRun = false;
  const apiDocsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !apiDocsHasRun) {
          apiDocsHasRun = true;
          runApiDocsAnimation();
          apiDocsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  apiDocsObserver.observe(apiDocsSection);
}

(function () {
  const section = document.getElementById("aboutSection");

  const para1 = document.getElementById("typewriterPara1");
  const para2 = document.getElementById("typewriterPara2");

  // Paragraph 1 text, split around the bold name
  const p1Before = "My name is ";
  const p1Bold = "HEANG PHALLA";
  const p1After =
    ", a 21-year-old graduate in Management Information Systems from SETEC Institute. Originally from Prey Veng, I am currently based in Chamkarmon, Phnom Penh.";

  // Paragraph 2 text (no bold)
  const p2Text =
    "I am a Full-Stack Developer with a strong focus on building robust, scalable backend systems and modern, user-centric web applications. I specialize in bridging the gap between business management and technical implementation to deliver efficient, real-world digital solutions.";

  let timeouts = [];
  let isRunning = false;

  function clearAllTimeouts() {
    timeouts.forEach(clearTimeout);
    timeouts = [];
  }

  function typeInto(paraEl, combinedHTML, onDone) {
    const span = paraEl.querySelector(".typewriter-content");
    span.innerHTML = "";
    paraEl.classList.add("typing");

    let displayed = "";
    let rawIndex = 0;

    function step() {
      if (rawIndex >= combinedHTML.length) {
        paraEl.classList.remove("typing");
        onDone();
        return;
      }

      if (combinedHTML.slice(rawIndex).startsWith("{{BOLD_START}}")) {
        displayed += "<strong>";
        rawIndex += "{{BOLD_START}}".length;
        span.innerHTML = displayed;
        timeouts.push(setTimeout(step, 0));
        return;
      }
      if (combinedHTML.slice(rawIndex).startsWith("{{BOLD_END}}")) {
        displayed += "</strong>";
        rawIndex += "{{BOLD_END}}".length;
        span.innerHTML = displayed;
        timeouts.push(setTimeout(step, 0));
        return;
      }

      displayed += combinedHTML[rawIndex];
      span.innerHTML = displayed;
      rawIndex++;

      const speed = 18 + Math.random() * 22;
      timeouts.push(setTimeout(step, speed));
    }

    step();
  }

  function resetParas() {
    clearAllTimeouts();
    isRunning = false;
    [para1, para2].forEach((p) => {
      p.classList.remove("typing");
      p.querySelector(".typewriter-content").innerHTML = "";
    });
  }

  function runSequence() {
    if (isRunning) return;
    isRunning = true;

    const combined1 =
      p1Before + "{{BOLD_START}}" + p1Bold + "{{BOLD_END}}" + p1After;

    typeInto(para1, combined1, () => {
      // small pause before second paragraph starts
      timeouts.push(
        setTimeout(() => {
          typeInto(para2, p2Text, () => {
            isRunning = false;
          });
        }, 300),
      );
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetParas();
          runSequence();
        } else {
          resetParas();
        }
      });
    },
    { threshold: 0.3 },
  );

  observer.observe(section);
})();
