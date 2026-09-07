# FTC // AUTONOMOUS, PID CONTROL & ODOMETRY

```
FTC.EXE >>> CONTROL_LOOPS.MD
STATUS    : [OK]
```

## Why PID?

Raw `setPower()` gives you **no feedback** — the robot goes wherever friction lets it.
**PID** measures an error and corrects it every loop:

```
error    = target - current
output   = Kp*error + Ki*sum(error) + Kd*(error - lastError)
```

- **Kp** — how hard to push toward the target.
- **Ki** — removes steady-state error (keeps pushing when stuck short).
- **Kd** — dampens overshoot/oscillation.

## Tuning Order (practical)

1. Set **Kp** small, Ki=0, Kd=0. Increase Kp until it oscillates, then back off ~half.
2. Add small **Kd** to stop the bounce.
3. Only add **Ki** if it never reaches target (small value).

Test on the actual floor, not on blocks. A ceiling "SPEED" cap (`Math.max(min, Math.min(max, output))`) stops it from twitching.

## PID Droop + Feedforward

Basic PID fights gravity: a lift needs to hold torque just to stay up. Add
**feedforward** (constant "kF" / gravity term) so PID only fixes small errors:

```java
double output = kF + kP*error + kI*integral + kD*derivative;
```

## Odometry (Dead Wheels)

For competition auto, know **where you are**:

- **3 dead wheels** (2 parallel, 1 perpendicular) + encoders → `x, y, heading`.
- Wheel encoders give ticks; convert to inches with `ticks_per_inch`.
- Every loop: project wheel velocities onto robot frame, integrate into global pose.

```
x'    = x + (cos(heading)*dx - sin(heading)*dy)
y'    = y + (sin(heading)*dx + cos(heading)*dy)
heading = heading + dtheta    (from IMU gyro or the perpendicular wheel)
```

## Field-Centric / Absolute Positions

- **Field-centric** auto: target poses are from the center of the field, robot
  knows its heading from the IMU, so it can run the same path regardless of start angle.
- **AprilTag anchoring**: after detecting a tag (`DETECTION_THRESHOLD`), correct your
  pose — odometry drifts, tags don't.

## IMU Heading Keep-Straight

```java
double error = targetHeading - imu.getAngularOrientation().firstAngle;
double turn  = pid.calculate(error, 0);   // clamp to drivetrain
```

---

*Next: [FTC Road Runner pathing](ftc-06-road-runner-pathing.md)*