# AI // MACHINE LEARNING BASICS

```
AI.EXE >>> ML_CORE.MD
STATUS    : [OK]
```

## The Three Types (in 30 seconds)

1. **Supervised learning** — you show input → answer pairs. Train a model to
   predict answers for new inputs. (Example: "this photo is a cone vs cube".)
2. **Unsupervised** — the model finds structure in unlabeled data (clusters).
3. **Reinforcement learning (RL)** — an agent learns a policy by getting rewards
   for actions. (Example: robot learns to drive to zone by positive feedback.)

## The Data Pipeline (Where 80% of work lives)

```
COLLECT -> LABEL -> CLEAN/NORMALIZE -> -> SPLIT -> TRAIN -> EVALUATE
                 (validate/test)     -> DEPLOY (on the robot)
```

### Pit Rules of Data
- Label the **same object in different lighting/angles** or the model fails at
  the arena.
- Keep a **test set separate** from training — never tune against your test.
- **Augment**: rotate/flip/brighten images to fake more data.

## Loss, Overfitting, & Generalization

| Term            | Meaning                         |
|-----------------|---------------------------------|
| Loss            | How wrong the model is (lower = better).   |
| Overfitting     | Model memorizes training data, fails on new data. |
| Underfitting    | Model too simple, can't even fit training.  |
| Generalization  | Works on data it never saw. That's the goal. |

## Train Something Tiny

Even in FTC, you can train a **TFLite** model and run it on the Control Hub:

```python
# data prep (concept)
import tensorflow as tf
model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(16, 3, activation="relu"),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(2, activation="softmax")   # cone / cube
])
model.compile(optimizer="adam", loss="categorical_crossentropy")
model.fit(images, labels, epochs=5)

# export for mobile/robot
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite = converter.convert()
```

Then you convert + quantize (int8) to fit the robot's RAM.

## The Robotics Reality Check

- For **FTC/FRC**, pre-trained "object detector" (e.g., TFLite sample models) rarely
  fit your exact game elements. **Retrain a tiny custom model** instead.
- A **cheap & huge win** is transfer learning on a small model (MobileNet), not
  building a ResNet from scratch.
- Measure on the robot: inference **time** and **RAM** matter, not accuracy alone.

---

*Next: [AI computer vision pipelines](ai-03-computer-vision-pipelines.md)*