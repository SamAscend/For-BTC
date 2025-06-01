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
  autoDarkModeByTime();
  setupFadeIn();
  setupSmoothScroll();
  setupCardHover();
  simulateBTCPrice();
  initBTCChart();         // 👈 Tambahin ini
  initRandomQuote();      // 👈 Dan ini juga
});


// Typing animation for intro section
window.addEventListener("load", () => {
  typeQuote();
});

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

  typeWriter();
}

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

function initAOS() {
  AOS.init();
}

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

function initClockWidget() {
  const clock = document.createElement('div');
  clock.className = 'clock-widget';
  document.body.appendChild(clock);

  setInterval(() => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }, 1000);
}

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

function initBackgroundMusic() {
  let player;
  let playing = false;

  const btn = document.getElementById('music-toggle');
  if (!btn) return;

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
        'onReady': function () {
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
    });
  };

  if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  } else {
    window.onYouTubeIframeAPIReady();
  }
}

initBackgroundMusic(); // run it

function autoDarkModeByTime() {
  const hour = new Date().getHours();
  const html = document.documentElement;
  if (hour >= 19 || hour <= 6) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

function typeQuote() {
  const typingText = "Dua mahasiswa. Satu ketertarikan. Bitcoin sebagai petualangan pertama.";
  let typingIndex = 0;
  const typingSpeed = 60;
  const typingElement = document.getElementById("typing-effect");

  function typeWriter() {
    if (typingIndex < typingText.length) {
      typingElement.innerHTML += typingText.charAt(typingIndex);
      typingIndex++;
      setTimeout(typeWriter, typingSpeed);
    }
  }

  if (typingElement) typeWriter();
}

function setupFadeIn() {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(el => observer.observe(el));
}

function setupSmoothScroll() {
  const links = document.querySelectorAll("nav a[href^='#']");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function setupCardHover() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => card.classList.add("hovered"));
    card.addEventListener("mouseleave", () => card.classList.remove("hovered"));
  });
}

function simulateBTCPrice() {
  const priceBox = document.getElementById("btc-price");
  if (!priceBox) return;

  let fakePrice = 68300;
  setInterval(() => {
    const fluctuation = (Math.random() - 0.5) * 50;
    fakePrice += fluctuation;
    priceBox.innerText = `BTC Sim: $${fakePrice.toFixed(2)}`;
  }, 2000);
}

// Modal Bitcoin Fun Fact
document.addEventListener('DOMContentLoaded', function () {
  const showFactBtn = document.getElementById('showFactBtn');
  if (!showFactBtn) return;

  const modal = document.createElement('div');
  const overlay = document.createElement('div');

  modal.id = 'btcModal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Fakta Menarik Tentang Bitcoin</h2>
      <p>Bitcoin diciptakan oleh seseorang atau sekelompok orang dengan nama samaran Satoshi Nakamoto pada tahun 2009.</p>
    </div>
  `;

  overlay.id = 'btcOverlay';
  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.close');

  showFactBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });

  overlay.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });
});

// Filter Portfolio
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const filter = this.getAttribute('data-filter');
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'block' : 'none';
    });
  });
});

function filterSelection(category) {
  let items = document.getElementsByClassName("portfolio-item");
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = category === "all" || items[i].classList.contains(category) ? "block" : "none";
  }

  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}

window.onload = function () {
  filterSelection('all');
};

function initBTCChart() {
  const ctx = document.getElementById('btcChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'BTC Portfolio (%)',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });
}

function initRandomQuote() {
  const quotes = [
    "Jangan lari dari pasar, pelajari polanya.",
    "Volatilitas adalah sahabat investor sejati.",
    "BTC turun? Waktu yang tepat buat riset, bukan panik.",
    "Bitcoin diciptakan bukan untuk yang lemah hati.",
    "Market merah itu diskon buat yang cerdas."
  ];

  const display = document.getElementById('quoteDisplay');
  const btn = document.getElementById('newQuoteBtn');

  if (!btn || !display) return;

  btn.addEventListener('click', () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    display.textContent = `"${randomQuote}"`;
  });
}
