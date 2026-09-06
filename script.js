

document.querySelectorAll('.win-controls .win-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const winbody = e.target.closest('.about-me').querySelector('.win-body');
        if (e.target.innerText === '_') {
            winbody.style.display = winbody.style.display === 'none' ? 'block' : 'none';
        } else if (e.target.innerText === 'X') {
            e.target.closest('.about-me').style.display = 'none';
        }
    });
});

const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let inputSequence = [];

window.addEventListener('keydown', (e) => {
  inputSequence.push(e.key);
  inputSequence = inputSequence.slice(-secretCode.length);
  
  if (JSON.stringify(inputSequence) === JSON.stringify(secretCode)) {
    alert("SYSTEM OVERRIDE DETECTED! Hidden Developer Mode Unlocked.");
    document.body.style.filter = "invert(100%)";
  }
});