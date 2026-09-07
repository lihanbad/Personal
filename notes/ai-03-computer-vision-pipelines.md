# AI // COMPUTER VISION PIPELINES FOR ROBOTS

```
AI.EXE >>> CV_PIPELINE.MD
STATUS    : [OK]
```

## The Universal CV Pipeline

```
1. CAPTURE        camera frame (RGB/BGR), maybe ROI crop
2. PREPROCESS     resize, blur, HSV/intensity, gamma
3. DETECT         thresholds / contours / blob / NN / AprilTag
4. ESTIMATE       "where is it in robot space?" (pixel -> offset)
5. DECIDE         "what do I do about it?" (drive / score / avoid)
6. ACT            send command to drivetrain / mechanism
```

Real competition robots run this every loop at 15–30fps on a small computer.

## Three Detection Families

### 1) Classic OpenCV (fast, no training)
```python
# python-ish pseudocode
hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv, (lo_h, lo_s, lo_v), (hi_h, hi_s, hi_v))
cnts, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cx, cy = centroid(largest(cnts))
```
Golden when the game element color is **distinct** and lighting is stable.

### 2) AprilTag (the FIRST favorite)
Tags give pose directly — used from FTC to FRC for field localization.

```
id + corner pixels -> homography -> (x, y, z, yaw/pitch/roll) vs camera
```

### 3) Neural object detection (YOLO / TFLite)
- Handles **cluttered** scenes; needs training data + compute.
- Typical small footprint: YOLOv5n / MobileNet-SSD + TFLite int8.

## Channel Math (HSV vs RGB)

RGB is terrible under lighting changes. Convert to **HSV** and threshold on
**H** (hue) mostly, V slightly — S tolerates jitter.

| Element    | Typical approach      |
|------------|-----------------------|
| Red/blue elements | HSV range + morphology (erode/dilate) |
| AprilTags  | Dedicated tag detector. |
| Field tape | HSV + line detection / RANSAC. |

## Pixel → Robot Offset (Calibration)

To drive to a detected object you need a **transform**:

```
distance ≈ (object_pixels * known_size) / (focal_length)
x_offset  ≈ (pixel_x - center_x) * linear_scale
```

Better: solvePnP with a known 3D model, or use the tag's pose directly.

## Per-Platform Notes

| Platform | Best practice                              |
|----------|--------------------------------------------|
| FTC      | VisionPortal / EasyOpenCV, TFLite small models, cap FPS. |
| FRC      | Coprocessor (Limelight/PhotonVision/Pi) → RIO for control. |
| FGC      | Keep pipeline tiny; tiny laptop + USB camera, test overseas lighting. |

## Debugging Vision Like a Pro

- **Visualize the mask**, not just the "final" string.
- Print `size`, `latency-ms`, and **confidence** each loop.
- When it fails, ask: _capture? threshold? frame timing? node?_ One of the four.

---

*Next: [AI neural networks & pathfinding](ai-04-neural-networks-and-pathfinding.md)*