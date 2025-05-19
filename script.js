// === AUTH LOGIC SIMULASI (localStorage) + SLIDER & ANIMASI ===

document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;

  // === SIGNUP ===
  if (path.includes("signup.html")) {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = form.username.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value.trim();

      if (username && email && password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find((user) => user.username === username);

        if (existingUser) {
          alert("Username sudah terdaftar. Silakan login.");
        } else {
          users.push({ username, email, password });
          localStorage.setItem("users", JSON.stringify(users));
          alert("Pendaftaran berhasil!");
          window.location.href = "login.html";
        }
      } else {
        alert("Semua kolom harus diisi!");
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
        alert("Login berhasil!");
        window.location.href = "dashboard.html";
      } else {
        alert("Username atau password salah!");
      }
    });
  }

  // === DASHBOARD LOGIN VALIDATION ===
  if (path.includes("dashboard.html")) {
    const user = sessionStorage.getItem("loggedInUser");
    if (!user) {
      alert("Kamu harus login dulu!");
      window.location.href = "login.html";
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

  if (slides.length > 0) {
    showSlide(currentSlide);

    nextBtn?.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });

    prevBtn?.addEventListener("click", () => {
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

  // === DARK MODE TOGGLE ===
  const toggleBtn = document.querySelector("#theme-toggle");
  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
