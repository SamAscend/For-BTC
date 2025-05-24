document.addEventListener('DOMContentLoaded', () => {

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
  
    // 2. Suara klik tombol
    const clickSound = new Audio('https://freesound.org/data/previews/256/256113_3263906-lq.mp3');
    const buttons = document.querySelectorAll('button, .btn, .prev, .next, #downloadBtn');
  
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
      });
    });
  
    AOS.init();
  
    
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
  
          target.classList.add('scroll-focus');
          setTimeout(() => target.classList.remove('scroll-focus'), 1000);
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
  
    showSlide(currentIndex);
    setInterval(nextSlide, 4000);
  
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
  
    // Cursor Trail Effect
    const cursorTrail = document.querySelector('.cursor-trail');
    let lastMouseMove = 0;
  
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      // Batasi pembuatan dot agar tidak terlalu sering (misalnya, setiap 50ms)
      if (now - lastMouseMove < 50) return;
      lastMouseMove = now;
  
      // Ambil posisi kursor relatif terhadap main-wrapper
      const mainWrapper = document.querySelector('.main-wrapper');
      const rect = mainWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      // Pastikan kursor berada di dalam main-wrapper
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const dot = document.createElement('div');
        dot.classList.add('cursor-dot');
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        cursorTrail.appendChild(dot);
  
        // Hapus dot setelah animasi selesai
        setTimeout(() => {
          dot.remove();
        }, 800); // Sesuaikan dengan durasi animasi fadeOut
      }
    });
  });
  
  // Menghapus duplikasi event listener untuk smooth scroll
  // ... existing code ...

 