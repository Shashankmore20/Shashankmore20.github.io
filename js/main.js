// Main JavaScript - ES6 Module
// Features: Typing Animation, Dark/Light Mode, Scroll Animations

/* global bootstrap */

// Typing Animation
const typingElement = document.getElementById("typing-text");
const roles = [
  "Full-Stack Developer",
  "Problem Solver",
  "Coffee Enthusiast ☕",
  "React Developer",
  "Lifelong Learner",
  "Tennis Player 🎾",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500;
  }

  setTimeout(typeText, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  if (typingElement) {
    setTimeout(typeText, 1000);
  }
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

function getPreferredTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeIcon) {
      themeIcon.classList.remove("bi-moon-fill");
      themeIcon.classList.add("bi-sun-fill");
    }
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (themeIcon) {
      themeIcon.classList.remove("bi-sun-fill");
      themeIcon.classList.add("bi-moon-fill");
    }
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  const preferredTheme = getPreferredTheme();
  applyTheme(preferredTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
});

if (window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      applyTheme(e.matches ? "dark" : "light");
    });
}

// Scroll-Triggered Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".scroll-animate");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

document.addEventListener("DOMContentLoaded", initScrollAnimations);

// Smooth Scroll for Navigation Links
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const navbarHeight = document.querySelector(".navbar").offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
              bsCollapse.hide();
            }
          }
        }
      }
    });
  });
});

// Navbar Background on Scroll
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
    }
  });
});

// Active Navigation Link Highlight
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");

  function updateActiveLink() {
    let current = "";
    const navbarHeight = document.querySelector(".navbar").offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = section.getAttribute("id");
      }
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    if (current) {
      const activeLink = document.querySelector(
        `.nav-link[href="#${current}"]`,
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", updateActiveLink);

  updateActiveLink();
});

export { typeText, toggleTheme, initScrollAnimations };
