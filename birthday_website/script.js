// Global variable to track music state
let isPlaying = false;

// 🎵 Main function to trigger effects
function celebrate() {
  // Fire the effects first
  confettiBurst();
  createBalloons();
  launchFireworks();
  
  // Start music automatically on celebrate click (if not playing)
  if (!isPlaying) {
    toggleMusic(); 
  }
}

// 🔊 Function to toggle music ON/OFF
function toggleMusic() {
  const music = document.getElementById("music");
  const musicBtn = document.getElementById("musicButton");

  if (music && musicBtn) {
    if (isPlaying) {
      music.pause();
      musicBtn.textContent = '🎵 Music Off';
      musicBtn.style.background = 'linear-gradient(90deg, #ff66b3, #ffb3cc)'; // Pinkish color
      isPlaying = false;
    } else {
      music.play();
      musicBtn.textContent = '🔇 Music On';
      musicBtn.style.background = 'linear-gradient(90deg, #32cd32, #6be66b)'; // Greenish color when ON
      isPlaying = true;
    }
  }
}

// 🎈 Balloons
function createBalloons() {
  for (let i = 0; i < 15; i++) {
    let balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.animationDuration = 5 + Math.random() * 3 + "s";
    balloon.style.animationDelay = Math.random() * 2 + "s"; // Staggered start
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 8000);
  }
}

// 🎆 Fireworks (Canvas)
const canvas = document.getElementById("fireworks");
if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function launchFireworks() {
      // Clear canvas periodically for new fireworks
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      for (let i = 0; i < 10; i++) { // Launch a few fireworks at once
        setTimeout(() => drawFirework(), i * 150);
      }
    }

    function drawFirework() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2; // Upper half
      const hue = Math.random() * 360;
      
      for (let i = 0; i < 50; i++) { // More particles per firework
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        const tx = x + Math.cos(angle) * speed * 10; // Spread out more
        const ty = y + Math.sin(angle) * speed * 10;
        
        ctx.beginPath();
        ctx.arc(tx, ty, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue}, 100%, 70%)`;
        ctx.fill();
      }
      // Fade out effect for fireworks
      ctx.globalAlpha = 0.8;
      setTimeout(() => ctx.globalAlpha = 1, 100);
    }
}


// 🎊 Confetti Burst with smooth animation
function confettiBurst() {
  // Add CSS for falling animation if not already present
  let style = document.getElementById('confetti-style');
  if (!style) {
      style = document.createElement('style');
      style.id = 'confetti-style';
      style.innerHTML = `
        @keyframes fall { 
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; } 
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } 
        }
      `;
      document.head.appendChild(style);
  }

  for (let i = 0; i < 70; i++) { // More confetti particles
    const confetti = document.createElement("div");
    confetti.classList.add("confetti"); // Use the CSS class
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background = `hsl(${Math.random() * 360},100%,70%)`; // Random color
    confetti.style.opacity = Math.random() * 0.8 + 0.2; // Random opacity
    confetti.style.animationDuration = `${3 + Math.random() * 2}s`; // Random duration
    confetti.style.animationDelay = `${Math.random() * 1}s`; // Staggered start
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}


// 🖼️ Slideshow for 3 images
const images = ["pic1.jpg", "pic2.jpg", "pic3.jpg"]; 
let index = 0;
const slide = document.getElementById("slideshow");

if (slide) { 
  setInterval(() => {
    slide.style.opacity = 0; // Fade out
    setTimeout(() => {
      index = (index + 1) % images.length;
      slide.src = images[index];
      slide.style.opacity = 1; // Fade in
    }, 1000); // Wait 1 second for fade out
  }, 4000); // Change image every 4 seconds (1s fade out + 3s display)
}

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

