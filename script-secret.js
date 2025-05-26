let currentIndex = 0;

function showSlide(index) {
  const slides = document.querySelector('.slides');
  const totalSlides = document.querySelectorAll('.slides img').length;

  // Cek dan update indeks
  if (index >= totalSlides) currentIndex = 0;
  else if (index < 0) currentIndex = totalSlides - 1;
  else currentIndex = index;

  // Geser ke slide berikutnya
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Jalankan otomatis setiap 3 detik
setInterval(() => {
  showSlide(currentIndex + 1);
}, 3000);

// Text typing animation
const text = "Tetap semangat, karena kamu lebih kuat dari yang kamu kira.";
let i = 0;

function typeText() {
  if (i < text.length) {
    document.getElementById("typed-motivation").textContent += text.charAt(i);
    i++;
    setTimeout(typeText, 50);
  }
}

window.addEventListener("load", () => {
  typeText();
});

// Back to top button
const backToTop = document.getElementById("backToTop");

window.onscroll = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
