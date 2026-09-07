# FTC // DRIVETRAIN DESIGN

```
FTC.EXE >>> KINEMATICS MODULE ONLINE
STATUS    : [OK]
```

## Drivetrain Types

| Type        | Motion             | Pros / Cons                         |
|-------------|--------------------|-------------------------------------|
| Tank        | Skid-steer         | Simple, strong, fast; hard to strafe |
| Mecanum     | 4 omni-directional wheels (45° rollers) | Strafe in any direction; lower traction, needs flat floor |
| Treads      | Tank tracks        | Great traction, slow-ish, bulky     |
| X-drive/H-Drive | Holonomic     | Strafe like mecanum, less traction loss |
| Swerve      | 4 steerable modules | Full 3-DOF motion; complex, heavy, expensive |

For FTC the most common strong choice is **mecanum** or a robust **tank/diff** with
casters.

## Mecanum Basics

- 4 wheels with **45° angled rollers**.
- To **strafe** left/right, spin the wheels so the rollers push sideways.
- Control math maps joystick vectors to wheel speeds:

```java
// drive = y, strafe = x, turn = rx (all -1..1)
double frontLeft  =  drive + strafe + turn;
double frontRight =  drive - strafe - turn;
double backLeft   =  drive - strafe + turn;
double backRight  =  drive + strafe - turn;
// normalize so max magnitude is 1.0, then setPower()
```

⚠️ Mecanum doesn't actually "drive straight" from square wheels — it drifts.
Use the **IMU** heading + encoders to keep it straight.

## Gearing & Speed

- FTC robot size limit is roughly **18" cube** in the "start config" — design inside it.
- Pick gearing by job:
  - Drivetrain: middle gear → 3–5 ft/s is usually plenty.
  - Slide/lift: high reduction → lots of torque to fight gravity.
- **Center of mass** should sit low and center-ish for fast turns.

## Making It Predictable

- **Robot center** should be measured (front, side, center of rotation) for auto mode.
- Use a **right-angle encoder / dead wheels** for odometry if doing auto paths.
- Add bumpers to survive collisions; stiffer = fewer surprises.

---

*Next: [FTC OpMode programming](ftc-04-opmode-programming.md)*