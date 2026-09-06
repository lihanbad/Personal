# THE TERMINAL HACKER'S MANUAL
### (aka: How to add cool stuff to the fake terminal)

> *** FILE: TERMINAL.md ***
> *** SUBJECT: EXTENDING `terminal.js` WITHOUT EXPLODING THE MAINFRAME ***
> *** CLEARANCE LEVEL: ALL HANDS ON DECK ***

Everything that makes the terminal tick lives in **`terminal.js`**.
It is a single file, one big function, zero libraries, one true purpose:
make you feel like a hacker on a website built by a guy with a dial-up modem.

---

## HOW THE TERMINAL WORKS (30-SECOND BRIEFING)

1. The page boots, and `boot()` fast-prints some fake BIOS lines.
2. Every key you press lands in `buffer` via the big `keydown` listener.
3. Press `Enter` → `submit()` fires → `run(cmd)` decides what to print.
4. `print(text)` appends a line to the green terminal screen.
5. `clear` wipes the screen. Like reality after a good night's sleep.

The whole command dispatch is a single `switch` statement inside `run()`.
That is the engine room. Everything else is cosmetic.

```js
switch (command) {
  case 'help':   // <-- you are here
  ...
  default:
    print('Unknown command: "' + cmd + '". Type "help" for a list.');
}
```

---

## ADDING A NEW COMMAND (THE 3-STEP RITUAL)

### STEP 1 — Register it in the `commands` list

Open `terminal.js`. Find the `commands` array near the top (it starts with
`help` and ends with `clear`). Add your command so `help` knows it exists:

```js
const commands = [
  { name: 'help',      desc: 'List all available commands' },
  { name: 'whoami',    desc: 'Display current user profile' },
  { name: 'about',     desc: 'Information about Lihan' },
  { name: 'rocket',    desc: 'Launch the airhorns of destiny' },  // NEW
  // ... keep the rest ...
];
```

### STEP 2 — Handle it in the `switch`

Find the switch inside `run()`. Add a `case`:

```js
case 'rocket':
  print('3... 2... 1...');
  print('LIFTOFF. Airhorns dispensed at maximum confidence.');
  print('');
  break;
```

**Rules of the land:**

- `print('...')` — prints a line. Add an extra `print('')` for spacing.
- A `case` MUST end with `break;` or it will fall through and run the next
  one (spooky inheritance from the C programming gods).
- If a case does `setTimeout`, nothing after it breaks; the script keeps
  running like a responsible adult.

### STEP 3 — Press F5 and type your command

Open `terminal.html` in the browser. Type `rocket` and hit Enter.

**Success states:** green text appears, you smile, the site remains intact.
**Failure states:** open the browser console (F12) and read the red words.

---

## COMMAND KIT — COPY-PASTE RECIPES

### Print a multi-line banner (ASCII art goes hard)

```js
case 'banner':
  print('    ______   __    __    __');
  print('   / ____/  / /_  / /   / /  // OOPS, DRY RUN');
  print('  / /___   / __ \\ / /_  / /__ ');
  print('');
  break;
```

### Redirect to another page (with a dramatic delay)

```js
case 'github':
  print('>> Opening secret vault door ...');
  setTimeout(() => { window.location.href = 'https://github.com/';
  }, 600);
  break;
```

### Make a fake download

```js
case 'download':
  print('Downloading free_pr0n.exe .........');
  print('ERROR 403: The 90s called, they want their trojan back.');
  print('');
  break;
```

### Random response (fun for `coinflip`, `dice`, `fortune`)

```js
case 'coinflip':
  print(Math.random() < 0.5 ? 'HEADS' : 'TAILS');
  print('');
  break;
```

### A self-aware command

```js
case 'whoami':
  print('You are you. The terminal is pretending to be wise.');
  break;
```

---

## CUSTOMIZING THE DETAILS

| What | Where | How |
|------|-------|-----|
| Boot sequence | `bootLines` array | Rewrite the fake BIOS lines, add moar |
| Hello text | `bootLines` end | Edit the "Welcome to LIHAN_Mainframe" line |
| Prompt label | `terminal.html` | The `lihan@mainframe:~$` span text |
| Blinking cursor speed | `css/terminal.css` | Tweak the `term-blink` keyframes |
| Terminal colors | `css/terminal.css` | Swap `--y2k-lime` / `--y2k-cyan` hues |
| Redirect destination | each `setTimeout` | Change the `window.location.href` value |
| `neofetch` info | `neofetch` string | Update os/host/memory lines |

---

## SECRET COMMAND LEVELS (DEAL WITH THE CONSEQUENCES)

There are currently three "gimmick" commands pre-installed: `matrix`
(spam-prints random 0s and 1s), `sudo` (denies you with style), and `hack`
(makes you feel powerful for exactly 2 seconds). Steal their patterns:

```js
case 'sudo':
  print('nice try. access level: INTERN. request denied.');
  break;
```

You can also wire up a hidden command using the existing Konami code in
`script.js` if you ever feel like hiding sekret content in the live site.
Do NOT abuse this power. Or do. We're not your mom.

---

## KEEPING IT COOL (THE STYLE GUIDE)

1. **Monospace.** Everything numeric-feeling belongs in the terminal view,
   not in fancy serif fonts.
2. **Verbose ASCII.** When in doubt, print a full line of stars or 1s.
3. **Deadpan humor.** Every error message should read like a polite
   sysadmin who has given up.
4. **No frameworks.** If you need a library to print text to a screen,
   you've gone too far.
5. **Test locally first.** `python3 -m http.server 8000` → open
   `terminal.html`. F5. Repeat.

---

*End of manual. The terminal is your oyster, the oyster is your terminal.*

*** SYSTEM: Logging you out in 3 ... 2 ... 1 ... ***