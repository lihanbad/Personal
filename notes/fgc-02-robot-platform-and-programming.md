# FGC // ROBOT PLATFORM & PROGRAMMING

```
FGC.EXE >>> PLATFORM.MD
STATUS    : [OK]
```

## The Sustainable Kit of Parts

Every nation's team gets the **same kit** — the modern FGC kit moved away from
heavily machined metal toward:

- **Structural parts** designed to be assembled with common tools (screws, spacers,
  plates, beams).
- **Recyclable / sustainable materials** in the chassis.
- A single **shared electronics brain** with motor + servo ports and sensors.

The point: any two countries can compare robots 1:1, and a student in any country
can rebuild the baseline robot from public docs alone.

## Electronic Brain & Tools

- The control unit is a single-board controller with USB, motor-driver outputs,
  and inputs for the kits' sensors.
- Software on a **student laptop**: firmware + libraries + example programs.
- Support languages commonly include **C++ and/or Python** — check the official
  docs/team support page for the current season.

## Typical Robot Duties

Each game task maps to a subsystem. Build those as stone-cold reliable as possible:

```
DRIVE CHASSIS   -> get anywhere on the field quickly
INTAKE/GRABBER  -> pick up game elements
SCORING         -> place/launch elements into the goal
```

## Programming Mindset

```python
# pseudo-Python hybrid, structure only
initialize_sensors()
while match_active():
    if autonomous:
        follow_path("wedge")

    elif driver_input:
        set_drive(gamepad.x, gamepad.y)
        if scored_zone:  release_element()
```

Important rules for FGC code:

- **Keep it small.** You may not have teammates to maintain it.
- **Autonomous-first:** many matches are decided in auto. Hard-code tested paths.
- **Robustness over features:** a flag-change mid-season is a trap.
- **Log everything** to a file — you'll debug from the airport hotel room.

## Alliance Cooperation (Binary Star/Few Robots)

Matches use **alliance pairs**. Coordinate:

1. Who takes which game element zone.
2. Who does the **long-distance/high-value** task (e.g., launcher / climber).
3. Redundant auto paths if one robot fails.

## Pre-Event Checklist

- [x] Robot arrives packed with spare motor, screws, drive belt.
- [x] Laptop + charger + USB cables + backup code zipped.
- [x] Battery shrunk in the robot with strain relief.
- [x] Practice the full field walk with the exact official game elements.
- [x] Learn the **rules review** (autonomous config changes, alliance dialogue).

---

*Next: [AI & robotics overview](ai-01-ai-in-robotics-overview.md)*