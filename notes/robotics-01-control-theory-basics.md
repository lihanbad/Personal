# ROBOTICS // CONTROL THEORY BASICS (PID, FEEDFORWARD, LOOPS)

```
CORE.EXE >>> CTRL_THEORY.MD
CATEGORY  : CORE
STATUS    : [OK]
```

## Open-Loop vs Closed-Loop

- **Open loop:** command goes out, we never check result.
  *(robot drives 2s, we hope it went 2m)*
- **Closed loop (feedback):** sensor measures result, we correct.
  *(measure encoder, drive until we reach 2m)*

Feedback is how robots stop crashing into walls.

## The Feedback Diagram (Every FTC/FRC Robot)

```
target (setpoint)
   ↓
[ERROR = target - feedback]
   ↓
[CONTROLLER -> output]   --->  [PLANT (motor/robot)]  ---+--> moving
   ↑                                                      |
   └----------------- [SENSOR (encoder/gyro)] <----------┘
```

## PID Controller

```
output = Kp * error + Ki * ∫error dt + Kd * d(error)/dt
```

- **P (proportional):** push in proportion to how far off you are.
- **I (integral):** add up past error → removes steady-state error.
- **D (derivative):** react to how fast error is changing → anti-overshoot.

### Tuning (Ziegler-Nichols-ish, practical)
1. Kd=0, Ki=0. Raise Kp until it oscillates. Back off ~50%.
2. Add Kd until oscillation stops.
3. Add a pinch of Ki only if you never reach target.

### Windup
I term grows huge if the robot is stuck → snaps forward when unstuck.
Clamp the integral, or only accumulate when `|error| < threshold`.

## Feedforward (The Pro Move)

PID is *reactive*; feedforward is *predictive*:

```
Voltage = kS*sign(v) + kV*v + kA*a + kG_GRAVITY   (+ PID error term)
```

- kS — overcome static friction.
- kV — voltage per unit velocity.
- kA — voltage per unit acceleration.
- kG — gravity holding a lift up.

WPILib has `SimpleMotorFeedforward`/`ElevatorFeedforward`; FTC uses custom
`MotorFeedforward` classes (e.g. via Road Runner/FTCLib).

## Digital Discretization (You Speak This Daily)

A digital loop runs every `dt` (e.g., 50Hz → dt=20ms):

```
integral += error * dt
derivative = (error - lastError) / dt
lastError  = error
```

## Control "Grades" in Competition

| Level  | What it means                                   |
|--------|------------------------------------------------|
| Good   | Closed-loop position/velocity, PID tuned in-site. |
| Better | Add feedforward + trajectory (no stop-go).       |
| Best   | Vision-fused pose control + saved logs + auto recovery. |

## Practical Rules of Thumb

- **Never leave a motor on RUN_WITHOUT_ENCODER** if you have encoders and care
  about accuracy.
- Test PID on the **field surface**, re-tune after battery change (voltage sags).
- Smooth setpoints — a trapezoid profile beats jumping a PID setpoint.
- Log target vs actual; if they diverge in a pattern, that's a feedforward issue.

---

*Next: [Robot inspection & pit checklist](robotics-02-robot-inspector-checklist.md)*