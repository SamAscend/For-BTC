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
