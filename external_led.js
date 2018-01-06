var five = require("johnny-five");
var EtherPortClient = require("etherport-client").EtherPortClient;
// update host to the IP address for your ESP board
// Plug D7 - In (ARDUINO 13) 
// GND - GND 
// IN - 3V3

var board = new five.Board({
    port: new EtherPortClient({
        host: "192.168.1.35",
        port: 3030
    }),
    timeout: 1e5,
    repl: false
});

board.on("ready", function() {
    console.log("READY!");

    var led = new five.Led(13);
   // var led = new five.Led(2);
   //   led.blink();
 
    led.blink(500);
});
