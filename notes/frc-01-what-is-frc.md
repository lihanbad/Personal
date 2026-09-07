# FRC // FIRST ROBOTICS COMPETITION — OVERVIEW

```
FRC.EXE >>> SYSTEM INITIALIZED
CATEGORY  : FRC
DOC       : WHAT_IS_FRC.MD
STATUS    : [OK]
```

## What is FRC?

The **FIRST Robotics Competition** is the flagship FIRST program — high school
teams (grades 9–12, some middle schoolers) of 30 students build **professional-grade
metal robots** in a ~6–8 week build season. Think FTC but bigger, faster, and with
factory-level tools (milling machines, welding, real CAD).

## Season Timeline

| Phase            | What Happens                                 |
|------------------|----------------------------------------------|
| Off-season       | Recruitment, learn CAD/Java, fundraise.      |
| **Kickoff**      | Early January: game is revealed live.        |
| Build season     | Design → fabricate → program → drive.        |
| **Shipping**     | Robot ships to your first event.             |
| Regionals        | ~48h intra-competitions, alliances of 3.     |
| Championship     | Houston: the top of the pyramid.             |

## Match Format

- **Alliances of 3 teams** (like FTC but bigger).
- Match: **15s auto** → **2min 15s teleop** → **endgame** (often climbing/hanging).
- Games are scored by scoring elements (cubes, cones, notes, coral, algae...).

## Tech Stack

| Layer             | Typical Choice                    |
|-------------------|-----------------------------------|
| Control system    | **roboRIO 2.0** (NI)               |
| Programming       | **WPILib Java** (or C++ / LabVIEW)|
| Build system      | **GradleRIO**                      |
| Motor controllers | SparkMAX/SparkFlex (REV), TalonFX (CTRE) |
| Drivebase         | Differential, mecanum, or **swerve** |
| Dashboards        | SmartDashboard, Shuffleboard, Glass |

## Team Structure

```
DESIGN/CAD  ->  MECHANICAL FAB  ->  ELECTRICAL  ->  SOFTWARE  ->  DRIVE TEAM
                                     +  SAFETY, MEDIA, BUSINESS, OUTREACH
```

Every FRC team also has a **professional-ish "pit" culture**: wi-fi, spare parts
bins, protective gear, and robot inspection.

## FRC vs FTC at a Glance

|                | FTC                     | FRC                          |
|----------------|-------------------------|------------------------------|
| Robot size     | ~18" cube               | ~60 cubic feet, up to 125lb |
| Control        | Control Hub (Android)   | roboRIO (RT)                 |
| Build          | Kit + Tetrix/REV        | Aluminum, steel, CNC, plastic|
| Budget         | Smaller (under a few k) | Large (tens of thousands)    |
| Languages      | Java (Android)          | Java / C++ / LabVIEW         |

---

*Next: [FRC command-based programming](frc-02-wpilib-command-based.md)*