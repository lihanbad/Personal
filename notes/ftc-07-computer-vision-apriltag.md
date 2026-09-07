# FTC // COMPUTER VISION & APRILTAGS

```
FTC.EXE >>> VISION_PIPELINE.MD
STATUS    : [OK]
```

## Why Vision?

Vision lets the robot **know what it sees** — field elements, game pieces,
opponents. Used for:

- **AprilTag localization** — great for auto, matches field coordinates.
- **Pixel/game-element detection** — find objects, drive to them, score.
- **Liners/supp etch detection** — colored regions for alignment.

## AprilTags 101

AprilTags are square fiducial markers with a payload of bits. When detected, you get:

- **ID** (which tag), **size** (pixels), **pose** (x, y, z, rotation relative to camera).

The field manual gives each tag a known **field pose**, so detecting one tag
solves your robot's global position:

```
robot_pose = tag_field_pose  ⊕  inverse(tag_camera_pose)
```

(Tag draws a big "correction" to your odometry.)

## FTC Vision APIs

| API               | Notes                                  |
|-------------------|----------------------------------------|
| **VisionPortal**  | Newer FTC API, runs AprilTag + TFLite detection, camera on the Control Hub. |
| **EasyOpenCV**    | OpenCV wrapper, custom pipelines, older active season preferred. |
| **TFLite / tensorflow-lite** | Object detection models (game pieces). |

### VisionPortal Example

```java
AprilTagProcessor tagProcessor = new AprilTagProcessor.Builder().build();

VisionPortal portal = new VisionPortal.Builder()
        .setCamera(hardwareMap.get(WebcamName.class, "Webcam 1"))
        .addProcessor(tagProcessor)
        .build();
```

Read results each loop:
```java
List<AprilTagDetection> dets = tagProcessor.getDetections();
double x = dets.get(0).ftcPose.x;   // offset relative to camera
GridLayout... drive to it
```

## Detection Pipeline (EasyOpenCV)

1. **Grab frame** from camera.
2. **Preprocess** — blur, HSV threshold (color filters).
3. **Find contours / blobs**.
4. Pick the biggest / closest match → report center pixel.
5. Convert pixel → robot offset (via calibration), command the drivetrain.

## Practical Tips

- **Lighting is everything.** Test your thresholds in the arena, not on your desk.
- Cap the camera FPS it **costs CPU** on the Control Hub.
- Never make a decision from ONE frame — average/latch over a few frames.
- Fall back gracefully: "no tag seen → use odometry", never crash.

---

*Next: [FTC strategy & pit ops](ftc-08-game-strategy-and-pit.md)*