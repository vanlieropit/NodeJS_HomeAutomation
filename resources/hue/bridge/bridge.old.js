/***************************************************************************************************
*   Info:                                                                                          *
*                                                                                                  *
*   Hue Bridge                                                                                     *
*                                                                                                  *
*   TODO's:                                                                                        *
*          - Full Test                                                                             *
*          - Remove key from file                                                                  *
*   	                                                                                             *
*   INCLUDE:                                                                                       *
*   	     - bridge = require( path + './bridge.js' );                                                     *
*   	                                                                                             *
*                                                                                                  *
*  DEPENDENCY:                                                                                     *
*          - hue...                                                                                *
*   	                                                                                             *
*                                                                                                  *
***************************************************************************************************/
var http = require("http");
var contents = fs.readFileSync(pathconfig + './.credentials.json');
var jsonContent = JSON.parse(contents);

exports.getInfoAll = function( iLightNumber,sValue){
  client.get('/', function (err, ResultBridge) { 
    if ( err || typeof ResultBridge === undefined ){ 
      return err;
    }  
  sObjectResultBridges = ResultBridge;
  console.log("getInfoAll-Bridge")
  });
};

/**************\
| GET Function |#################################################################################################################################################################################
|
| Added own get function to make this module independent, this function will return an object.
|
\***********************************************************************************************************************************************************************************************/
proto='http://';
hostname= '192.168.0.101';
port= 80;
path= '/api/SdIlXGmbkKDtkdIQGNudKHYZ8LGmouMFi0v5AO9t/';

var options = {
  hostname: hostname,
  port: port,
  path: path,
  method: 'GET',
  headers: {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength("")
  }
};



exports.returnJSONstring = function(){ getJSON(); return JSON.stringify(ResultBridge);}
exports.returnJSONobj = function(){ getJSON(); return ResultBridge; }
getJSON = function(){
 
  var req = http.request( options, function(res) {
    res.on('data', (chunk) => {
      ResultBridge = JSON.parse(chunk);
      console.log(ResultBridge);
    });//res.on('end', () => { /**/ });
  });
  req.end();
}



exports.returnBufferobj = function(){ getBuffer(); return ResultBridge; }
exports.returnBufferstring = function(){ getBuffer(); return ResultBridge.toString(); }
getBuffer = function(){
 
  var req = http.request( options, function(res) {
    res.on('data', (chunk) => {
      ResultBridge = chunk;
    });//res.on('end', () => { /**/ });
  });
  req.end();
}

/****************************\
| PreDefined GETALL Function |###############################################################################################################################################################################
|
| Returns an JSON db file with all available values included
|
\***********************************************************************************************************************************************************************************************************/
exports.returnJSONObjAllToDb = function(){
  fs.writeFileSync( pathprivate + "./db-bridge.json", this.returnJSONstring());
};

exports = ResultBridge = {};


