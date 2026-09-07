# FRC // DRIVETRAINS & SWERVE

```
FRC.EXE >>> KINEMATICS.MD
STATUS    : [OK]
```

## The Three Main Drivetrain Families

| Type        | Turn radius | Speed      | Complexity | Typical use        |
|-------------|-------------|------------|------------|--------------------|
| Differential (tank) | 0-turn skid | high | low | Beginner / new teams |
| Mecanum     | 0-turn strafe | med | medium | Middleweight teams  |
| **Swerve**  | full 3-DOF  | high       | high       | Championship teams  |

## Swerve: The Meta

Swerve = 4 steerable modules (motor for drive + motor for steering each).
Full field-centric motion: **drive any direction while facing any direction**.

### Swerve Math (Roughly)

- Capture joystick `x, y, rot` (field-centric with gyro heading).
- Distribute to each module: `wheel_speed = vx·cos(θₘ) + vy·sin(θₘ) + ω·rₘ`.
- Each module simultaneous: translate + rotate command.

WPILib does this for you:
```java
SwerveDriveKinematics kinematics = new SwerveDriveKinematics(
    new Translation2d(0.5, 0.5), ... );   // module locations

ChassisSpeeds speeds = new ChassisSpeeds(vx, vy, vrot);   // field-centric
ChassisSpeeds fieldRel = ChassisSpeeds.fromFieldRelativeSpeeds(speeds, gyroHeading);
SwerveModuleState[] states = kinematics.toSwerveModuleStates(fieldRel);
swerveModuleStates.set(...);  // drive + turn each module
```

### Module Types

- **CTRE MK4i / MK4-plus** — Falcon 500s, closed-loop encoders.
- **REV MAXSwerve / REV modules** — NEOMs + SparkMAX.
- Swerve hardware is heavy and expensive — only pay for it if you can *maintain* it.

### Closed-Loop Wheel Control

Each module drive/turn is itself a PID/velocity loop. Common setup:
```
Turn:  PID on angle (nexus/absolute encoder)
Drive: velocity feedforward + PID (kV, kA)
```

## Odometry for Swerve

```java
SwerveDriveOdometry odom = new SwerveDriveOdometry(kinematics, gyroHeading);
odom.update(gyroHeading, swerveModuleStates);   // every loop
```

Optionally fuse vision (AprilTag pose) for drift correction.

## Non-Swerve Advice

- **Differential** — brutal for beginners, but pair it with **PID on heading**
  (`setGyroAngle`) to make straight lines, not fights.
- **Mecanum** — same kinematics math as FTC; keep the floor clean.

---

*Next: [FRC motion profiling & pathing](frc-04-motion-profile-pathing.md)*