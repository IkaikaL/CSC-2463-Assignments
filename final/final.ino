#define VRX_PIN  A0 // Arduino pin connected to VRX pin
#define VRY_PIN  A1 // Arduino pin connected to VRY pin

#define LEFT_THRESHOLD  400
#define RIGHT_THRESHOLD 800
#define UP_THRESHOLD    400
#define DOWN_THRESHOLD  800

#define COMMAND_NO     0x00
#define COMMAND_LEFT   0x01
#define COMMAND_RIGHT  0x02
#define COMMAND_UP     0x04
#define COMMAND_DOWN   0x08

int xValue = 0 ; // To store value of the X axis
int yValue = 0 ; // To store value of the Y axis
int command = COMMAND_NO;
int movement;
int buttonPin = 6;

void setup() {
  Serial.begin(9600) ;
}

void loop() {
  // read analog X and Y analog values
  xValue = analogRead(VRX_PIN);
  yValue = analogRead(VRY_PIN);
  
  if(digitalRead(buttonPin) == 1) {
    Serial.println(digitalRead(buttonPin));
    delay(1000);
  }
  

  // converts the analog value to commands
  // reset commands
  command = COMMAND_NO;

  // check left/right commands
  if (xValue < LEFT_THRESHOLD)
    command = command | COMMAND_LEFT;
  else if (xValue > RIGHT_THRESHOLD)
    command = command | COMMAND_RIGHT;

  // check up/down commands
  if (yValue < UP_THRESHOLD)
    command = command | COMMAND_UP;
  else if (yValue > DOWN_THRESHOLD)
    command = command | COMMAND_DOWN;


  // print command to serial and process command
  if (command & COMMAND_LEFT) {
    if (Serial.available()) {
    // read the most recent byte (which will be from 0 to 255):
    movement = Serial.read();
    analogWrite(command, movement);
  }
    Serial.println(2);
    delay(500);
  }

  if (command & COMMAND_RIGHT) {
    Serial.println(3);
    if (Serial.available()) {
    // read the most recent byte (which will be from 0 to 255):
    movement = Serial.read();
    analogWrite(command, movement);
  }
  delay(500);
  }

  if (command & COMMAND_UP) {
    Serial.println(4);
    if (Serial.available()) {
    // read the most recent byte (which will be from 0 to 255):
    movement = Serial.read();
    analogWrite(command, movement);
  }
  delay(500);
  }

  if (command & COMMAND_DOWN) {
    Serial.println(5);
    if (Serial.available()) {
    // read the most recent byte (which will be from 0 to 255):
    movement = Serial.read();
    analogWrite(command, movement);
    
  }
  delay(500);
  }
}
