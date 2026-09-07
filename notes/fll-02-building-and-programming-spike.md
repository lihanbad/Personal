# FLL // BUILDING & PROGRAMMING WITH LEGO SPIKE

```
FLL.EXE >>> SPIKE.MD
CATEGORY  : FLL
STATUS    : [OK]
```

## The Kit

**LEGO SPIKE Prime** is the modern FLL robot system:

- **SPIKE Hub** — the brain (runs programs, has buttons, screen, ports).
- **3 motors + 4 sensors** typical: distance, color, force, and gyro.
- **Technic bricks & beams** — the real building happens here, not "classic" LEGO.

## Sensor Ports Map

| Port | Typical sensor      |
|------|---------------------|
| A    | Motor (left drive)  |
| B    | Motor (right drive) |
| C    | Motor (attachment)  |
| D    | Motor (attachment)  |
| E    | Distance sensor     |
| F    | Light/color sensor  |
| ...  | Force, gyro elsewhere |

## Two Programming Options

### 1) Block-based (SPIKE app)
- Color-coded word blocks (motion, sensing, control, operators).
- The default for rookies. Perfectly fine for winning FLL.

### 2) Python (Word Blocks / "Python" hub mode)
- Real syntax, good for older students.
- Interacts with motors/sensors via the `hub`, `motion_sensor`, `distance_sensor`...

```python
from spike import PrimeHub, Motor, DistanceSensor

hub = PrimeHub()
motor = Motor("B")
dist = DistanceSensor("E")

motor.run_to_position(360, speed=50)
while dist.get_distance_cm() > 15:
    keep_going_to_mission()
```

## Building Principles for FLL

- **Keep it light.** Every gram adds inertia; wheels slip, time is wasted.
- **Lock the wheels** — a robot that tracks straight wins matches (gear wheels
  to prevent wheel creep).
- **Simple > clever.** A box frame + 2 wheels + back caster + 1 attachment
  handles 80% of missions.
- **Attachments are the secret.** Interchangeable front attachments per mission
  instead of one overloaded arm.
- **Reinforce:** corner cubes, pin connectors every 2 studs where it flexes.

## Autonomous Strategy (the Whole Game)

FLL = **autonomous only**. No remote control. Strategy tips:

- **One run per group of missions:** route multiple missions in one run to save
  time (drive-out, do A+B near each other, return to base).
- **Return to BASE** for re-arming & new attachments mid-run.
- **Use the mat frame** (sides) for alignment, not sensors everywhere.
- **Gyro straight**: pre-calibrate the hub gyro, then hold straight lines.
- Never fight the mat (misalign by a stud = missing a mission).

## Testing & Repeatability

- Missions need **consistency**: same start pose, same attachment each run.
- Tape your start position on the table so every run is identical.
- Test at full speed early so you can reinforce the flexy parts *before* qualifiers.

## Practice "Pit" for FLL

```
RUN  -> watch -> NOTE the failure -> CHANGE ONE thing -> re-run
```

Literally: change **one** variable per run. That's how FLL teams win.

---

*Back to [0. INDEX](0-INDEX.md)*