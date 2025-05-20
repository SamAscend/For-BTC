document.addEventListener('DOMContentLoaded', () => {
  // 1. Typing animation di hero headline
  function typeWriter() {
    if (index <= text.length) {
      headline.textContent = text.substring(0, index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }

  // 2. Social media glow effect on hover - handled by CSS (see CSS below)
  // Tapi bisa kasih sedikit JS buat tambah kelas tambahan kalau mau, optional

  // 3. Suara klik tombol
  const clickSound = new Audio('https://freesound.org/data/previews/256/256113_3263906-lq.mp3'); // contoh suara klik (asal bebas)
  const buttons = document.querySelectorAll('button, .btn, .prev, .next, #downloadBtn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      clickSound.currentTime = 0; // reset suara supaya bisa diputar ulang cepat
      clickSound.play();
    });
  });
    AOS.init();

    // Typing effect
    const typingText = "Welcome To For-BTC";
    let i = 0;
    const typeTarget = document.getElementById("typing-text");

    function typeWriter() {
      if (i < typingText.length) {
        typeTarget.textContent = typingText.substring(0, i + 1);
        i++;
        setTimeout(typeWriter, 80);
      }
    }

    // Trigger after page load
    window.addEventListener("load", typeWriter);

    // Click sound effect
    const button = [document.getElementById("click-sound"), document.getElementById("click-sound-2")];
    const clickAudio = new Audio("click.mp3"); // ganti dengan file suara klik

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        clickAudio.play();
      });
    });
  });

  // Smooth scroll dengan animasi
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Optional animasi saat scroll ke section
      target.classList.add('scroll-focus');
      setTimeout(() => target.classList.remove('scroll-focus'), 1000);
    }
  });
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1); // hapus tanda #
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

const images = document.querySelectorAll('.slider-container img');
let currentIndex = 0;

function showSlide(index) {
  images.forEach((img, i) => {
    img.classList.remove('active');
    if (i === index) img.classList.add('active');
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  showSlide(currentIndex);
}

// Tampilkan slide pertama saat load
showSlide(currentIndex);

// Ganti slide tiap 4 detik (bisa ubah ke 5 detik kalau mau lebih pelan)
setInterval(nextSlide, 4000);

window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
});

const reveals = document.querySelectorAll('.reveal-text');
window.addEventListener('scroll', () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 100) {
      el.classList.add('show');
    }
  });
});
