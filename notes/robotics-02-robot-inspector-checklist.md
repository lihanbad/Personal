# ROBOTICS // ROBOT INSPECTION & PIT CHECKLIST

```
CORE.EXE >>> INSPECTION.MD
CATEGORY  : CORE
STATUS    : [OK]
```

Run this **before every match** — during auto or teleop is too late.

## Pre-Match Checklist (60 Seconds)

### Electrical
- [x] Battery voltage > 12V, terminals tight, no frayed wire near frame.
- [x] Main breaker / switch electrically sound (switch off → battery).
- [x] Control Hub / roboRIO LED = healthy, radio light stable.
- [x] All motor/servo plugs seated **fully** (listen for the click).
- [x] No loose screws touching solder pads / connectors.

### Mechanical
- [x] All drivetrain wheels free-spin by hand; no binding.
- [x] Gears/chain/belt tension check (belt ~1cm flex per foot).
- [x] Intake rollers, arms, claws physically in range of motion.
- [x] Lift slides aligned — if it catches, stop and fix NOW.
- [x] Rubber bands/zip ties replaced if stretched.

### Software/Config
- [x] Code deployed **right before the match** (battery identifier matches).
- [x] "Start" orientation set correctly (auto reads the alliance side).
- [x] IMU calibrated if the field map requires absolute heading.
- [x] Camera pointing the right way, lens clean.

### Drive/Ops
- [x] Driver & operator roles confirmed; backup driver ready.
- [x] Alliance plan agreed ("I take zone A, you take B; endgame: I climb") — *before match*.
- [x] Game element position aligned with the plan.

## Match-Day Pit Etiquette

- Keep the charging station organized: one person owns batteries.
- Have a **spare battery** charged at all times.
- If a part breaks: **isolate → fix → re-inspect → field check**, no wide-open holes.
- After every match: photo the mechanism + save telemetry logs before tearing down.

## After-Match Debrief (2 Minutes)

| Ask                 | Fix if…                              |
|---------------------|--------------------------------------|
| Did we score our auto points? | Refine path, not blind re-run. |
| Game element drops? | Friction/speed, not "luck".          |
| Loop overrun / lag? | Kill telemetry spam; cap FPS.        |
| Brownout?           | Current-limit motors; charge battery.|

## Field-Safety Overrides

- **Inspection damage rule:** if a referee flags it, don't argue — mark it, fix it.
- Always respectful: humans > points. This attracts alliances and judges.

## The Golden Pit Rule

> **A reliable 2-point robot beats a fragile 10-point robot.**
> Ship the season opener with your *safest* mechanisms, not your *wildest*.

---

*Back to [0. INDEX](0-INDEX.md)*