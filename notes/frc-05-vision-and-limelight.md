# FRC // VISION & LIMELIGHT / PHOTONVISION

```
FRC.EXE >>> VISION.MD
STATUS    : [OK]
```

## What Vision Does in FRC

- **Targeting** (shooter/arm alignment): aim at a reflective target or AprilTag.
- **Pose estimation**: camera sees an AprilTag → robot knows where it is on the field.
- **Game-element detection**: find cones/coral/notes to pick up.

## Two Popular Low-Cost/High-Power Options

### Limelight (dedicated vision device)

1. Splits image, runs pipelines on-board, talks over **USB + NT (network tables)**.
2. Config via Limelight Dashboard / GUI (crosshairs, teams).
3. JSON output includes:
   - `tx` / `ty` — the horizontal/vertical angle to the target **from center**.
   - `ta` — target area (rough distance proxy).
   - `tid` — the **AprilTag ID** (for pose/setup decisions).
   - `botpose_targetspace` — robot pose in target space.

```java
double tx = nt.getNumber("tx", 0);
double ty = nt.getNumber("ty", 0);
drive.rotateForAngle(tx);   // aim - PID on tx
```

### PhotonVision (open-source, Raspberry Pi etc.)

- Free, flexible, Python plugin; streams via `PhotonLib`.
- Auto-generates camera "exposure vs streaming" docs.
- `PhotonCamera` / `PhotonTrackedTarget` objects with `getYaw()`, `getPitch()`,
  and full `Transform3d` pose estimates.

## Choosing: Pipeline Depth on the bot

| Approach        | Where processing runs | Latency         |
|-----------------|-----------------------|-----------------|
| roboRIO          | On the RIO (limited CPU) | higher          |
| Coprocessor  PI/Limelight/Orin | Dedicated CPU | low+ reliable |
| Hybrid | Both, pick best | best |

**Rule**: put vision on the coprocessor; keep the RIO for control.

## Megatag / AprilTag Localization

Field AprilTags have known poses (`AprilTagFieldLayout`), so:

```
robot_pose = fieldLayout.getTagPose(tagID) * transformFromCameraToTag
```

Fuse with odometry via a **PoseEstimator** (`PoseEstimator<SwerveDriveWheelPositions>`):

```java
poseEstimator.update(gyroHeading, swerveModulePositions);
poseEstimator.addVisionMeasurement(robotPose3d, timestamp);
```

The estimator flags vision points it trusts (standard deviation). This is the
difference between "aiming at an AprilTag" and "knowing where the robot actually is".

## Practical Pit Protocol for Vision

- Check camera **exposure at the field** lighting, not the lab.
- Verify **extrinsic pose** (camera position on the robot) — define same base link.
- Never trust one frame for a shot: latch the last 10 valid `tx` values.
- Always **fallback to manual** if target missing: give driver an auto-aim toggle.

---

*Next: [FRC control system & CAN bus](frc-06-can-bus-and-control-system.md)*