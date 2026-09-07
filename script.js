document.querySelectorAll('.win-controls .win-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const win = e.currentTarget.closest('.about-me');
    if (!win) return;

    const winBody = win.querySelector('.win-body');

    if (e.currentTarget.textContent.trim() === '_') {
      if (winBody) {
        winBody.style.display = winBody.style.display === 'none' ? 'block' : 'none';
      }
    } else if (e.currentTarget.textContent.trim() === 'X') {
      win.style.display = 'none';
    }
  });
});

const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let inputSequence = [];

window.addEventListener('keydown', (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  inputSequence.push(key);
  inputSequence = inputSequence.slice(-secretCode.length);

  if (inputSequence.join(',') === secretCode.join(',')) {
    alert("SYSTEM OVERRIDE DETECTED! Hidden Developer Mode Unlocked.");
    document.body.style.filter = "invert(100%)";
  }
});

// Minimal JS Timer Logic
const targetDate = new Date("2026-09-12T16:00:00Z").getTime();

function updateTimer() {
  const diff = targetDate - new Date().getTime();

  if (diff <= 0) {
    document.querySelector(".countdown-display").textContent = "RELEASED";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById("cd-days").textContent = String(d).padStart(2, "0");
  document.getElementById("cd-hours").textContent = String(h).padStart(2, "0");
  document.getElementById("cd-mins").textContent = String(m).padStart(2, "0");
  document.getElementById("cd-secs").textContent = String(s).padStart(2, "0");
}

setInterval(updateTimer, 1000);
updateTimer();