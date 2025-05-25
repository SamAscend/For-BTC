document.addEventListener('DOMContentLoaded', () => {
  // 1. Typing Text Effect
  function initTyping() {
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

    window.addEventListener("load", typeWriter);
  }

  // 2. Button Click Sound Effect
  function initClickSound() {
    const clickSound = new Audio('https://freesound.org/data/previews/256/256113_3263906-lq.mp3');
    const buttons = document.querySelectorAll('button, .btn, .prev, .next, #downloadBtn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
      });
    });
  }

  // 3. Smooth Scroll Navigation
  function initSmoothScroll() {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          target.classList.add('scroll-focus');
          setTimeout(() => target.classList.remove('scroll-focus'), 1000);
        }
      });
    });
  }

  // 4. Image Slider
  function initSlider() {
    const slides = document.querySelectorAll('.slider-container img');
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 4000);
  }

  // 5. Reveal Text on Scroll
  function initRevealOnScroll() {
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
  }

  // 6. Cursor Trail Effect
  function initCursorTrail() {
    const cursorTrail = document.querySelector('.cursor-trail');
    const mainWrapper = document.querySelector('.main-wrapper');
    let lastMouseMove = 0;

    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastMouseMove < 50) return;
      lastMouseMove = now;

      const rect = mainWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const dot = document.createElement('div');
        dot.classList.add('cursor-dot');
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        cursorTrail.appendChild(dot);

        setTimeout(() => {
          dot.remove();
        }, 800); // Sesuai durasi animasi
      }
    });
  }

  // 7. AOS Initialization
  function initAOS() {
    AOS.init();
  }

  // ✅ Jalankan semua init function
  initTyping();
  initClickSound();
  initSmoothScroll();
  initSlider();
  initRevealOnScroll();
  initCursorTrail();
  initAOS();
});
