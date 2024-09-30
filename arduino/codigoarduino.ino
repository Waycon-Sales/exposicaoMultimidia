#include <Ultrasonic.h>

//https://www.makerhero.com/blog/sensor-ultrassonico-hc-sr04-ao-arduino/
//https://github.com/MakerHero/Ultrasonic - para baixar a biblioteca do ultrasonic.h 
//Define os pinos para o trigger e echo
#define pino_trigger_f01 8
#define pino_echo_f01 9
 
#define pino_trigger_f02 10
#define pino_echo_f02 11

#define pino_trigger_f03 12
#define pino_echo_f03 13

//Inicializa o sensor nos pinos definidos acima
Ultrasonic ultrasonic01(pino_trigger_f01, pino_echo_f01);


Ultrasonic ultrasonic02(pino_trigger_f02, pino_echo_f02);

Ultrasonic ultrasonic03(pino_trigger_f03, pino_echo_f03);


 
void setup()
{
  Serial.begin(9600);
  Serial.println("Lendo dados do sensor...");
}
 
void loop()
{
 
  float cmMsec01, cmMsec02, cmMsec03;
  long microsec01 = ultrasonic01.timing();
  cmMsec01 = ultrasonic01.convert(microsec01, Ultrasonic::CM);

  long microsec02 = ultrasonic02.timing();
  cmMsec02 = ultrasonic01.convert(microsec02, Ultrasonic::CM);
  
  long microsec03 = ultrasonic03.timing();
  cmMsec03 = ultrasonic01.convert(microsec03, Ultrasonic::CM);

  Serial.println(cmMsec03);

  if(cmMsec01 < 40){
    Serial.println("01");
  }

  if(cmMsec02 < 40){
    Serial.println("02");
  }

  if(cmMsec03 < 40){
    Serial.println("03");
  }
  
  
  
  delay(2000);
}