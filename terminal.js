(function () {
  // --- Safe DOM Selection ---
  const outputEl = document.getElementById('term-output');
  const inputEl = document.getElementById('term-input');
  const terminal = document.getElementById('terminal');
  const promptLabel = document.getElementById('prompt-label');
  const winElement = document.getElementById('terminal-window') || terminal;
  const headerElement = document.getElementById('terminal-header');

  if (!outputEl || !inputEl || !terminal) return;

  // --- Configuration ---
  const CORRUPTION_KEY = 'site_corrupted_until';
  const CORRUPTION_DURATION_MS = 1000 * 60 * 60 * 1000; // 1,000 hours in milliseconds

  // --- State Variables ---
  let buffer = '';
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('term_history') || '[]');
  } catch (e) {
    history = [];
  }
  let historyIndex = history.length;
  let isBooting = true;
  let isProcessing = false;
  let soundOn = true;
  let isPasswordMode = false;
  let gameState = null;

  // --- Virtual File System (VFS) ---
  const vfs = {
    'C:': {
      type: 'dir',
      children: {
        'about.txt': {
          type: 'file',
          content: 'LIHAN // ROBOTICS ENGINEER & CODER\nLocation : New Zealand test site\nOrigin   : South Africa\nMission  : Constructing physical-digital bridges through autonomous hardware.'
        },
        'skills.txt': {
          type: 'file',
          content: 'ACTIVE SUBROUTINES:\n- Kinematic Design          - Circuit Logic\n- CAD Architecture          - Integrated Systems\n- Embedded Control          - Additive Fabrication'
        },
        'config.sys': { type: 'file', content: 'FILES=40\nBUFFERS=30\nDEVICE=C:\\DOS\\HIMEM.SYS' },
        'projects': {
          type: 'dir',
          children: {
            'ftc_robot.stl': { type: 'file', content: '[3D MESH DATA BINARY]' },
            'notes.txt': { type: 'file', content: 'FIRST Tech Challenge subassembly notes.' }
          }
        },
        'cad_models': {
          type: 'dir',
          children: {
            'chassis_v2.stl': { type: 'file', content: '[3D MESH DATA BINARY]' },
            'arm_bracket.stl': { type: 'file', content: '[3D MESH DATA BINARY]' }
          }
        }
      }
    }
  };

  let currentPath = ['C:'];

  // --- Web Audio Synthesizer ---
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && AudioCtx) {
      try {
        audioCtx = new AudioCtx();
      } catch (e) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  }

  function playKeyClick() {
    if (!soundOn || !audioCtx || audioCtx.state !== 'running') return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200 + Math.random() * 300, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.02);
    } catch (e) {}
  }

  function playBeep() {
    if (!soundOn || !audioCtx || audioCtx.state !== 'running') return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
  }

  function playGlitchAudio() {
    if (!soundOn || !audioCtx || audioCtx.state !== 'running') return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 2.0);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.0);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 2.0);
    } catch (e) {}
  }

  // --- Persistent Corruption Engine ---
  function corruptWebsite(isNewTrigger = true) {
    if (isNewTrigger) {
      const expirationTime = Date.now() + CORRUPTION_DURATION_MS;
      try {
        localStorage.setItem(CORRUPTION_KEY, expirationTime.toString());
      } catch (e) {}
      playGlitchAudio();
    }

    document.body.classList.add('corrupted-site');

    const scramble = () => {
      const elements = document.querySelectorAll('p, h1, h2, h3, h4, span, a, div, button, li, td, th');
      elements.forEach(el => {
        if (el.children.length === 0 && el.innerText && el.innerText.trim().length > 0) {
          el.innerText = el.innerText
            .split('')
            .map(() => String.fromCharCode(33 + Math.floor(Math.random() * 60)))
            .join('');
        }
      });
    };

    scramble();
    setInterval(scramble, 2000);
  }

  function checkCorruptionState() {
    try {
      const corruptedUntil = localStorage.getItem(CORRUPTION_KEY);
      if (corruptedUntil) {
        const expiration = parseInt(corruptedUntil, 10);
        if (Date.now() < expiration) {
          corruptWebsite(false);
        } else {
          localStorage.removeItem(CORRUPTION_KEY);
        }
      }
    } catch (e) {}
  }

  // --- VFS Helpers ---
  function getDirectoryNode(pathArray) {
    let curr = vfs;
    for (let i = 0; i < pathArray.length; i++) {
      const seg = pathArray[i];
      if (i === 0 && curr[seg]) {
        curr = curr[seg];
      } else if (curr && curr.children && curr.children[seg]) {
        curr = curr.children[seg];
      } else {
        return null;
      }
    }
    return curr;
  }

  function getPathString() {
    if (currentPath.length === 1) return currentPath[0] + '\\';
    return currentPath[0] + '\\' + currentPath.slice(1).join('\\');
  }

  // --- Command Dictionary ---
  const commands = {
    help: {
      desc: 'List all available commands',
      exec: () => {
        print('AVAILABLE COMMANDS:');
        Object.keys(commands).sort().forEach(cmd => {
          print('  ' + cmd.padEnd(12) + commands[cmd].desc);
        });
      }
    },
    ls: {
      desc: 'List directory contents',
      exec: () => {
        const node = getDirectoryNode(currentPath);
        if (!node || node.type !== 'dir') return;
        print(`Directory of ${getPathString()}\n`);
        Object.keys(node.children).forEach(name => {
          const item = node.children[name];
          const tag = item.type === 'dir' ? '<DIR> '.padEnd(10) : '      '.padEnd(10);
          print(`  ${tag} ${name}`);
        });
      }
    },
    dir: { desc: 'Alias for ls', exec: () => commands.ls.exec() },
    cd: {
      desc: 'Change directory (cd <dir> or cd ..)',
      exec: (args) => {
        const target = args[0];
        if (!target || target === '.') return;
        if (target === '..') {
          if (currentPath.length > 1) currentPath.pop();
          return;
        }
        if (target === '\\' || target === '/') {
          currentPath = ['C:'];
          return;
        }

        const node = getDirectoryNode(currentPath);
        if (node && node.children && node.children[target]) {
          if (node.children[target].type === 'dir') {
            currentPath.push(target);
          } else {
            print(`cd: ${target}: Not a directory`, 'error');
          }
        } else {
          print(`cd: ${target}: Directory not found`, 'error');
        }
      }
    },
    cat: {
      desc: 'Read file content',
      exec: (args) => {
        if (!args[0]) return print('Usage: cat <filename>', 'error');
        const node = getDirectoryNode(currentPath);
        const file = node?.children?.[args[0]];
        if (file) {
          if (file.type === 'dir') print(`cat: ${args[0]}: Is a directory`, 'error');
          else print(file.content);
        } else {
          print(`cat: ${args[0]}: File not found`, 'error');
        }
      }
    },
    slice: {
      desc: 'Process 3D print model file',
      exec: (args) => {
        const filename = args[0] || 'chassis_v2.stl';
        isProcessing = true;
        print(`[3D-SLICE v2.4] Slicing model ${filename}...`, 'info');
        let step = 0;
        const total = 12;
        const line = document.createElement('div');
        outputEl.appendChild(line);

        const interval = setInterval(() => {
          step++;
          const pct = Math.floor((step / total) * 100);
          const bar = '='.repeat(step) + '-'.repeat(total - step);
          line.textContent = `Processing: [${bar}] ${pct}%`;
          scrollBottom();

          if (step >= total) {
            clearInterval(interval);
            isProcessing = false;
            print('\n[OK] SLICING COMPLETE', 'accent');
            print('  Estimated Print Time : 2h 14m');
            print('  Filament Usage       : 48.2g (PETG)\n');
            renderPrompt();
          }
        }, 100);
      }
    },
    guess: {
      desc: 'Play number game (5 attempts max)',
      exec: () => {
        gameState = { 
          type: 'guess', 
          target: Math.floor(Math.random() * 100) + 1, 
          attempts: 0, 
          maxAttempts: 5 
        };
        print('=== NUMBER GUESSING GAME ===', 'accent');
        print('I picked a number between 1 and 100.');
        print('WARNING: 5 failed attempts will lock system into 1000-HOUR CORRUPTION.\n', 'warning');
      }
    },
    weather: {
      desc: 'Display weather at testing site',
      exec: () => {
        print('FETCHING METEOROLOGY DATA [Napier, NZ] ...\n', 'info');
        print('  \\  /       Condition : Sunny / Mild');
        print('  _\\/_       Temp      : 18C');
        print('   /\\        Humidity  : 62%\n');
      }
    },
    theme: {
      desc: 'Toggle CRT colors (green/amber/cyan)',
      exec: () => {
        if (!winElement) return;
        const themes = ['theme-green', 'theme-amber', 'theme-cyan'];
        const current = themes.find(t => winElement.classList.contains(t)) || 'theme-green';
        const next = themes[(themes.indexOf(current) + 1) % themes.length];
        winElement.classList.remove(...themes);
        winElement.classList.add(next);
        print(`Switched CRT profile to [${next.replace('theme-', '').toUpperCase()}]`);
      }
    },
    audio: {
      desc: 'Toggle terminal sound effects',
      exec: () => {
        soundOn = !soundOn;
        print(`Audio feedback: [${soundOn ? 'ENABLED' : 'DISABLED'}]`);
      }
    },
    history: {
      desc: 'Show persistent command log',
      exec: () => history.forEach((c, i) => print(` ${i + 1}  ${c}`))
    },
    matrix: {
      desc: 'Activate matrix code stream',
      exec: () => matrixRain()
    },
    sudo: {
      desc: 'Execute with administrative privileges',
      exec: () => {
        isPasswordMode = true;
        print('[sudo] password for lihan: ', 'warning');
      }
    },
    about: { desc: 'Display user info', exec: () => commands.cat.exec(['about.txt']) },
    skills: { desc: 'Display skillsets', exec: () => commands.cat.exec(['skills.txt']) },
    clear: { desc: 'Clear output screen', exec: () => { outputEl.innerHTML = ''; } }
  };

  // --- Output Display Engine ---
  function print(text, className = '') {
    const line = document.createElement('div');
    line.className = `term-line ${className}`.trim();
    line.innerHTML = text;
    outputEl.appendChild(line);
    scrollBottom();
  }

  function scrollBottom() {
    terminal.scrollTop = terminal.scrollHeight;
  }

  function renderPrompt() {
    if (promptLabel) {
      promptLabel.textContent = isPasswordMode ? 'Password:' : `${getPathString()}>`;
    }
    if (inputEl) {
      inputEl.textContent = isPasswordMode ? '*'.repeat(buffer.length) : buffer;
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[m]));
  }

  // --- Input Handlers ---
  function handleGameInput(input) {
    if (input.toLowerCase() === 'quit') {
      print('Game session aborted.\n');
      gameState = null;
      return;
    }

    const num = parseInt(input, 10);
    if (isNaN(num)) {
      print('Enter a valid number or "quit".', 'error');
      return;
    }

    gameState.attempts++;
    const remaining = gameState.maxAttempts - gameState.attempts;

    if (num === gameState.target) {
      print(`\nCORRECT! Target hit in ${gameState.attempts} attempts!`, 'accent');
      gameState = null;
    } else if (gameState.attempts >= gameState.maxAttempts) {
      print(`\n[CRITICAL FAILURE] The target was ${gameState.target}.`, 'error');
      print('FATAL ERROR: PERSISTENT 1000-HOUR CORRUPTION INITIATED.', 'error');
      corruptWebsite(true);
      gameState = null;
    } else if (num < gameState.target) {
      print(`[+] Higher than ${num}... [${remaining} attempt(s) left]`, 'warning');
    } else {
      print(`[-] Lower than ${num}... [${remaining} attempt(s) left]`, 'warning');
    }
  }

  function runCommand(cmdString) {
    const trimmed = cmdString.trim();

    if (isPasswordMode) {
      isPasswordMode = false;
      print('');
      print('Access Denied: Permission level INTERN.', 'error');
      print('');
      return;
    }

    if (gameState) {
      print(`> ${escapeHtml(trimmed)}`);
      handleGameInput(trimmed);
      return;
    }

    const pathPrompt = getPathString();
    if (!trimmed) {
      print(`${pathPrompt}> `);
      return;
    }

    print(`<span class="prompt">${pathPrompt}></span> ${escapeHtml(trimmed)}`);

    history.push(trimmed);
    if (history.length > 50) history.shift();
    try {
      localStorage.setItem('term_history', JSON.stringify(history));
    } catch (e) {}
    historyIndex = history.length;

    const args = trimmed.split(/\s+/);
    const cmdName = args.shift().toLowerCase();

    if (commands[cmdName]) {
      commands[cmdName].exec(args);
    } else {
      print(`Unknown command: "${cmdName}". Type "help" for options.`, 'error');
    }
    print('');
  }

  function matrixRain() {
    const chars = '01010101XYZ';
    let count = 20;
    const interval = setInterval(() => {
      let line = '';
      for (let i = 0; i < 30; i++) {
        line += chars[Math.floor(Math.random() * chars.length)];
        if (Math.random() < 0.2) line += ' ';
      }
      print(line, 'matrix-text');
      count--;
      if (count <= 0) clearInterval(interval);
    }, 50);
  }

  function handleTabComplete() {
    if (!buffer.trim()) return;
    const matches = Object.keys(commands).filter(c => c.startsWith(buffer.toLowerCase()));
    if (matches.length === 1) {
      buffer = matches[0];
      renderPrompt();
    } else if (matches.length > 1) {
      print(`${getPathString()}> ${buffer}`);
      print(matches.join('   '), 'info');
      print('');
    }
  }

  function boot() {
    const bootLines = [
      '[ BIOS ] LIHAN-BIOS 1.0 // POST OK',
      '[ MEM  ] 512 MB EDO RAM DETECTED',
      '[ HDD  ] C: DRIVE MOUNTED',
      '[ NET  ] SECURE LINK ESTABLISHED',
      '',
      'Welcome to LIHAN_Mainframe v1.0',
      'Type "help" for available subroutines.',
      ''
    ];

    let i = 0;
    const interval = setInterval(() => {
      try {
        if (i < bootLines.length) {
          print(bootLines[i]);
          playBeep();
          i++;
        } else {
          clearInterval(interval);
          isBooting = false;
          renderPrompt();
          if (terminal) terminal.focus();
        }
      } catch (err) {
        clearInterval(interval);
        isBooting = false;
        renderPrompt();
      }
    }, 60);
  }

  // --- Keyboard Event Capture ---
  window.addEventListener('keydown', (e) => {
    initAudio();

    if (isBooting || isProcessing) return;

    if (['ArrowUp', 'ArrowDown', 'Tab', 'Space'].includes(e.code)) {
      e.preventDefault();
    }

    playKeyClick();

    if (e.key === 'Enter') {
      const cmd = buffer;
      buffer = '';
      runCommand(cmd);
      renderPrompt();
      e.preventDefault();
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      buffer = buffer.slice(0, -1);
      renderPrompt();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabComplete();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        buffer = history[historyIndex] || '';
        renderPrompt();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        buffer = history[historyIndex] || '';
      } else {
        historyIndex = history.length;
        buffer = '';
      }
      renderPrompt();
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      outputEl.innerHTML = '';
    } else if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      print(`${getPathString()}> ${buffer}^C`);
      buffer = '';
      isPasswordMode = false;
      renderPrompt();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      buffer += e.key;
      renderPrompt();
    }
  });

  terminal.addEventListener('click', () => terminal.focus());

  // --- Window Controls ---
  if (headerElement && winElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    headerElement.onmousedown = (e) => {
      if (winElement.classList.contains('fullscreen')) return;
      if (e.target.closest('.win-controls, button')) return;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };
      document.onmousemove = (ev) => {
        ev.preventDefault();
        pos1 = pos3 - ev.clientX;
        pos2 = pos4 - ev.clientY;
        pos3 = ev.clientX;
        pos4 = ev.clientY;
        winElement.style.top = (winElement.offsetTop - pos2) + "px";
        winElement.style.left = (winElement.offsetLeft - pos1) + "px";
      };
    };
  }

  const maxBtn = document.getElementById('term-max');
  if (maxBtn && winElement) {
    maxBtn.addEventListener('click', () => {
      winElement.classList.toggle('fullscreen');
    });
  }

  const minBtn = document.getElementById('term-min');
  if (minBtn && terminal) {
    minBtn.addEventListener('click', () => {
      terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
    });
  }

  const closeBtn = document.getElementById('term-close');
  if (closeBtn && winElement) {
    closeBtn.addEventListener('click', () => {
      winElement.style.display = 'none';
    });
  }

  checkCorruptionState();
  boot();
})();