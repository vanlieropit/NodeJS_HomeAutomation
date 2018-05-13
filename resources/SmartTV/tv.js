/***************************************************************************************************
*   Info:                                                                                          *
*                                                                                                  *
*   Tested on Philips Smart Tv (55PFS8209/12)                                                      *
*                                                                                                  *
*   TODO's:                                                                                        *
*          - DEBUG COPYPASTE: http://192.168.0.97:1925/5/audio/volume                              *
*          - Merge oDb.system.timestamp and oDb.system.epgsource to oDb.system                     *
*          - values for pointer                                                                    *
*   	                                                                                           *
*   INCLUDE:                                                                                       *
*   	     - tv = require( path + './tv.js' );                                                   *
*   	                                                                                           *
*   GET:                                                                                           *
*          -                                                                                       *
*          -                                                                                       *
*          -                                                                                       *
*                                                                                                  *
*   POST:                                                                                          *
*          -                                                                                       *
*          -                                                                                       *
*          -                                                                                       *
*                                                                                                  *
*   JSON:                                                                                          *
*          - Collect:                                                                              *
*              smarttv.GetJSONObjAsyncAll());                                                        *
*          - Write to file:                                                                        *
*              smarttv.GetJSONObjAsyncAllToDb();                                                     *
*   	     - Read from file:                                                                     *
*              console.log(fs.readFileSync( pathprivate + "./db.json", 'UTF8'));                   *
*                                                                                                  *
*  DEPENDENCY:                                                                                     *
*          - independent (only Node.js Built-in Modules): fs, http                                 *
*   	                                                                                           *
*                                                                                                  *
***************************************************************************************************/

//  * @param  {string}   reqUrl   The required url in any form
//  * @param  {object}   options  An options object (this is optional)
//  * @param  {Function} cb       This is passed the 'res' object from your request
//      .replace(/\n/g,'').split("\r").map(x => '\n' + x +  " = '';");
//var parallel = 10;
//var agent = new http.Agent({maxSockets: parallel});

//smarttv = this;

//Already assigned :)
const fs = require("fs");
const http = require("http");
//const EventEmitter = require('events');


const cachepath = './public/cache/';
const cachedb = cachepath + './db-tv.json';
const cachefile = cachepath + './_tempdb';
var WriteJSONFile = false;

//var iCounter = 0;

var iTvUpdateInterval = 50;     // > 150
const proto = 'http://';

var timestarted = 0;
var time0 = 0;
var time1 = 0;

const host = '192.168.0.97';
const port = 1925;

const testhost = 'date.jsontest.com';
const testport = 80;
const testpath = '/ip';

function ConfigGetJSON(path){
    return {
        hostname: host,
        port: port,
        path: path,
        method: 'GET',
        headers: {
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength("")
        }
    };
}

function ConfigPostJSON(path,jObj){
    return {
        host: host,
        port: port,
        path: path,
        method: 'POST',
        json: true,
        headers: {
            'Content-Type' : 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(jObj))
        }
    };
}

/*************************\
| Predefined/Cache Values |############################################################################################################################################################################
|
|
\*****************************************************************************************************************************************************************************************************/
//Predefine oDb
var oDb = {}; oDb.activities = {}; oDb.ambilight = {}; oDb.audio = {}; oDb.channeldb = {}; oDb.input = {}; oDb.network = {}; oDb.system = {};
//oDb.system.epgsource; //oDb.system.timestamp; //fs.writeFileSync( "./db-smarttvnew.json", JSON.stringify(oDb) , 'utf-8');

//Paths listening                                         //Automatic update             // cycles to skip between updates //Able to POST request   //Able to GET request                                                               
var sArrayPaths=[];                                       var updateAfterInit=[];        var countBeforeUpdate=[];         var canDoPost=[];        var canDoGet=[];                                
                                                                                                                                                              
    sArrayPaths[0] = void 0;                              updateAfterInit[0]  = false;   countBeforeUpdate[0]  = void 0;   canDoPost[0]  = false;   canDoGet[0]  = false;                                                           
    sArrayPaths[1] ='/5/activities/tv';                   updateAfterInit[1]  = false;   countBeforeUpdate[1]  = void 0;   canDoPost[1]  = false;   canDoGet[1]  = true ;                                                           
    sArrayPaths[2] ='/5/ambilight/cached';                updateAfterInit[2]  = true ;   countBeforeUpdate[2]  = 100;      canDoPost[2]  = true ;   canDoGet[2]  = true ;                                                           
    sArrayPaths[3] ='/5/ambilight/lounge';                updateAfterInit[3]  = true ;   countBeforeUpdate[3]  = 50;       canDoPost[3]  = true ;   canDoGet[3]  = true ;                                                           
    sArrayPaths[4] ='/5/ambilight/measured';              updateAfterInit[4]  = true ;   countBeforeUpdate[4]  = 50;       canDoPost[4]  = false;   canDoGet[4]  = true ;                                                           
    sArrayPaths[5] ='/5/ambilight/mode';                  updateAfterInit[5]  = true ;   countBeforeUpdate[5]  = 10;       canDoPost[5]  = true ;   canDoGet[5]  = true ;                                                           
    sArrayPaths[6] ='/5/ambilight/processed';             updateAfterInit[6]  = true ;   countBeforeUpdate[6]  = 1;        canDoPost[6]  = false;   canDoGet[6]  = true ;                                                           
    sArrayPaths[7] ='/5/ambilight/topology';              updateAfterInit[7]  = false;   countBeforeUpdate[7]  = void 0;   canDoPost[7]  = false;   canDoGet[7]  = true ;                                                           
    sArrayPaths[8] ='/5/applications';                    updateAfterInit[8]  = false;   countBeforeUpdate[8]  = void 0;   canDoPost[8]  = false;   canDoGet[8]  = true ;                                                           
    sArrayPaths[9] ='/5/audio/volume';                    updateAfterInit[9]  = true ;   countBeforeUpdate[9]  = 4;        canDoPost[9]  = true ;   canDoGet[9]  = true ; 
    sArrayPaths[10]='/5/channeldb/tv';                    updateAfterInit[10] = false;   countBeforeUpdate[10] = void 0;   canDoPost[10] = false;   canDoGet[10] = true ; 
    sArrayPaths[11]='/5/context';                         updateAfterInit[11] = true ;   countBeforeUpdate[11] = 8;        canDoPost[11] = false;   canDoGet[11] = true ; 
    sArrayPaths[12]='/5/input/key';                       updateAfterInit[12] = false;   countBeforeUpdate[12] = void 0;   canDoPost[12] = true ;   canDoGet[12] = false; 
    sArrayPaths[13]='/5/input/pointer';                   updateAfterInit[13] = false;   countBeforeUpdate[13] = void 0;   canDoPost[13] = true ;   canDoGet[13] = false; 
    sArrayPaths[14]='/5/network/devices';                 updateAfterInit[14] = false;   countBeforeUpdate[14] = void 0;   canDoPost[14] = false;   canDoGet[14] = true ; 
    sArrayPaths[15]='/5/powerstate';                      updateAfterInit[15] = true ;   countBeforeUpdate[15] = 4;        canDoPost[15] = true ;   canDoGet[15] = true ; 
    sArrayPaths[16]='/5/system';                          updateAfterInit[16] = false;   countBeforeUpdate[16] = void 0;   canDoPost[16] = false;   canDoGet[16] = true ; 
    sArrayPaths[17]='/5/system/country';                  updateAfterInit[17] = false;   countBeforeUpdate[17] = void 0;   canDoPost[17] = false;   canDoGet[17] = true ; 
    sArrayPaths[18]='/5/system/deviceid_encrypted';       updateAfterInit[18] = false;   countBeforeUpdate[18] = void 0;   canDoPost[18] = false;   canDoGet[18] = true ; 
    sArrayPaths[19]='/5/system/epgsource';                updateAfterInit[19] = true ;   countBeforeUpdate[19] =50;        canDoPost[19] = false;   canDoGet[19] = true ; 
    sArrayPaths[20]='/5/system/menulanguage';             updateAfterInit[20] = false;   countBeforeUpdate[20] = void 0;   canDoPost[20] = false;   canDoGet[20] = true ; 
    sArrayPaths[21]='/5/system/model_encrypted';          updateAfterInit[21] = false;   countBeforeUpdate[21] = void 0;   canDoPost[21] = false;   canDoGet[21] = true ; 
    sArrayPaths[22]='/5/system/name';                     updateAfterInit[22] = false;   countBeforeUpdate[22] = void 0;   canDoPost[22] = false;   canDoGet[22] = true ; 
    sArrayPaths[23]='/5/system/serialnumber_encrypted';   updateAfterInit[23] = false;   countBeforeUpdate[23] = void 0;   canDoPost[23] = false;   canDoGet[23] = true ; 
    sArrayPaths[24]='/5/system/timestamp';                updateAfterInit[24] = true ;   countBeforeUpdate[24] = 1;        canDoPost[24] = false;   canDoGet[24] = true ; 


    //Set defaults at init to the empty objects oDb
var oPropertyName = [''];
    oPropertyName[0]  = oDb;                                                                           
    oPropertyName[1]  = {"channelList":{"id":"alltv","version":"60"},"channel":{"name":"NPO 1 HD","preset":1,"ccid":1000147}};                                                                                     
    oPropertyName[2]  = {"layer1":{"bottom":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0}},"right":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"left":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"top":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0},"4":{"b":0,"g":0,"r":0},"5":{"b":0,"g":0,"r":0},"6":{"b":0,"g":0,"r":0},"7":{"b":0,"g":0,"r":0}}}};                                                                                       
    oPropertyName[3]  = {"speed":0,"colordelta":{"brightness":0,"saturation":0,"hue":0},"color":{"brightness":0,"saturation":0,"hue":0},"mode":"Default"};                                                                                       
    oPropertyName[4]  = {"layer1":{"bottom":{"1":{"b":0,"g":0,"r":0},"0":{"b":0,"g":0,"r":0}},"right":{"3":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"0":{"b":0,"g":0,"r":0}},"left":{"3":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"0":{"b":0,"g":0,"r":0}},"top":{"3":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"0":{"b":0,"g":0,"r":0},"7":{"b":0,"g":0,"r":0},"6":{"b":0,"g":0,"r":0},"5":{"b":0,"g":0,"r":0},"4":{"b":0,"g":0,"r":0}}}};                                                                                         
    oPropertyName[5]  = {"current":"internal"};                                                                                       
    oPropertyName[6]  = {"layer1":{"bottom":{"1":{"b":11,"g":11,"r":11},"0":{"b":11,"g":11,"r":11}},"right":{"3":{"b":11,"g":11,"r":11},"2":{"b":11,"g":11,"r":11},"1":{"b":11,"g":11,"r":11},"0":{"b":11,"g":11,"r":11}},"left":{"3":{"b":11,"g":11,"r":11},"2":{"b":11,"g":11,"r":11},"1":{"b":11,"g":11,"r":11},"0":{"b":11,"g":11,"r":11}},"top":{"3":{"b":11,"g":11,"r":11},"2":{"b":11,"g":11,"r":11},"1":{"b":11,"g":11,"r":11},"0":{"b":11,"g":11,"r":11},"7":{"b":11,"g":11,"r":11},"6":{"b":11,"g":11,"r":11},"5":{"b":11,"g":11,"r":11},"4":{"b":11,"g":11,"r":11}}}};                                                                                         
    oPropertyName[7]  = {"bottom":2,"left":4,"right":4,"top":8,"layers":"1"};                                                                                         
    oPropertyName[8] =  {"applications":[{"id":"com.google.tv.netflix.NetflixActivity-com.google.tv.netflix","order":4,"intent":{"action":"#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10200000;component=com.google.tv.netflix/.NetflixActivity;end","component":{"packageName":"com.google.tv.netflix","className":"com.google.tv.netflix.NetflixActivity"}},"label":"Netflix"}],"version":8048};
    oPropertyName[9]  = {"min":0,"current":19,"muted":false,"max":60};
    oPropertyName[10] = {"favoriteLists":[],"channelLists":[{"id":"alltv","version":"60"}]};
    oPropertyName[11] = {"data":"NA","level2":"Playstate","level3":"NA","level1":"WatchExtension"};                                                                               
    oPropertyName[12] = { "key": "Standby" };                                                                                   
    oPropertyName[13] = { "???": "???" };                                                                                       
    oPropertyName[14] = [{"wake-on-lan":"Disabled","type":"Wifi","id":"wifi0","mac":"30:10:B3:B0:85:65"},{"wake-on-lan":"Enabled","id":"eth0","mac":"1C:5A:6B:7D:80:77","type":"Ethernet","ip":"192.168.0.97"}];                                                                                       
    oPropertyName[15] = {"powerstate":"On"};                                                                                     
    oPropertyName[16] = {"serialnumber_encrypted":"REFLdnv9gJ0gYiTRQNhLhqPMg1PKCmmFnLP1dBxyto8=\n","nettvversion":"","name":"wlan tv","model_encrypted":"MJFQN6geXDOkNZckkoGiGAgBtfy2dy7GTQ2KLXDb2jY=\n","menulanguage":"Dutch","softwareversion_encrypted":"RJD3T\/+xj12AVwSce3ajLD4edK8B0u6Nl1ihtScwABI=\n","deviceid_encrypted":"Ss9acNv+yoJo9zuFWkYO0ZEma6KIqcKgJYObOOGCMIU=\n","country":"Netherlands"};                                                                               
    oPropertyName[17] = {"country":"Netherlands"};                                                                                       
    oPropertyName[18] = {"serialnumber_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"};                                                                                                   
    oPropertyName[19] = {"epgsource":"broadcast"};                                                                                       
    oPropertyName[20] = {"menulanguage":"Dutch"};                                                                                           
    oPropertyName[21] = {"model_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"};                                                                                               
    oPropertyName[22] = {"name":"wlan tv"};                                                                                   
    oPropertyName[23] = {"serialnumber_encrypted":"нєяєωιℓℓвєѕσмєєη¢яуρтє∂кєу"};                                                                                                       
    oPropertyName[24] = {"timestamp":"13842"};                                                                                       

        //Paths
    function PathsGetPosbyPath (path){
        for (var i = 1; i < sArrayPaths.length; i++) {
            if (sArrayPaths[i] === path){
                return i;
            }
        }
    };      //PathsGetPosbyPath('/5/audio/volume');

    function PathsGetValuebyPos (pos){
        if ( pos < sArrayPaths.length) {
              return sArrayPaths[pos];
        } else{
            console.log("ERROR PathsGetPathbyPos: Path is not in range")
        }
    };      //PathsGetValueByPos(1);

//require("./tv-cmd.js");

/***************************\
| Set/Get value to/from Odb |##########################################################################################################################################################################
|
|   Get: from JSON                        OdbValue( oPropertyPosition , 'get' , oPropertyValue )                      
|   Set: to Odb                           OdbValue( oPropertyPosition , 'set' , oPropertyValue )                  
|   Set: to Odb (without error check)     OdbValue( oPropertyPosition ,  null , oPropertyValue )                                          
|
\*****************************************************************************************************************************************************************************************************/
exports.OdbValue = function(pos,method,value){
        
    //Check method
    if (method == null) {
        //return console.log("Error: wrong method " + method );  //Use later to set the default
    } else if (pos > oPropertyName.length){
        return console.log("Error: item " + pos + " not available" );
    } else if (method == 'set' && !canDoPost[pos]){
        return console.log("Error: set is disabled for item " + pos );
    } else if (method == 'get' && !canDoGet[pos]){
        return console.log("Error: get is disabled for item " + pos );
    }

    //Get value
    if (method == 'get'){ return oPropertyName[pos] };

    //Set value
    if(method == 'set'){ return oPropertyName[pos] = JSON.parse(value) };

    //Set value without checks
    if(method == null){ return oPropertyName[pos] = JSON.parse(value) };

}




exports.SmartTvValuePost = function(path, jObj){

  // Set up the request
  var post_req = http.request(ConfigPostJSON(path,jObj), function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(JSON.stringify(jObj));
  post_req.end();
}



exports.GetJSONObjAsync = async function(path, pos){

    if ( (!pos && !path) || (pos && path) ){ 
            return console.log("Error: path: " + path + "  or  position: " + pos + "param error"); 

        } else if (!path){ path = 
            PathsGetValuebyPos(pos); 

        } else if (!pos){  
            pos = PathsGetPosbyPath(path);
    };

    var cache = ''; //this is where we store data, if its there   

    process.stdout.write(" > " + pos);
    //try { return req = await http.request(ConfigGetJSON(path)); // Make the request
    try { var req = await http.request(ConfigGetJSON(path)); // Make the request
            // Async start
            return new Promise(function (resolve, reject) { 
                req.on('response', function(res){ // when the response comes back
                    res.setEncoding('utf-8'); //
                    res.on('error', function(err){ reject(err); }); // when there is an error
                    res.on('data',  function(chunk){ cache += chunk; }); // concat chunks
                    res.on('end',   function(data){ if (!cache){ 
                                                        return reject('No data found!'); // when the response ends resolve promise and save value
                                                    } else { 
                                                        smarttv.OdbValue(pos,null,cache);
                                                        return resolve(cache); 
                                                        }                                      
                    });
                })
                req.end();  // end the request or .end();
            })
            // Async end
    } catch(error) { 
        console.log(error); }            //.catch(err => console.error(err))
    //    finally {
    //    if (cache){
    //        return cache;
    //        //Returning from a finally block, If the finally block returns a value, this value becomes the return value of the entire try-catch-finally production, regardless of any return statements in the try and catch blocks. This includes exceptions thrown inside of the catch block:
    //    }
    //    //return;
    //  }
};  //GetJSONObjAsync(sArrayPaths[9]).then(output => console.log(output))



exports.GetJSONObjAsyncAll = function(){
// Fetch new value from device when the check of updateAfterInit[X] and ( counter % countBeforeUpdate[X] ) is true,
    process.stdout.write(" Get value");
    for (var i = 1; i < sArrayPaths.length; i++) {
        if (updateAfterInit[i] && iCounter != undefined && ( iCounter % countBeforeUpdate[i] ) == 0) {
            smarttv.GetJSONObjAsync(PathsGetValuebyPos(i))
            .catch(err => console.error(err));
        }

        if(i == sArrayPaths.length - 1){
            process.stdout.write("   Done. ")
        }
    }
}



exports.GetJSONObjAsyncAllToDb = function(){
  //fs.writeFileSync( pathprivate + "./db-smarttv.json", JSON.stringify(smarttv.GetJSONObjAsyncAll()) );
  fs.writeFileSync( "./db-smarttv.json", JSON.stringify(oDb) , 'utf-8');
};


exports.OdbValueReset = function(pos,value){ OdbValue(pos,null,value) };
exports.OdbValueSet = function(pos,value){ OdbValue(pos,'set',value) };
exports.OdbValueGet = function(pos){ OdbValue(pos,'get') };

/***************************\
| PreDefined POST Functions |####################################################################################################################################################################
|
| Some predefined functions, without callback
|
\***********************************************************************************************************************************************************************************************/
exports.SmartTvValuePostAmbilightCached = function (){               smarttv.SmartTvValuePost(sArrayPaths[2] ,{"layer1":{"bottom":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0}},"right":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"left":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0}},"top":{"0":{"b":0,"g":0,"r":0},"1":{"b":0,"g":0,"r":0},"2":{"b":0,"g":0,"r":0},"3":{"b":0,"g":0,"r":0},"4":{"b":0,"g":0,"r":0},"5":{"b":0,"g":0,"r":0},"6":{"b":0,"g":0,"r":0},"7":{"b":0,"g":0,"r":0}}}}, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostAmbiLightLounge = function (){               smarttv.SmartTvValuePost(sArrayPaths[3] ,{"speed":0,"colordelta":{"brightness":0,"saturation":0,"hue":0},"color":{"brightness":0,"saturation":0,"hue":0},"mode":"Default"}, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostAmbiLightMode = function (){                 smarttv.SmartTvValuePost(sArrayPaths[5] ,{"current":"internal"}, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostAudioVolume = function (){                   smarttv.SmartTvValuePost(sArrayPaths[9] ,{"min":0,"current":20,"muted":true,"max":60}, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputPointer = function (){                  smarttv.SmartTvValuePost(sArrayPaths[11],{ "?????": "?????" }, function(callback){ console.log(callback) }); }   //????
exports.SmartTvValuePostInputKeyStandby = function (){               smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Standby" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyBack = function (){                  smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Back" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyFind = function (){                  smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Find" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyRedColour = function (){             smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "RedColour" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyGreenColour = function (){           smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "GreenColour" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyYellowColour = function (){          smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "YellowColour" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyBlueColour = function (){            smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "BlueColour" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyHome = function (){                  smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Home" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyVolumeUp = function (){              smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "VolumeUp" }); }
exports.SmartTvValuePostInputKeyVolumeDown = function (){            smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "VolumeDown" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyMute = function (){                  smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Mute"  }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyOptions = function (){               smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Options" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyDot = function (){                   smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Dot"    }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyDigit0 = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit0" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyDigit1 = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit1" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyDigit2 = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit2" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyDigit3 = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit3" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyDigit4 = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit4" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyDigit5 = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit5" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyDigit6 = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit6" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyDigit7 = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit7" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyDigit8 = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit8" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyDigit9 = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Digit9" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyInfo = function (){                  smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Info" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyCursorUp = function (){              smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "CursorUp" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyCursorDown = function (){            smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "CursorDown" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyCursorLeft = function (){            smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "CursorLeft" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyCursorRight = function (){           smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "CursorRight" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyConfirm = function (){               smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Confirm" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyNext = function (){                  smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Next" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyPrevious = function (){              smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Previous" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyAdjust = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Adjust" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyWatchTV = function (){               smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "WatchTV" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyViewmode = function (){              smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Viewmode" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyTeletext = function (){              smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Teletext" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeySubtitle = function (){              smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Subtitle" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyChannelStepUp = function (){         smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "ChannelStepUp" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyChannelStepDown = function (){       smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "ChannelStepDown" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeySource = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Source" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyAmbilightOnOff = function (){        smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "AmbilightOnOff" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyPlayPause = function (){             smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "PlayPause" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyPause = function (){                 smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Pause" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyFastForward = function (){           smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "FastForward" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyStop = function (){                  smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Stop" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyRewind = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Rewind" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyRecord = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Record" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostInputKeyOnline = function (){                smarttv.SmartTvValuePost(sArrayPaths[12],{ "key": "Online" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostPowerstateOn = function (){                  smarttv.SmartTvValuePost(sArrayPaths[15],{ "powerstate":"On" }, function(callback){ console.log(callback) }); }
exports.SmartTvValuePostPowerstateStandby = function (){             smarttv.SmartTvValuePost(sArrayPaths[15],{ "powerstate":"Standby" }, function(callback){ console.log(callback) }); }

/**************************\
| PreDefined GET Functions |#####################################################################################################################################################################
|
| Some predefined get functions, this function will return an object.
|
\***********************************************************************************************************************************************************************************************/
exports.returnActivitiesTv = function (){                         returnJSONObj(sArrayPaths[1] ,1 ); return Result[1] ; };
exports.returnAmbilightCached = function (){                      returnJSONObj(sArrayPaths[2] ,2 ); return Result[2] ; };
exports.returnAmbilightLounge = function (){                      returnJSONObj(sArrayPaths[3] ,3 ); return Result[3] ; };
exports.returnAmbilightMeasured = function (){                    returnJSONObj(sArrayPaths[4] ,4 ); return Result[4] ; };
exports.returnAmbilightMode = function (){                        returnJSONObj(sArrayPaths[5] ,5 ); return Result[5] ; };
exports.returnAmbilightProcessed = function (){                   returnJSONObj(sArrayPaths[6] ,6 ); return Result[6] ; };
exports.returnAmbilightTopology = function (){                    returnJSONObj(sArrayPaths[7] ,7 ); return Result[7] ; };
exports.returnApplications = function (){                         returnJSONObj(sArrayPaths[8] ,8 ); return Result[8] ; };
exports.returnAudioVolume = function (){                          returnJSONObj(sArrayPaths[9] ,9 ); return Result[9] ; };
exports.returnChanneldbTv = function (){                          returnJSONObj(sArrayPaths[10],10 ); return Result[10]; };
exports.returnContext = function (){                              returnJSONObj(sArrayPaths[11],11 ); return Result[11]; };
exports.returnNetworkDevices = function (){                       returnJSONObj(sArrayPaths[14],14 ); return Result[14]; };
exports.returnPowerstate = function (){                           returnJSONObj(sArrayPaths[15],15 ); return Result[15]; };
exports.returnSystem = function (){                               returnJSONObj(sArrayPaths[16],16 ); return Result[16]; };
exports.returnSystemCountry = function (){                        returnJSONObj(sArrayPaths[17],17 ); return Result[17]; };
exports.returnSystemDeviceIdEncrypted = function (){              returnJSONObj(sArrayPaths[18],18 ); return Result[18]; };
exports.returnSystemEpgsource = function (){                      returnJSONObj(sArrayPaths[19],19 ); return Result[19]; };
exports.returnSystemMenulanguage = function (){                   returnJSONObj(sArrayPaths[20],20 ); return Result[20]; };
exports.returnSystemModelEncrypted = function (){                 returnJSONObj(sArrayPaths[21],21 ); return Result[21]; };
exports.returnSystemName = function (){                           returnJSONObj(sArrayPaths[22],22 ); return Result[22]; };
exports.returnSystemSoftwareversionEncrypted = function (){       returnJSONObj(sArrayPaths[23],23 ); return Result[23]; };
exports.returnSystemSerialnumberEncrypted = function (){          returnJSONObj(sArrayPaths[24],24 ); return Result[24]; };
exports.returnSystemTimeStamp = function (){                      returnJSONObj(sArrayPaths[25],25 ); return Result[25]; };


/****************************\
| PreDefined GETALL Function |###############################################################################################################################################################################
|
| Returns an JSON db file with all available values included
|
\***********************************************************************************************************************************************************************************************************/
exports.returnJSONObjAllToDb = function(){
  fs.writeFileSync( pathprivate + "./db-tv.json", JSON.stringify(returnJSONObjAll()) );
};



//    setInterval(function(){ 
//    
//        process.stdout.write('\n' + iCounter++ + ": ");
//    
//        // Fetch new value from device when the check of updateAfterInit[X] and ( iCounter % countBeforeUpdate[X] ) is true,
//        smarttv.GetJSONObjAsyncAll();
//    
//        //    //Save all values at init and after some couter when WriteJSONFile is set to true.
//        //    if ( ( iCounter == 0 || (iCounter % 1000) == 0 ) && WriteJSONFile){
//        //        smarttv.GetJSONObjAsyncAllToDb();     //writes all content from Odb to file
//        //    }
//    
//    }, iTvUpdateInterval);





