# FRC // CONTROL SYSTEM, CAN BUS & POWER

```
FRC.EXE >>> ELECTRICAL.MD
STATUS    : [OK]
```

## The Brain: roboRIO

- National Instruments **roboRIO 2.0** — real-time control, FPGA, runs your code.
- Connects over **Ethernet/USB** to a laptop for deployment.
- Runs the **50 Hz command scheduler loop** + your telemetry.

## CAN Bus (Your Electric Nervous System)

All motor controllers, PDH, Pneumatic Hub, and gyros talk on the **CAN bus**:

**Topology matters:**
- **Star topology** (rec from modern guidance): each device → 120Ω terminator.
- Chain (daisy-chain) is allowed but longer chains = more noise/flaky.

**Key rules:**
- Every device needs a **unique CAN ID**.
- Keep the bus **terminated** (120Ω at both ends — often built into modules).
- Use **shielded twisted pair**, keep wiring out of ground loops.

## Common Motor Controllers

| Device      | Vendor  | Notes                              |
|-------------|---------|------------------------------------|
| SPARK MAX   | REV     | Good beginner pick, easy.           |
| SPARK Flex  | REV     | Newer, more sensors/tunables.       |
| TalonFX / Falcon500 | CTRE | Powerful, closed-loop, high-end. |
| Victor SPX  | CTRE    | Simpler, non-RE (Brushed) migration.|
| PWM (simple)| mjpegs  | Only for super-simple mechanisms.   |

## Power Flow (Voltage Architecture)

```
12V battery → main breaker (120A)
    → power distribution hub (PDH or PDP)
        → motor controllers (fused outputs)
        → pneumatic hub / PCM (air solenoids)
        → roboRIO (5V logic, filters, PC)
        → radio (via roboRIO "Radio Power" or separate switch)
```

**Protect against brownout**: too much inrush at low voltage makes the radio drop
(match loss). Solutions: **current limiting** per motor, voltage compensation,
soft-start ramps in code.

## Current Limits (Set Them)

```java
// SparkMAX analog:
motor.configSmartCurrentLimit(40, 55);        // supply current, stall current

// or in code:
talon.configContinuousCurrentLimit(40);
talon.configPeakCurrentLimit(60);
talon.configPeakCurrentDuration(200);         // ms
talon.enableCurrentLimit(true);
```

Limits save gears, Febs, batteries, and your team's day.

## Pneumatics (Optional but Fun)

- Air compressor → **Pneumatic Control Module (PCM)** → solenoid valves → cylinders.
- Use for grabbers, brakes, or launchers — cheap torque, no motor heat.
- Beware: a stuck solenoid drains the tank; add a **pressure switch** cutoff.

## Deployment & Radio

```
Deploy code:  roboRIO writes over Ethernet/Wifi -> "Deploy Robot Code" in VS Code
Radio:        FRC off-the-shelf or "RoboRIO IP 10.TE.AM.2"
```

Bonus teams run AdvantageKit + AdvantageScope for logs — the best debugging combo.

---

*Back to [FRC index](0-INDEX.md) or next [FGC](fgc-01-what-is-first-global.md)*