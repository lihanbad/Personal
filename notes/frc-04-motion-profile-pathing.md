# FRC // MOTION PROFILING & PATH PLANNING

```
FRC.EXE >>> TRAJECTORY.MD
STATUS    : [OK]
```

## Motion Profiling vs Simple Setpoints

A simple "spin motor to X" causes jerk — the robot slams. A **motion profile**
smooths the request: trapezoid velocity curve (accelerate → cruise → decelerate)
recomputed every loop.

## WPILib Dopes You With Classes

| Class                 | What it does                        |
|-----------------------|-------------------------------------|
| `TrapezoidProfile`    | Curves position/setpoint over time. |
| `ProfiledPIDController`| PID + trapezoidal profile on top.  |
| `RamseteController`   | Follows a planned path nonlinearly. |
| `Trajectory` / `TrajectoryGenerator` | Creates spline-based paths with heading + time. |

## PathPlannerLib — The Fast Way

**PathPlanner** (from teams like Spartronics) generates paths with a GUI and exports
`.path` files. FRC code then:

```java
PathPlannerTrajectory traj = PathPlanner.loadPath("backup", PathConstraints(2.0, 3.0));
var cmd = new PPSwerveControllerCommand(traj, poseEstimator, kinematics,
    xController, yController, thetaController, moduleStates::setStates, swerve);
```

- Perfect for swerve autos: specify waypoints, headings, and "charging station"
  ramps right in the GUI.
- Supports holonomic (swerve) and differential modes.

## Feedforwards (Because PIDs Alone Are Lazy)

Motors need to *know* what it takes to move, not just react to error:

```
voltage = kS*sign(v) + kV*v + kA*a + kG*cos(θ)
```

- **kS**: static friction (push to get it rolling).
- **kV**: voltage per unit velocity.
- **kA**: voltage per unit acceleration (inertia).
- **kG**: gravity term for lifts intakes etc.

WPILib `SimpleMotorFeedforward` + `ElevatorFeedforward` compute these. **Tune them
on real hardware with `SYSID`** (a tool that ramps motors and fits kV/kA/kS).

## Trajectory = Path + Speed + Heading

A real auto path is not just "go forward 2m" — it plans:
- Position over time (smooth spline).
- Velocity over time (respects max speed).
- Heading over time (swerve turns while driving).

## Practice: The "3-Second Auto"

1. Generate a path in PathPlanner to score the easiest game piece.
2. Add a heading reference + end position clamp.
3. Tune `CMaxVelocity` / acceleration in the `PathConstraints`, not in random PID.

---

*Next: [FRC vision & Limelight](frc-05-vision-and-limelight.md)*