# FTC // HARDWARE & THE KIT OF PARTS

```
FTC.EXE >>> LOADING HARDWARE DATABASE...
STATUS    : [OK]
```

## Structural Channels

FTC teams build from a **Kit of Parts** plus allowed vendor parts. Common systems:

- **Building systems:** Tetrix, REV Robotics, Actobotics / goBILDA, 3D-printed parts.
- **Frames:** aluminum C-channel, extrusion, plates, corner braces, gussets.
- **Fasteners:** the 5mm hex / pin system on Tetrix; standard bolts, screws, zip ties.

## Motion Components

### Motors
- **DC motors** with gearboxes — output is low-RPM, high-torque (good for lifts).
- Motors have an **encoder** on the output (needed for closed-loop control).

### Servos
- Turn to a commanded **angle**, not a speed.
- Standard 180° range; some are **continuous rotation** (act like little motors).

### Gears & Transmissions
- **Gear ratio** trades speed for torque (or vice versa).
  - Larger gear on output = more torque, less speed.
  - `output_rpm = input_rpm / ratio`  — same for torque multiplied.
- Chains, belts, and pulleys transfer power over distance.

## Electronics & Power

| Part                  | Purpose                                   |
|-----------------------|-------------------------------------------|
| 12V battery           | Power everything.                         |
| Control Hub           | Runs code, 4 motor + servo/sensor ports.  |
| Expansion Hub         | More ports via I2C/USB to the Control Hub.|
| Driver Station/Hub    | Display + gamepads for the driver.        |
| Power switch          | Master kill switch (required at events).  |
| Voltage regulator     | Keep logic at stable 5V/12V rails.        |

## Sensors

- **Touch/limit switches** — trigger when pressed (zeroize mechanisms).
- **Distance sensors** — IR or ultrasonic ranging (detect obstacles/game elements).
- **Color / light sensors** — detect colored game elements.
- **IMU gyro** — heading/rotation for straight driving and auto turns.
- **Camera** — vision pipelines (AprilTag / object detection).

## Current & Wiring Rules

- Match wire **gauge to load**: motor power wires thick (14 AWG), sensors/signal thin.
- Keep **polarity** consistent (red + / black -) — swap and it can smoke a controller.
- Use **strain relief** at connectors (velcro, zip ties) so wires don't rip out.
- Fuse/hub current limits protect the Control Hub in a stall.

---

*Next: [FTC drivetrain design](ftc-03-drivetrain-design.md)*