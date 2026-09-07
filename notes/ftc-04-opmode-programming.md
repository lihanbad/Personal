# FTC // OPMODE PROGRAMMING (JAVA / FTC SDK)

```
FTC.EXE >>> COMPILER READY
LANG      : JAVA
SDK       : FTC_SDK
STATUS    : [OK]
```

## Two Ways to Write FTC Code

| Method        | Notes                                        |
|---------------|----------------------------------------------|
| **Android Studio** | Full Java project, Git, best for big robots.|
| **OnBot Java** | Edit in browser, uploads to Control Hub.    |

Both compile to the same thing. Start with OnBot Java, graduate to Android Studio.

## OpMode Types

Every program is an **OpMode**:

```java
@TeleOp(name = "Mecanum Drive")
public class MecanumDrive extends LinearOpMode { ... }
```

```java
@Autonomous(name = "Auto A", group = "Autonomous")
public class AutoA extends LinearOpMode { ... }
```

### LinearOpMode (recommended)
Runs the whole program **top-to-bottom in one linear block**:

```java
@Override
public void runOpMode() throws InterruptedException {
    waitForStart();                 // blocks until driver presses START
    while (opModeIsActive()) {
        double y = -gamepad1.left_stick_y;
        double x = gamepad1.left_stick_x;
        ...
    }
}
```

### Linear OpMode vs "TeleOp" thinking
- **TeleOp**: usually a `while (opModeIsActive())` loop reading gamepads.
- **Auto**: sequence `move(0.5, 2000ms)` → `sleep()` → `turn(...)` with
  `waitForStart()` first, and use **opModeIsActive()** so STOP always aborts.

## Hardware Mapping

Configure names in the FTC Driver Station **Configure Robot** screen, then grab them:

```java
DcMotor leftMotor  = hardwareMap.get(DcMotor.class, "leftFront");
DcMotor rightMotor = hardwareMap.get(DcMotor.class, "rightRear");
Servo arm          = hardwareMap.get(Servo.class, "arm");
BNO055IMU imu      = hardwareMap.get(BNO055IMU.class, "imu");
```

> If the name doesn't match the XML config, the OpMode **crashes** on init.

## Encoders & Direction

- Set the **right side motors reversed** so a positive power = go forward on both:

```java
rightMotor.setDirection(DcMotor.Direction.REVERSE);
leftMotor.setDirection(DcMotor.Direction.FORWARD);
```

- Reset encoders at start:
```java
leftFront.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
leftFront.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
```

- Move to a target distance:
```java
int target = leftFront.getCurrentPosition() + ticksPerInch * inches;
leftFront.setTargetPosition(target);
leftFront.setMode(DcMotor.RunMode.RUN_TO_POSITION);
leftFront.setPower(0.4);
```

## Telemetry (your debug screen)

```java
telemetry.addData("left", leftFront.getCurrentPosition());
telemetry.update();
```

Print voltage, encoder ticks, and heading every loop. Telemetry is your best friend.

---

*Next: [FTC autonomous & PID control](ftc-05-autonomous-pid-control.md)*