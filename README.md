# LIHAN'S CYBER ZONE 2000

```
   _      __    _      _                     
  (_)    /_/   (_)_   (_)____               
 / / /| / / _  / / | / // __ \              
/ / | |/ /| | / /| |/ / / / / /            
| |__| | /_/ / |  | |__/ /_/ / /            
 \____/  \__/|_/  |_|\____|_/               
```

> *** WELCOME TO THE SOURCE OF LIHAN'S CYBER ZONE ***
> *** BEST VIEWED IN NETSCAPE NAVIGATOR 4.0 OR INTERNET EXPLORER 5.0 ***
> *** 800x600 RESOLUTION REQUIRED *** UNDER CONSTRUCTION ***

A fully hand-rolled, retro-fied personal portfolio site. Marquees, glowing
buttons, CRT scanlines and a secret Konami override — because 2026 is overrated.

---

## SYSTEM REQUIREMENTS

- A text editor that can handle ASCII art without crying
- A browser (any will do, even the fast ones)
- Optional: a dial-up modem for maximum authenticity

## FILE DIRECTORY

```
C:\LIHAN\
├── index.html          The homepage. About me, my vibes, my matrix.
├── robotics.html       Robotics division. FIRST Tech Challenge stuff.
├── projects.html       Builds, PCsBs, simulators, diagnostics.
├── contact.html        How to reach the engineer.
├── terminal.html       INTERACTIVE TERMINAL. Type "help". Yes, really.
├── terminal.js         The terminal brain. Edit here to add commands.
├── script.js           Window controls + KONAMI-style secret code.
├── css/
│   ├── main.css        Global retro theme (y2k buttons, scanlines...).
│   └── terminal.css    Terminal-specific styling (green glow, cursor).
├── site.webmanifest    PWA-ish manifest for the cool kids.
├── README.md           You are here, drifting through the void.
├── TERMINAL.md         GUIDE: how to hack your own terminal. See below.
└── .gitignore          Stuff that should never see the light of git.
```

## QUICK LAUNCH

Just open any `.html` file in your browser. No build step, no npm,
no "Webpack config required" nonsense. It's 1998 and we intend to keep it
that way.

To serve it like a real Neocities denizen:

```bash
python3 -m http.server 8000
```

Then drift over to `http://localhost:8000`.

## EASTER EGGS

- Press the Konami code (↑ ↑ ↓ ↓ ← → ← → b a) — THEN press the window's
  "X" button and watch the site invert. Find all the extra stuff yourself.
- The terminal window has minimize + close buttons that actually work.

## SITE CONTENTS

| Page              | What lives there                                |
|-------------------|-------------------------------------------------|
| `index.html`      | Profile, skills, directives, "about me" dossier |
| `robotics.html`   | Robotics + FIRST Tech Challenge writeups        |
| `projects.html`   | Software, embedded systems, CAD & R&D index     |
| `contact.html`    | Ways to reach Lihan                             |
| `terminal.html`   | An interactive fake CMD. Type `help`.           |

## EXTENDING THE TERMINAL (QUICK START)

The terminal is a tiny text adventure. You can add new commands in a
few lines. See **[TERMINAL.md](TERMINAL.md)** for the full boss-level guide.

---

*Built for robotics, code, and continuous learning.
&copy; 2026 Lihan. All rights reserved until the Singularity.*