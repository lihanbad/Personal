# FTC // FIRST TECH CHALLENGE — OVERVIEW

```
FTC.EXE >>> SYSTEM INITIALIZED
CATEGORY  : FTC
DOC       : WHAT_IS_FTC.MD
STATUS    : [OK]
```

## What is FTC?

The **FIRST Tech Challenge** is a worldwide robotics competition for students, typically
grades 7–12. Teams of up to 15 students design, build, and program a robot to play a
new game each season against other teams in a head-to-head arena format.

## How a Match Works

- **Alliances:** Games are played in dual alliances (usually 2 teams per alliance).
- **Match length:** Roughly 2.5 minutes, split into:
  - **Autonomous period (~30s):** the robot runs on its own, no driver input.
  - **Driver-controlled / TeleOp (~2 minutes):** drivers steer the robot.
  - **End game:** a final scoring push (parking, hanging, launching, etc.).
- **Winning:** Points from auto + teleop + endgame. Awards are also given for
  engineering journals, outreach, and teamwork (not just match wins).

## The Core Team Roles

| Role               | Responsibility                                     |
|--------------------|----------------------------------------------------|
| Programmer(s)      | FTC SDK / Java, autonomous and teleop code.         |
| Mechanical          | CAD, build, gears, drivetrains, mechanisms.         |
| Electrical          | Wiring, control hub, power distribution, sensors.  |
| Drive team          | Driver + operator, gamepad control, strategy.      |
| Outreach/Engineer  | Notebook, socials, community events, awards.       |

## Competition Structure

- **Local qualifiers / leagues** → **Regional & State** → **FIRST Championship** (Houston).
- Pit area: teams repair robots and do robot inspection between matches.

## Key Hardware

- **REV Control Hub** — the "brain"; runs Android under the hood, hosts the FTC SDK.
- **Expansion Hub** — adds motor/servo/sensor ports for bigger robots.
- **Driver Station** — a phone/tablet or dedicated **Driver Hub** running the control app.
- **Motors** — DC motors with gearboxes + encoders.
- **Servos** — positional motion (claws, wrists, tweaks).
- **Sensors** — touch, distance, color, IMU/gyro, and vision cameras.

## Programming Mindset

```
Hardware mapping  ->  subystems  ->  teleop driver control  ->  autonomous
```

Keep code organized into **subsystems** (Drivetrain, Intake, Lift). Fall back to the
safest possible robot: a working automated movement beats a broken clever one.

---

*Next: [FTC hardware & the Kit of Parts](ftc-02-hardware-kit-of-parts.md)*