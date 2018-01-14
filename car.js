#!/usr/bin/env node
const argv = require('yargs').argv

var keypress = require('keypress');
var five = require("johnny-five");
var EtherPortClient = require("etherport-client").EtherPortClient;

//Board address
var ip = "192.168.1.35";
var turnTime = 2500;

if (argv.ip!=''){ console.log(`provided ip : ${argv.ip}`); ip = argv.ip;}
else{ console.log(`the ip is not provided as arg, usign default : ${ip}!`);}

if(argv.turnTime!=''){turnTime=argv.turnTime; } 
else { console.log(`Using default turnTime: ${turnTime}`); }

// update host to the IP address for your ESP board

//First motor
var D5 = 14;
var D6 = 12;
var D7 = 13; //PWM signal
var PWMB = 700;

//Second motor
var D2 = 4;
var D3 = 0;
var D8 = 15; //PWM Signal
var PWMA = 700;


var state = {
  up: false,
  down: false
};


var board = new five.Board({
    port: new EtherPortClient({
        host: ip,
        port: 3030
    }),
    timeout: 1e5,
    repl: false
});

board.on("ready", function() {
    console.log("READY!");
    keypress(process.stdin);
 	    
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


leftWheel.stop();
rightWheel.stop();


//  keypress(process.stdin);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  console.log("press a key");
  process.stdin.on('keypress', function (ch, key) {

  if ( !key ) { return; }

    if ( key.name === 'q' ) {

      	console.log('Quitting');
      	process.exit();

    } else if ( key.name === 'up'  && !state.up ) {

      	console.log('Forward');
      	state.down = false;
      	state.up = true;
	
      	leftWheel.stop().forward(PWMA);
      	rightWheel.stop().forward(PWMB);	
	
      /*  leftWheel.setPWM(D7,PWMB);
     	leftWheel.setPin(D6,1);
     	leftWheel.setPin(D5,0);

	rightWheel.setPWM(D8,PWMA);
	rightWheel.setPin(D3,1);
	rightWheel.setPin(D2,0);*/

	board.wait(1000, function () {
                 leftWheel.stop();
                 rightWheel.stop();
        });


    } else if ( key.name === 'down' && !state.down ) {

      console.log('Backward');

	state.down = true;
        state.up = false;
	
/*	leftWheel.setPWM(D7,PWMB);
        leftWheel.setPin(D6,0);
        leftWheel.setPin(D5,1);

        rightWheel.setPWM(D8,PWMA);
        rightWheel.setPin(D3,0);
        rightWheel.setPin(D2,1);*/

	leftWheel.stop().reverse(PWMA);
	rightWheel.stop().reverse(PWMB);
	board.wait(1000, function () {
                 leftWheel.stop();
                 rightWheel.stop();
        });

   } else if ( key.name === 'space' ) {

      console.log('Stopping');
	state.down = false;
        state.up = false;

	leftWheel.stop();
	rightWheel.stop();

    } else if (key.name === 'left'){

	console.log('Turning left');
	leftWheel.stop().forward(255);
	rightWheel.stop().reverse(255);
	
/*	leftWheel.setPWM(D7,PWMB);
        leftWheel.setPin(D6,1);
        leftWheel.setPin(D5,0);

        rightWheel.setPWM(D8,PWMA);
        rightWheel.setPin(D3,0);
        rightWheel.setPin(D2,1);*/

	board.wait(turnTime, function () {
		leftWheel.stop();
		rightWheel.stop();
  	});

    } else if (key.name === 'right'){
	console.log('Turning right');

	leftWheel.stop().reverse(255);
	rightWheel.stop().forward(255);

/*	leftWheel.setPWM(D7,PWMB);
        leftWheel.setPin(D6,0);
        leftWheel.setPin(D5,1);

        rightWheel.setPWM(D8,PWMA);
        rightWheel.setPin(D3,1);
        rightWheel.setPin(D2,0);*/	

	board.wait(turnTime, function () {
		 leftWheel.stop();
                 rightWheel.stop();
  	});
    }

  });
});

