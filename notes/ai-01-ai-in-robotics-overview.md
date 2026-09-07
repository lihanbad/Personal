# AI // ARTIFICIAL INTELLIGENCE IN ROBOTICS — OVERVIEW

```
AI.EXE >>> NEURAL_CORE INITIALIZED
CATEGORY  : AI & SOFTWARE
DOC       : AI_IN_ROBOTICS.MD
STATUS    : [OK]
```

## What AI Brings to Robotics

Robots are "dumb movers"; **AI makes them see and decide**. In FTC/FRC/FGC terms,
AI shows up in three layers:

| Layer       | Example                                   |
|-------------|-------------------------------------------|
| **Perception** | Detect game elements, AprilTags, opponents, field markings, distances. |
| **Planning**   | Pathfinding (A*/RRT), task sequencing, "what do I score next?". |
| **Control**    | Learned policies instead of tuned PID (advanced; rarely used in FTC). |

## Where AI Is Allowed in Competition

- **FTC/FRC/FGC** allow camera-based processing: OpenCV, AprilTags, TFLite /
  object detection. They are not "AI" judges — they **reward robotic autonomy**.
- The tricky constraint is **compute**: your controller is small (Control Hub,
  roboRIO), so heavyweight models stay off-robot (Laptop → coprocessor).

## The AI Map for a Match

```
CAMERA (pixels)
   └─ vision pipeline (preprocess)
       └─ OBJECT DETECTION / APRILTAG  ->  decisions
             └─ planner (pathfinding / priority)
                 └─ PID / motion profile
                     └─ motors & servos
```

## Typical Competition AI Stack (FTC)

- **AprilTagProcessor** (FTC SDK) — the "GPS of FIRST".
- **TFLite object detection** — detect game elements by class.
- **OpenCV** thresholds — colors on the field.

FRC adds: **PhotonVision / Limelight** + **PathPlanner** + **PoseEstimator**
(vision + odometry fusion).

## The "AI Cheat Sheet" for Students

1. **Start dumb, then add AI.** A color threshold beat a neural net 90% of the time
   because it's predictable.
2. **Latency kills autonomy.** A "smart" model at 5 fps is worse than a dumb one at
   30 fps if decisions come late.
3. **Dataset > Model.** Your game element photos from 3 angles beat a huge generic
   dataset.
4. **Certain crash:** deploying a 200MB model to a Control Hub. Check `limited RAM`.
5. **Keep a human fallback:** drivers should always be able to override.

---

*Next: [AI machine learning basics](ai-02-machine-learning-basics.md)*