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