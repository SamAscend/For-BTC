document.addEventListener("DOMContentLoaded", function () {
  AOS.init(); // scroll animation

  // Smooth scroll to section
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // (Opsional) Animated text, filter, modal, dll bisa ditambah di sini
});
