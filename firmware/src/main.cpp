#include <Arduino.h>

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  if (Serial.available() > 0)
  {
    String data = Serial.readStringUntil('\n');
    data.trim();

    Serial.print("Received: ");
    Serial.println(data);

    Serial.println("Hello from Arduino!");
  }
}
