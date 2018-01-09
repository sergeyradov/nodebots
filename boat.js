var keypress = require('keypress');
var five = require("johnny-five");
var EtherPortClient = require("etherport-client").EtherPortClient;

// update host to the IP address for your ESP board
var D5 = 14;
var D6 = 12;
var D7 = 13; //PWM signal
var PWMA = 2000;
var PWMB = 2000;

//Second
var D2 = 4;
var D3 = 0;
var D8 = 15; //PWM Signal

var board = new five.Board({
    port: new EtherPortClient({
        host: "192.168.1.34",
        port: 3030
    }),
    timeout: 1e3,
    repl: false
});

board.on("ready", function() {
    console.log("READY!");
    
 //   var led = new five.Led(2);
 //   led.blink(100);

   var leftWheel= new five.Motor({
    pins: {
      pwm: D7,
      dir: D6,
      cdir: D5	
    }
    });

   var rightWheel= new five.Motor({
    pins: {
      pwm: D8,
      dir: D3,
      cdir: D2
    }
    });

leftWheel.setPWM(D7,0); 
leftWheel.setPin(D6,0); 
leftWheel.setPin(D5,0); 

rightWheel.setPWM(D8,0);
rightWheel.setPin(D3,0);
rightWheel.setPin(D2,0);

  keypress(process.stdin);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  console.log("press a key");
  process.stdin.on('keypress', function (ch, key) {

  if ( !key ) { return; }

    if ( key.name === 'q' ) {

      console.log('Quitting');
      process.exit();

    } else if ( key.name === 'up' ) {

      console.log('Forward');
      	leftWheel.setPWM(D7,PWMB);
      	leftWheel.setPin(D6,1);
      	leftWheel.setPin(D5,0);

	rightWheel.setPWM(D8,PWMA);
	rightWheel.setPin(D3,1);
	rightWheel.setPin(D2,0);

    } else if ( key.name === 'down' ) {

      console.log('Backward');
      	leftWheel.setPWM(D7,PWMB);
      	leftWheel.setPin(D6,0);
      	leftWheel.setPin(D5,1);

	rightWheel.setPWM(D8,PWMA);
	rightWheel.setPin(D3,0);
	rightWheel.setPin(D2,1);

   } else if ( key.name === 'space' ) {

      console.log('Stopping');
      	leftWheel.setPin(D7,0);
      	leftWheel.setPin(D6,0);
      	leftWheel.setPWM(D5,0);

	rightWheel.setPWM(D8,0);
	rightWheel.setPin(D3,0);
	rightWheel.setPin(D2,0);

    }

  });
});
