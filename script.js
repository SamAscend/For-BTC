// FINAL LOGIN PAGE SCRIPT WITH TYPEWRITER & SLIDER

document.addEventListener("DOMContentLoaded", function () {
  const authBtn = document.getElementById("auth-btn");
  const toggleAuth = document.getElementById("toggle-auth");
  const passwordInput = document.getElementById("password");
  const typewriterElement = document.getElementById("typewriter");
  const sliderImages = document.querySelectorAll(".slider img");

  // === FIXED LOGIN FUNCTION ===
  if (authBtn) {
    authBtn.addEventListener("click", function () {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (!username || !password) {
        alert("Please enter username and password.");
        return;
      }

      if (username === "SamAralie" && password === "password123") {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "home.html";
      } else {
        alert("Invalid credentials");
      }
    });
  }

  // === TOGGLE PASSWORD VISIBILITY ON DOUBLE CLICK ===
  if (passwordInput) {
    passwordInput.addEventListener("dblclick", function () {
      passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });
  }

  // === TYPEWRITER EFFECT ===
  if (typewriterElement) {
    const text = typewriterElement.getAttribute("data-text") || "Welcome, SamAralie!";
    let index = 0;

    function typeWriter() {
      if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
      }
    }

    typewriterElement.textContent = "";
    typeWriter();
  }

  // === SIMPLE IMAGE SLIDER ===
  if (sliderImages.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
      sliderImages.forEach((img, i) => {
        img.style.display = i === index ? "block" : "none";
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % sliderImages.length;
      showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 3000); // change every 3s
  }

  // === HOME PAGE: DISPLAY LOGGED-IN USER ===
  const loggedUser = localStorage.getItem("loggedInUser");
  const userNameEl = document.getElementById("user-name");
  if (userNameEl && loggedUser) {
    userNameEl.textContent = loggedUser;
  }
});
