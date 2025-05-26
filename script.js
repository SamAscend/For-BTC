document.addEventListener('DOMContentLoaded', () => {
  initTyping();
  initClickSound();
  initSmoothScroll();
  initSlider();
  initRevealOnScroll();
  initCursorTrail();
  initAOS();
  initAdviceForm();
  initMotivationText();
  initClockWidget();
  initScrollNotification();
  showWelcomeToast();
  initBackgroundMusic();
  autoDarkModeByTime();
});

/* ============================
   1. Typing Text Effect
============================ */
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

/* ============================
   2. Button Click Sound
============================ */
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

/* ============================
   3. Smooth Scroll
============================ */
function initSmoothScroll() {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('scroll-focus');
        setTimeout(() => target.classList.remove('scroll-focus'), 1000);
      }
    });
  });
}

/* ============================
   4. Image Slider
============================ */
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

/* ============================
   5. Reveal on Scroll
============================ */
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

/* ============================
   6. Cursor Trail Effect
============================ */
function initCursorTrail() {
  const cursorTrail = document.querySelector('.cursor-trail');
  const mainWrapper = document.querySelector('.main-wrapper');
  let lastMouseMove = 0;

  if (!cursorTrail || !mainWrapper) return;

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

      setTimeout(() => dot.remove(), 800);
    }
  });
}

/* ============================
   7. AOS Animation Init
============================ */
function initAOS() {
  AOS.init();
}

/* ============================
   8. Advice Form Handler
============================ */
function initAdviceForm() {
  const adviceForm = document.getElementById('advice-form');
  if (!adviceForm) return;

  let feedbackList = JSON.parse(localStorage.getItem('feedback')) || [];

  adviceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value || 'Anonim';
    const message = document.getElementById('message').value.trim();

    if (!message) {
      alert('Masukan atau saran tidak boleh kosong!');
      return;
    }

    const feedback = {
      name,
      message,
      time: new Date().toLocaleString()
    };
    feedbackList.push(feedback);
    localStorage.setItem('feedback', JSON.stringify(feedbackList));

    const submitBtn = adviceForm.querySelector('button');
    submitBtn.textContent = 'Terkirim!';
    submitBtn.style.backgroundColor = '#4CAF50';

    setTimeout(() => {
      submitBtn.textContent = 'Kirim';
      submitBtn.style.backgroundColor = 'var(--light-brown)';
    }, 2000);

    alert(`Terima kasih atas masukannya, ${name}!\n\n"${message}"`);
    adviceForm.reset();
    document.querySelector('.motivation')?.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ============================
   9. Motivational Typing
============================ */
function initMotivationText() {
  const motivationElem = document.querySelector('.motivation p');
  if (!motivationElem) return;

  const motivationText = `Setiap perjalanan butuh waktu. Tidak ada kesuksesan yang instan — kecuali Indomie.
Tapi hidup, butuh proses. Tetap semangat dan teruslah melangkah, meski pelan,
karena pelan-pelan pun tetap berarti maju.`;

  let i = 0;
  const speed = 40;
  motivationElem.innerHTML = '';

  function typeWriter() {
    if (i < motivationText.length) {
      motivationElem.innerHTML += motivationText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
}

/* ============================
   10. Clock Widget
============================ */
function initClockWidget() {
  const clock = document.createElement('div');
  clock.className = 'clock-widget';
  document.body.appendChild(clock);

  setInterval(() => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }, 1000);
}

/* ============================
   11. Scroll Notification
============================ */
function initScrollNotification() {
  const target = document.getElementById('download');
  let shown = false;

  if (!target) return;

  window.addEventListener('scroll', () => {
    const top = target.getBoundingClientRect().top;
    if (top < window.innerHeight / 1.5 && !shown) {
      shown = true;
      showToast('Mclaren Lo Warna Apa Bos? 🎯');
    }
  });

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}

/* ============================
   12. Welcome Toast
============================ */
function showWelcomeToast() {
  if (!sessionStorage.getItem('welcomed')) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = 'Selamat datang di For-BTC! 🚀';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    sessionStorage.setItem('welcomed', 'true');
  }
}

/* ============================
   13. Background Music
============================ */
function initBackgroundMusic() {
  let player;
  let playing = false;

  const btn = document.getElementById('music-toggle');
  if (!btn) return;

  if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('yt-player', {
      height: '0',
      width: '0',
      videoId: 'xizN47Box_Y',
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: 'xizN47Box_Y',
        mute: 0
      },
      events: {
        'onReady': onPlayerReady
      }
    });
  };

  function onPlayerReady(event) {
    btn.addEventListener('click', () => {
      if (playing) {
        player.pauseVideo();
        btn.textContent = '🎵 Music';
      } else {
        player.setVolume(100);
        player.playVideo();
        btn.textContent = '🔊 Playing';
      }
      playing = !playing;
    });
  }
}

let ytApiReady = false;
window.onYouTubeIframeAPIReady = function () {
  ytApiReady = true;
  initBackgroundMusic();
};

document.addEventListener('DOMContentLoaded', () => {
  const waitForYT = setInterval(() => {
    if (ytApiReady) {
      clearInterval(waitForYT);
    }
  }, 100);
});

/* ============================
   14. Auto Dark Mode by Time
============================ */
function autoDarkModeByTime() {
  const hour = new Date().getHours();
  const html = document.documentElement;
  if (hour >= 19 || hour <= 6) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

