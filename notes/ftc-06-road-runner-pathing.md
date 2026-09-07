# FTC // ROAD RUNNER & PATH FOLLOWING

```
FTC.EXE >>> PATH_PLANNER.MD
STATUS    : [OK]
```

## What Road Runner Does

**Road Runner** is a motion library that turns a list of waypoints into a smooth
trajectory your robot can follow with **velocity + heading control**, instead of
naive stop-and-go.

- Defines **trajectories** (paths) with start/end points, tangets, turns.
- Uses a **localizer** (3-wheel odometry) to track pose.
- Feeds velocity commands to the motors each loop.

## Key Concepts

| Concept        | Meaning                                       |
|----------------|-----------------------------------------------|
| Trajectory     | A path defined by waypoints.                  |
| Spline         | A smooth curve between points.                |
| Tuning         | Getting the motion constants right.           |
| Localizer      | Tells the follower where the robot is.        |

## Minimal Setup

1. Add Road Runner + FTCLib/dependencies to your project.
2. Create drive class extending `DriveBase` with `setMotorPowers()`.
3. Tune `DriveConstants`: motor type, ticks per rev, gear ratio, **wheel radius**.
4. Run the **tuning tests** (drive forward, turn, back-and-forth) and record values.

## A Simple Trajectory

```java
TrajectorySequence t = drive.trajectorySequenceBuilder(new Pose2d(0, 0, 0))
        .forward(24)
        .turn(Math.toRadians(90))
        .back(12)
        .build();

drive.followTrajectorySequence(t);
```

## Don't Skip: Localizer Tuning

Road Runner is only as good as its **localizer**. If your dead wheels fight each
other, even the best autos will drift. Common fix: make sure wheels are exactly
parallel/right-angled and at known distances from the robot center.

## Alternatives

- **FTCLib** — modern Kotlin/Java tooling with command-based structure + its own
  path following (Road Runner under the hood).
- Hand-rolled `RUN_TO_POSITION` + IMU — simpler, less smooth, fine for short autos.

---

*Next: [FTC computer vision & AprilTag](ftc-07-computer-vision-apriltag.md)*