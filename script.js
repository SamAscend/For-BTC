// === AUTH LOGIC SIMULASI (localStorage) + SLIDER & ANIMASI ===

document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;

  // Helper function untuk alert + redirect
  function notify(message, redirectUrl = null) {
    alert(message);
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }

  // Validasi email simple
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // === SIGNUP ===
  if (path.includes("signup.html")) {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = form.username.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value.trim();

      if (!username || !email || !password) {
        notify("Semua kolom harus diisi!");
        return;
      }

      if (!isValidEmail(email)) {
        notify("Email tidak valid!");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find((user) => user.username === username);

      if (existingUser) {
        notify("Username sudah terdaftar. Silakan login.");
      } else {
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        notify("Pendaftaran berhasil!", "login.html");
      }
    });
  }

  // === LOGIN ===
  if (path.includes("login.html")) {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = form.username.value.trim();
      const password = form.password.value.trim();

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        sessionStorage.setItem("loggedInUser", username);
        notify("Login berhasil!", "dashboard.html");
      } else {
        notify("Username atau password salah!");
      }
    });
  }

  // === DASHBOARD LOGIN VALIDATION ===
  if (path.includes("dashboard.html")) {
    const user = sessionStorage.getItem("loggedInUser");
    if (!user) {
      notify("Kamu harus login dulu!", "login.html");
    }
  }

  // === SLIDER FUNCTION ===
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  if (slides.length > 0 && nextBtn && prevBtn) {
    showSlide(currentSlide);

    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });

    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  // === SCROLL ANIMATION ===
  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => observer.observe(el));

  // === DARK MODE TOGGLE WITH LOCALSTORAGE ===
  const toggleBtn = document.querySelector("#theme-toggle");

  // Load dark mode preference
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });
});
