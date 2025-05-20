document.addEventListener('DOMContentLoaded', () => {
  // 1. Typing animation di hero headline
  const headline = document.querySelector('.headline');
  const text = "Welcome to Our Website!";
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      headline.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }
  headline.textContent = ''; // Reset dulu
  typeWriter();

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
    const typingText = "Selamat Datang di NamaBrand";
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
