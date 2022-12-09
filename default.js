
//module.exports.repl.ignoreUndefined = true;
//
//exports.bArrayLightOn = bArrayLightOn = [];
//Load all default Paths
require('./config/var/src/db.paths');

//Load all console require
exec = require('child_process').exec;
fs = require('fs');
net = require('net');
http = require('http');
https = require("https");
path = require('path');
request = require('request');
url = require('url');
get = require('simple-get')

//SDK1


//SDK2
hue = require('hue-sdk');     //hue = require( pathresources + './hue-sdk/lib/hue.js'),
client = new hue.Hue(require( pathconfig + './.credentials.json' ));

//Load and set default variables
require('./config/var/db.var.builder.js');
require('./config/var/db.var');

//Load default modules
bridge = require(  pathhuebridge + 'bridge.js' );
sensor = require( pathhuesensor + 'sensor.js' );
light = require( pathhuelight + 'light.js' );
avr = require( pathavrhk171s + 'avr.js');
smarttv = require( pathsmarttv + 'tv.js' );
server = require( pathserver + 'server.js' );

//
//httpRequests = require( pathlib + 'httpRequests.js' );
//httpPost = require( pathlib + 'httpPost.js' );
//httpGet = require( pathlib + 'httpGet.js' );

// Variables for Colored messages
const colors = {
	//General
    Reset: "\x1b[0m", Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
	
	//Font Color
    Black: "\x1b[30m",   	fgBlack: "\x1b[30m",		fgDarkGray: "\x1b[39m",
    Red: "\x1b[31m",     	fgRed: "\x1b[31m",          fgLightRed: "\x1b[91m",
    Green: "\x1b[32m",   	fgGreen: "\x1b[32m",        fgLightGreen: "\x1b[92m",
    Yellow: "\x1b[33m",  	fgYellow: "\x1b[33m",       fgLightYellow: "\x1b[93m",
    Blue: "\x1b[34m",    	fgBlue: "\x1b[34m",         fgLightBlue: "\x1b[94m",
    Magenta: "\x1b[35m", 	fgMagenta: "\x1b[35m",      fgLightMagenta: "\x1b[95m",
    Cyan: "\x1b[36m",    	fgCyan: "\x1b[36m",         fgLightCyan: "\x1b[96m",
    LightGray: "\x1b[37m",	fgLightGray: "\x1b[37m",    fgWhite: "\x1b[97m",
    Crimson: "\x1b[38m", 	fgCrimson: "\x1b[38m",
							fgDefault: "\x1b[39m",
					
	//Background Color
    bgBlack: "\x1b[40m",	bgDarkGray: "\x1b[100m",
    bgRed: "\x1b[41m",      bgLightRed: "\x1b[101m",
    bgGreen: "\x1b[42m",    bgLightGreen: "\x1b[102m",
    bgYellow: "\x1b[43m",   bgLightYellow: "\x1b[103m",
    bgBlue: "\x1b[44m",     bgLightBlue: "\x1b[104m",
    bgMagenta: "\x1b[45m",  bgLightMagenta: "\x1b[105m",
    bgCyan: "\x1b[46m",     bgLightCyan: "\x1b[106m",
    bgWhite: "\x1b[47m",
    bgCrimson: "\x1b[48m",
	bgDefault: "\x1b[49m",

};

const colorName = [colors.Red, colors.Green, colors.Blue];

var cLogSTDout = function(msg) { process.stdout.write(msg); };

function cLogSTDColor(color = colors.Reset, msg) {
    //cLogSTDout(color + msg + colors.Reset);
};


/*******\
| Start |###############################################################################################################################################################################
\*******/

//Start server at http://127.0.0.1:80
require('./server'); 

var myInit = function() {

    //new method    
    bridge.statusBridgeGetState();
    
    //keep the old method till new html is created
    if ( ( iCounter % 2 ) == 0 ){
        sensor.getInfoAll();
    } else {
        light.getInfoAll();
    }
    
    //counter start here when the object contain items
    if ( Object.values(oHueStateCur).filter(a=> typeof(a) == 'object').length > 7 ){
        oHueStateCur.iCounter = iCounter++;
        console.log('counter:' + oHueStateCur.iCounter + ' TickRate:' + iTickrate + ' iTickRateDefault:' + iTickRateDefault + ' iTickRateMin:' + iTickRateMin + ' iTickRateMax:' + iTickRateMax + ' Objects Found:' + (Object.values(oHueStateCur).filter(a=> typeof(a) == 'object').length));

    }

    setTimeout(myInit, iTickrate);
};
setTimeout(myInit, iTickrate);	//myInit();




function tickrateIncrease(iValue = 10){

    function tickrateDefaultIncrease(iValue){
        if ( iTickRateDefault < ( iTickRateMax - ( iValue / 10 ) ) ){
            iTickRateDefault += Math.round( iValue / 10 );
        }
    }

    tickrateDefaultIncrease(iValue);
  
    while ( iValue != 0 ){
        if ( iTickrate < iTickRateMax ){
    	    	iTickrate++;
        }
        iValue--;		 
    }
};



function tickrateDecrease(iValue = 10){
 
    function tickrateDefaultDecrease(iValue){
        if ( iTickRateDefault > ( iTickRateMin + ( iValue / 10 ) ) ){
            iTickRateDefault -= Math.round( iValue / 10 );
        }
    }

    tickrateDefaultDecrease(iValue);

	  while ( iValue != 0 ){
	  	    if ( iTickrate > iTickRateMin ){
	  	    	iTickrate--;
	  	    }
	  	    iValue--;
	  }
}





























//function isEmptyObject(obj) {
//  for (var key in obj) {
//    if (Object.prototype.hasOwnProperty.call(obj, key)) {
//      return false;
//    }
//  }
//  return true;
//}


//console.log(isEmptyObject(cache));
//console.log(typeof cache.property == "undefined")
//cache.hasOwnProperty('lights'));  
//Object.values(cache).filter(a=> typeof(a) == 'object').length > 0)

//if (Object.keys(cache).length > 4){
// console.log('counter:' + iCounter++ + ' TickRate:' + iTickrate + ' iTickRateDefault:' + iTickRateDefault + ' iTickRateMin:' + iTickRateMin + ' iTickRateMax:' + iTickRateMax + ' lightstate1:' + JSON.stringify(cache));

