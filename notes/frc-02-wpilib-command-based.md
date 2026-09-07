# FRC // WPILIB COMMAND-BASED PROGRAMMING (JAVA)

```
FRC.EXE >>> WPILIB.MD
STATUS    : [OK]
```

## Modern FRC Code Architecture

Newer FRC uses the **Command-Based** template: everything is a `Subsystem` or a
`Command`, with the *CommandScheduler* running them every robot loop at 50Hz.

## Anatomy of a Robot Project

```
src/main/java/frc/robot/
├── Robot.java            # robotInit(), robotPeriodic(), autonomousInit()...
├── RobotContainer.java   # wiring: subsystems + commands + bindings
├── subsystems/
├── commands/
└── constants/            # everything tuneable in one place
```

## Subsystems = Hardware Encapsulation

```java
public class DriveSubsystem extends SubsystemBase {
    private final DifferentialDrive drive;
    private final AHRS navX = new AHRS(SerialPort.Port.kUSB);

    public void arcadeDrive(double x, double rot) {
        drive.arcadeDrive(x, rot);
    }

    public double getHeading() { return -navX.getAngle(); }
}
```

Only the subsystem touches motors/sensors. Commands call **safe public methods**.

## Commands = Unit Actions

```java
public class DriveTime extends Command {
    private final DriveSubsystem drive;
    private double seconds;

    public DriveTime(DriveSubsystem drive, double seconds) {
        this.drive = drive; this.seconds = seconds;
        addRequirements(drive);           // IMPORTANT: conflict detection
    }

    @Override public void initialize() { drive.arcadeDrive(0.5, 0); }
    @Override public void end(boolean i) { drive.arcadeDrive(0, 0); }
    @Override public boolean isFinished() { return false; }
}
```

## Bindings = Nothing is Hardcoded

In `RobotContainer`, wire joysticks to commands:

```java
public RobotContainer() {
    configureBindings();
}

private void configureBindings() {
    new JoystickButton(driverJoystick, Button.kA)
        .whileTrue(new DriveTime(drive, 3));
    drive.setDefaultCommand(new RunCommand(
        () -> drive.arcadeDrive(-driver.getY(), driver.getX()), drive));
}
```

## The "Command Decorator" Toolkit

| Method      | Meaning                          |
|-------------|----------------------------------|
| `.withTimeout(2)` | Stop after 2 seconds.       |
| `.until(cond)`    | Run until a condition.      |
| `.andThen(other)` | Run this, then that.        |
| `.alongWith(other)`| Run simultaneously.         |
| `.onlyWhile(cond)` | Only run while true.        |
| `.repeatedly()`    | Loop forever.                |

## Pit-Safe Tips

- `RobotPeriodic`/`writePeriodicOutputs` — keep sensor reads cheap.
- Use **test modes** to verify each subsystem independently on the real robot.
- Log to shuffleboard: `SmartDashboard.putNumber("heading", drive.getHeading())`.

---

*Next: [FRC drivetrains & swerve](frc-03-drivetrains-swerve.md)*