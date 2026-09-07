# AI // NEURAL NETWORKS & PATHFINDING ALGORITHMS

```
AI.EXE >>> LEARNING_MD
STATUS    : [OK]
```

## Neural Networks in 4 Sentences

A neural net is a stack of **layers** of "neurons". Each neuron computes
`output = activation(w0·x0 + w1·x1 + ... + bias)`. Training adjusts the **weights**
so the outputs match answers on labeled data. Deep = many layers = learns richer
patterns = needs more data to train.

```
input (pixels) -> [conv] -> [pool] -> [conv] -> [flatten] -> [dense] -> softmax
                   recognize edges & textures   ->   "cone" | "cube"
```

## The ML Tools You'll Actually Use

| Tool           | Use on a robot               |
|----------------|------------------------------|
| OpenCV         | Classic CV, pre-processing.  |
| TensorFlow Lite (TFLite) | Small CNN object detection on FTC/Android. |
| YOLOv8        | Faster/better detection, heavier (coprocessor). |
| scikit-learn  | Simple classifiers (kNN, SVM) prototypes.     |
| PyTorch       | Research, heavier models.    |

## Object Detection Mentally

Object detection outputs **bounding boxes**:

```
class    = "cone"
confidence = 0.93
box      = (x1, y1, x2, y2)
```

In robot code you turn that box into an aim offset — target the box **center x**
and steer. Don't drive to the box; drive to the pose behind the goal.

## Pathfinding (The "AI" of Movement)

Not all AI is neural nets. Classic search still rules path planning:

### A* (grid world)
```
openlist of nodes, score f = g (cost so far) + h (heuristic to goal)
expand lowest-f; reconstruct path from parents
```
Used for: virtual field maps, avoiding fence/teammates, human-style decision.

### RRT (continuous space, real parks)
Random sample → grow a tree toward goal → smooth with splines. Great for
drivetrain poses that must avoid walls/obstacles.

### Bezier / Spline smoothing
Convert waypoint lists into smooth curves (that's what Road Runner / PathPlanner do).

## RL: The "Robot Learns to Play" Myth vs Reality

- Reinforcement learning (agent gets rewards, learns a policy) is trendy but
  **rare in FTC/FRC** because:
  - You only get ~2 minutes of match; you can't afford thousands of failures.
  - Hardware safety: an RL agent happily drives off the table.
  - You already have the perfect "teacher": the game manual.
- Where RL *is* useful: **simulators** (Skynet-style), not the competition field.

## Putting It Together: An "AI Auto" Flow

```
1. AprilTag processor        -> robot pose on field
2. PathPlanner / RoadRunner  -> pick & smooth path to best scoring zone
3. YOLO/TFLite detection     -> see opponent robots, avoid late
4. PID / profile             -> actually move
5. Event logging             -> learn after the match, ship fixes for next one
```

That's the "AI area" of the notebook: perception + planning + control sharing a
single loop, guarded by limits and human overrides.

---

*Back to [0. INDEX](0-INDEX.md)*