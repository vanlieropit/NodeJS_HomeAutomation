/*********\
| General |######################################################################################################################################################################\
|                                                                                                                                                                                |
|     Situation:                # Function:                                                                                                                                      |
|    ###################################################                                                                                                                         |
|     Hue To Scriptvar          # getInfo, getInfoAll                                                                                                                            |
|     Scriptvar to Hue          # setInfo, setInfoAll                                                                                                                            |
|     From Hue                  # get[Variable]                                                                                                                                  |
|     To Hue                    # set[Variable]                                                                                                                                  |
|     return                                                                                                                                                                     |
|     return                                                                                                                                                                     |
|     From disk                 # loadInfo, loadInfoALL                                                                                                                          |
|     To disk                   # saveInfo, saveInfoAll                                                                                                                          |
|     From/To script            # not needed                                                                                                                                     |
|                                                                                                                                                                                |
*********************************************************************************************************************************************************************************/
debug = false;
_this = this;



/*********\
| getInfo |######################################################################################################################################################################\
|                                                                                                                                                                                |
| - get all attributes for 1 light, from hue to script-variables                                                                                                                 |
|                                                                                                                                                                                |
|  Example: light.getInfo(iLightNumber, Value)                                                                                                                                   |
|                                                                                                                                                                                |
\********************************************************************************************************************************************************************************/
exports.getInfo = function( iLightNumber,sValue){
  client.getLight( iLightNumber, function( err, result ){ 

    if ( err || result === undefined || result.state === undefined ){ return err;}

    //var fs = require('fs');
    //fs.writeFile(pathhue + "./json.txt", JSON.stringify(result), function(err) {
    //    if (err) {
    //        console.log(err);
    //    }
    //
    //});

     // var a = document.createElement("a");
     // var file = new Blob([result], {type: 'text/plain'});
     // a.href = URL.createObjectURL(file);
     // a.download = 'json.txt';
     // a.click();
    
     if ( typeof result.manufacturername !== undefined   ){ jArrayResults = result;  };     

    //General:
    if ( typeof result.manufacturername !== undefined   ){ sArrayLightManufacturerName[iLightNumber] = result.manufacturername;  };  // light.getManufacturerName( iLightNumber );     
    if ( typeof result.modelid !== undefined            ){ sArrayLightModelid[iLightNumber] = result.modelid;                    };  // light.getModelId( iLightNumber );              
    if ( typeof result.name !== undefined               ){ sArrayLightName[iLightNumber] = result.name;                          };  // light.getName( iLightNumber );                 
    if ( typeof result.swversion !== undefined          ){ sArrayLightSwversion[iLightNumber] = result.swversion;                };  // light.getSwVersion( iLightNumber );            
    if ( typeof result.type !== undefined               ){ sArrayLightType[iLightNumber] = result.type;                          };  // light.getType( iLightNumber );                 
    if ( typeof result.uniqueid !== undefined           ){ sArrayLightUniqueid[iLightNumber] = result.uniqueid;                  };  // light.getUniqueid( iLightNumber );             
                                                                                                                                            
    //State:                                                                                                  
    if ( typeof result.state.on !== undefined           ){ bArrayLightOn[iLightNumber] = result.state.on;                         };  //light.getOn( iLightNumber );       
    if ( typeof result.state.bri !== undefined          ){ iArrayLightBriCur[iLightNumber] = result.state.bri;                    };  //light.getBri( iLightNumber );      
    if ( typeof result.state.hue !== undefined          ){ iArrayLightHueCur[iLightNumber] = result.state.hue;                    };  //light.getHue( iLightNumber );      
    if ( typeof result.state.sat !== undefined          ){ iArrayLightSatCur[iLightNumber] = result.state.sat;                    };  //light.getSat( iLightNumber );      
    if ( typeof result.state.effect !== undefined       ){ sArrayLightEffect[iLightNumber] = result.state.effect;                 };  //light.getEffect( iLightNumber );   
    if ( typeof result.state.xy !== undefined           ){ fArrayLightXyCur[iLightNumber] = result.state.xy;                      };  //light.getXy( iLightNumber );       
    if ( typeof result.state.xy[0] !== undefined        ){ fArrayLightXyXCur[iLightNumber] = result.state.xy[0];                  };  //light.getXyX( iLightNumber );      
    if ( typeof result.state.xy[1] !== undefined        ){ fArrayLightXyYCur[iLightNumber] = result.state.xy[1];                  };  //light.getXyY( iLightNumber );      
    if ( typeof result.state.ct !== undefined           ){ iArrayLightCtCur[iLightNumber] = result.state.ct;                      };  //light.getCt( iLightNumber );       
    if ( typeof result.state.alert !== undefined        ){ sArrayLightAlert[iLightNumber] = result.state.alert;                   };  //light.getAlert( iLightNumber );    
    if ( typeof result.state.colormode !== undefined    ){ sArrayLightColorMode[iLightNumber] = result.state.colormode;           };  //light.getColormode( iLightNumber );
    if ( typeof result.state.reachable !== undefined    ){ bArrayLightReachable[iLightNumber] = result.state.reachable;           };  //light.getReachable( iLightNumber );
  });
};



/***************\
| getInfo - ALL |################################################################################################################################################################\
|                                                                                                                                                                                |
| - get all attributes for all lights from hue to script-variables                                                                                                               |
|                                                                                                                                                                                |
|  Example: light.getInfoAll()                                                                                                                                                   |
|                                                                                                                                                                                |
\********************************************************************************************************************************************************************************/
exports.getInfoAll = function(){
  //process.stdout.write('\n' + " Fetch Light Info...");
  var x = 1;
  getInfoAllDo();

  function getInfoAllDo(){
    if ( x > iArrayLightConnected.length ){ return; }
    light.getInfo(iArrayLightConnected[x++]);
    setTimeout(getInfoAllDo, 10);
  }
}



/*********\
| setInfo |######################################################################################################################################################################\
|                                                                                                                                                                                |
| - sets all attributes from 1 light from script-variables to hue                                                                                                                |
|                                                                                                                                                                                |
|  Example: sensor.setInfo( iSensorNumber,sValue )                                                                                                                               |
|                                                                                                                                                                                |
\********************************************************************************************************************************************************************************/
exports.setInfo = function( iLightNumber,sValue ){
  client.setLight( iLightNumber, function( err, result ){
  
    if ( err || result === undefined || result.state === undefined ){ return err;}
    
    //State: 
    if ( bArrayLightOn[iLightNumber]              !== undefined ){   client.setLightState( iLightNumber, { "on": bArrayLightOn[iLightNumber] },                          function( err, result ){ if ( err ){ return err; } /**/ }); };
    if ( iArrayLightBriCur[iLightNumber]          !== undefined ){   client.setLightState( iLightNumber, { "bri": iArrayLightBriCur[iLightNumber] },                     function( err, result ){ if ( err ){ return err; } /**/ }); };             
    if ( iArrayLightHueCur[iLightNumber]          !== undefined ){   client.setLightState( iLightNumber, { "hue": iArrayLightHueCur[iLightNumber] },                     function( err, result ){ if ( err ){ return err; } /**/ }); };             
    if ( iArrayLightSatCur[iLightNumber]          !== undefined ){   client.setLightState( iLightNumber, { "sat": iArrayLightSatCur[iLightNumber] },                     function( err, result ){ if ( err ){ return err; } /**/ }); };             
    if ( sArrayLightEffect[iLightNumber]          !== undefined ){   client.setLightState( iLightNumber, { "effect": sArrayLightEffect[iLightNumber] },                  function( err, result ){ if ( err ){ return err; } /**/ }); };          
    if ( fArrayLightXyCur[iLightNumber]           !== undefined ){   client.setLightState( iLightNumber, { "xy": fArrayLightXyCur[iLightNumber] },                       function( err, result ){ if ( err ){ return err; } /**/ }); };     
    if ( fArrayLightXyXCur[iLightNumber]          !== undefined ){   client.setLightState( iLightNumber, { "xy[0]": fArrayLightXyXCur[iLightNumber] },                   function( err, result ){ if ( err ){ return err; } /**/ }); };         
    if ( fArrayLightXyYCur[iLightNumber]          !== undefined ){   client.setLightState( iLightNumber, { "xy[1]": fArrayLightXyYCur[iLightNumber] },                   function( err, result ){ if ( err ){ return err; } /**/ }); };         
    if ( iArrayLightCtCur[iLightNumber]           !== undefined ){   client.setLightState( iLightNumber, { "ct": iArrayLightCtCur[iLightNumber] },                       function( err, result ){ if ( err ){ return err; } /**/ }); };     
    if ( sArrayLightAlert[iLightNumber]           !== undefined ){   client.setLightState( iLightNumber, { "alert": sArrayLightAlert[iLightNumber] },                    function( err, result ){ if ( err ){ return err; } /**/ }); };        
    if ( sArrayLightColorMode[iLightNumber]       !== undefined ){   client.setLightState( iLightNumber, { "colormode": sArrayLightColorMode[iLightNumber] },            function( err, result ){ if ( err ){ return err; } /**/ }); };
    if ( bArrayLightReachable[iLightNumber]       !== undefined ){   client.setLightState( iLightNumber, { "reachable": bArrayLightReachable[iLightNumber] },            function( err, result ){ if ( err ){ return err; } /**/ }); };  
    if ( iArrayLightTransitionTime[iLightNumber]  !== undefined ){   client.setLightState( iLightNumber, { "transitiontime": iArrayLightTransitionTime[iLightNumber] },  function( err, result ){ if ( err ){ return err; } /**/ }); };

  });
};



/***************\
| setInfo - ALL |################################################################################################################################################################\
|                                                                                                                                                                                |
| - sets all attributes for all lights from script-variables to hue                                                                                                              |
|                                                                                                                                                                                |
|  Example: light.setInfoAll()                                                                                                                                                   |
|                                                                                                                                                                                |
\********************************************************************************************************************************************************************************/
exports.setInfoAll = function(){
  //process.stdout.write('\n' + " Push Light Info...");
  var x = 1;
  setInfoAllDo();

  function setInfoAllDo(){
    if ( x > iArrayLightConnected.length ){ return; }
    light.setInfo(iArrayLightConnected[x++]);
    setTimeout(setInfoAllDo, 10);
  }
}



/**********\
| getValue |#####################################################################################################################################################################\
|                                                                                                                                                                                |
| - get attribute from a single light                                                                                                                                            |
|                                                                                                                                                                                |
|  Examples: light.getManufacturerName('1', function(callback){ console.log(callback); });                                                                                       |                                                                                              
|            light.getModelId('1', function(callback){ console.log(callback); });                                                                                                |                                                                                                                                                                                
|            light.getName('1', function(callback){ console.log(callback); });                                                                                                   |                                                                                  
|            light.getSwVersion('1', function(callback){ console.log(callback); });                                                                                              |                                                                                       
|            light.getType('1', function(callback){ console.log(callback); });                                                                                                   |                                                                                  
|            light.getUniqueid('1', function(callback){ console.log(callback); });                                                                                               |                                                                                      
|            light.getOn('1', function(callback){ console.log(callback); });                                                                                                     |                                                                                
|            light.getBri('1', function(callback){ console.log(callback); });                                                                                                    |                                                                                 
|            light.getHue('1', function(callback){ console.log(callback); });                                                                                                    |                                                                                 
|            light.getSat('1', function(callback){ console.log(callback); });                                                                                                    |                                                                                 
|            light.getEffect('1', function(callback){ console.log(callback); });                                                                                                 |                                                                                    
|            light.getXy('1', function(callback){ console.log(callback); });                                                                                                     |                                                                                
|            light.getXyX('1', function(callback){ console.log(callback); });                                                                                                    |                                                                                 
|            light.getXyY('1', function(callback){ console.log(callback); });                                                                                                    |                                                                                 
|            light.getCt('1', function(callback){ console.log(callback); });                                                                                                     |                                                                                
|            light.getAlert('1', function(callback){ console.log(callback); });                                                                                                  |                                                                                                                                                                                                                                                                         
|            light.getColormode('1', function(callback){ console.log(callback); });                                                                                              |                                                                                       
|            light.getReachable('1', function(callback){ console.log(callback); });                                                                                              |                                                                                       
|                                                                                                                                                                                |
\********************************************************************************************************************************************************************************/
exports.getManufacturerName = function(iLightNumber,cb){      client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.manufacturername === undefined      ){ return err; } oHueStateCur.result.manufacturername     = result.manufacturername;    /**/ cb(result.manufacturername);     }); };
exports.getModelId = function (iLightNumber,cb){              client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.modelid === undefined               ){ return err; } oHueStateCur.result.modelid              = result.modelid;                      /**/ cb(result.modelid);              }); };
exports.getName = function (iLightNumber,cb){                 client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.name === undefined                  ){ return err; } oHueStateCur.result.name                 = result.name;                            /**/ cb(result.name);                 }); };
exports.getSwVersion = function (iLightNumber,cb){            client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.swversion === undefined             ){ return err; } oHueStateCur.result.swversion            = result.swversion;                  /**/ cb(result.swversion);            }); };
exports.getType = function (iLightNumber,cb){                 client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.type === undefined                  ){ return err; } oHueStateCur.result.type                 = result.type;                            /**/ cb(result.type);                 }); };
exports.getUniqueid = function (iLightNumber,cb){             client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.uniqueid === undefined              ){ return err; } oHueStateCur.result.uniqueid             = result.uniqueid;                    /**/ cb(result.uniqueid);             }); };
//exports.getOn = function(iLightNumber,cb){                    client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.on === undefined              ){ return err; } oHueStateCur.result.state.on             = result.state.on;                          /**/ cb(result.state.on);             }); };
exports.getBri = function(iLightNumber,cb){                   client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.bri === undefined             ){ return err; } oHueStateCur.result.state.bri            = result.state.bri;                     /**/ cb(result.state.bri);            }); };
exports.getHue = function (iLightNumber,cb){                  client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.hue === undefined             ){ return err; } oHueStateCur.result.state.hue            = result.state.hue;                     /**/ cb(result.state.hue);            }); };
exports.getSat = function (iLightNumber,cb){                  client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.sat === undefined             ){ return err; } oHueStateCur.result.state.sat            = result.state.sat;                     /**/ cb(result.state.sat);            }); };
exports.getEffect = function (iLightNumber,cb){               client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.effect === undefined          ){ return err; } oHueStateCur.result.state.effect         = result.state.effect;                  /**/ cb(result.state.effect);         }); };
exports.getXy = function (iLightNumber,cb){                   client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.xy === undefined              ){ return err; } oHueStateCur.result.state.xy             = result.state.xy;                       /**/ cb(result.state.xy);             }); };
exports.getXyX = function (iLightNumber,cb){                  client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.xy[0] === undefined           ){ return err; } oHueStateCur.result.state.xy[0]          = result.state.xy[0];                   /**/ cb(result.state.xy[0]);            }); };
exports.getXyY = function (iLightNumber,cb){                  client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.xy[1] === undefined           ){ return err; } oHueStateCur.result.state.xy[1]          = result.state.xy[1];                   /**/ cb(result.state.xy[1]);            }); };
exports.getCt = function (iLightNumber,cb){                   client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.ct === undefined              ){ return err; } oHueStateCur.result.state.ct             = result.state.ct;                       /**/ cb(result.state.ct);             }); };
exports.getAlert = function (iLightNumber,cb){                client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.alert === undefined           ){ return err; } oHueStateCur.result.state.alert          = result.state.alert;                    /**/ cb(result.state.alert);          }); };
exports.getColormode = function (iLightNumber,cb){            client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.colormode === undefined       ){ return err; } oHueStateCur.result.state.colormode      = result.state.colormode;            /**/ cb(result.state.colormode);      }); };
exports.getReachable = function (iLightNumber,cb){            client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.reachable === undefined       ){ return err; } oHueStateCur.result.state.reachable      = result.state.reachable;            /**/ cb(result.state.reachable);      }); };
exports.getTransisitonTime = function (iLightNumber,cb){      client.get('/lights/' + iLightNumber + '/', function (err, result) { if ( err || typeof result.state.transitiontime === undefined  ){ return err; } oHueStateCur.result.state.transitiontime = result.state.transitiontime;  /**/ cb(result.state.transitiontime); }); };

exports.getOn = function(iLightNumber,callback){
    client.get('/lights/' + iLightNumber + '/', function (err, result) { 
        if ( err || typeof result === undefined  ){ 
            return err; 
        };
        oHueStateNew = oHueStateCur;
        oHueStateNew.lights[iLightNumber].state.on;
    });
}




/**********\
| setValue |#####################################################################################################################################################################\
|                                                                                                                                                                                |
| - set attribute from a single light                                                                                                                                            |
|                                                                                                                                                                                |
|  Example:                                                                                                                                                                      |
|                                                                                                                                                                                |
\********************************************************************************************************************************************************************************/
exports.setOn = function( iLightNumber,bValue){             client.setLightState( iLightNumber, { "on": bValue },                    function( err, result ){ if ( err ){ return err; }; console.log(iLightNumber + "<--->" + bValue);/**/ }); };     // true/false
exports.setOff = function( iLightNumber ){                  client.setLightState( iLightNumber, { "on": false },                     function( err, result ){ if ( err ){ return err; }; /**/ }); };     // none                          
exports.setBri = function( iLightNumber,iValue){            client.setLightState( iLightNumber, { "bri": iValue },                   function( err, result ){ if ( err ){ return err; }; /**/ }); };     // 0-254
exports.setBriDec = function( iLightNumber,iValue){         client.setLightState( iLightNumber, { "bri_inc": -iValue },              function( err, result ){ if ( err ){ return err; }; /**/ }); };     // 0-254
exports.setBriInc = function( iLightNumber,iValue){         client.setLightState( iLightNumber, { "bri_inc": iValue },               function( err, result ){ if ( err ){ return err; }; /**/ }); };     // 0-254
exports.setHue = function( iLightNumber,iValue){            client.setLightState( iLightNumber, { "hue": iValue },                   function( err, result ){ if ( err ){ return err; }; /**/ }); };     // 0-254
exports.setHueDec = function( iLightNumber,iValue){         client.setLightState( iLightNumber, { "hue_inc": -iValue },              function( err, result ){ if ( err ){ return err; }; /**/ }); };     // 0-254
exports.setHueInc = function( iLightNumber,iValue){         client.setLightState( iLightNumber, { "hue_inc": iValue },               function( err, result ){ if ( err ){ return err; }; /**/ }); };     // 0-254
exports.setSat = function( iLightNumber,iValue){            client.setLightState( iLightNumber, { "sat": iValue },                   function( err, result ){ if ( err ){ return err; }; /**/ }); };     // 0-254
exports.setSatDec = function( iLightNumber,iValue){         client.setLightState( iLightNumber, { "sat_inc": -iValue },              function( err, result ){ if ( err ){ return err; }; /**/ }); };     // 0-254
exports.setSatInc = function( iLightNumber,iValue){         client.setLightState( iLightNumber, { "sat_inc": iValue },               function( err, result ){ if ( err ){ return err; }; /**/ }); };     // 0-254
exports.setEffect = function( iLightNumber,sValue){         client.setLightState( iLightNumber, { "effect": sValue },                function( err, result ){ if ( err ){ return err; }; /**/ }); };     // "none","colorloop"
exports.setXy = function( iLightNumber,fValue1,fValue2){    client.setLightState( iLightNumber, { "xy": [fValue1, fValue2] },        function( err, result ){ if ( err ){ return err; }; /**/ }); };     // [0-1,0-1]
exports.setXyDec = function( iLightNumber,fValue){          client.setLightState( iLightNumber, { "xy_inc": [-fValue, -fValue] },    function( err, result ){ if ( err ){ return err; }; /**/ }); };     // 0-1
exports.setXyInc = function( iLightNumber,fValue){          client.setLightState( iLightNumber, { "xy_inc": [fValue, fValue] },      function( err, result ){ if ( err ){ return err; }; /**/ }); };     // 0-1
exports.setCt = function( iLightNumber,iValue){             client.setLightState( iLightNumber, { "ct": iValue },                    function( err, result ){ if ( err ){ return err; }; /**/ }); };     // 0-254
exports.setAlert = function( iLightNumber,sValue){          client.setLightState( iLightNumber, { "alert": sValue },                 function( err, result ){ if ( err ){ return err; }; /**/ }); };     // "none","select","lselect" - till alert command is taken, The light is not performing an alert effect or The light is performing one breathe cycle, or “lselect” – The light is performing breathe cycles for 15 seconds or until an "alert": "none" command is received.
exports.setAlertNone = function( iLightNumber ){            client.setLightState( iLightNumber, { "alert": `none` },                 function( err, result ){ if ( err ){ return err; }; /**/ }); };     // none
exports.setAlertSelect = function( iLightNumber ){          client.setLightState( iLightNumber, { "alert": `select` },               function( err, result ){ if ( err ){ return err; }; /**/ }); };     // none
exports.setAlertLSelect = function( iLightNumber ){         client.setLightState( iLightNumber, { "alert": `lselect` },              function( err, result ){ if ( err ){ return err; }; /**/ }); };     // none
exports.setColormode = function( iLightNumber,sValue){      client.setLightState( iLightNumber, { "colormode": sValue },             function( err, result ){ if ( err ){ return err; }; /**/ }); };     // hs, ct, 
exports.setReachable = function( iLightNumber,bValue){      client.setLightState( iLightNumber, { "reachable": bValue },             function( err, result ){ if ( err ){ return err; }; /**/ }); };     // true/false
exports.setTransitionTime = function( iLightNumber,iValue){ client.setLightState( iLightNumber, { "transitiontime": iValue },        function( err, result ){ if ( err ){ return err; }; /**/ }); };     // a multiple of 100 milliseconds, e.g. 4 means 400ms



/**********\
| loadInfo |#####################################################################################################################################################################\
|                                                                                                                                                                                |
| - load variables from 1 light from disk                                                                                                                                        |
|                                                                                                                                                                                |
| Example: light.loadInfo(iLightNumber)                                                                                                                                          |
|                                                                                                                                                                                |
\********************************************************************************************************************************************************************************/
exports.loadInfo = function(iLightNumber){
  //if (!fs.existsSync(pathhuelightvalues + iLightNumber + "/state"))
  var path;

  path = pathhuelightvalues + iLightNumber + "/manufacturername"    ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ sArrayLightManufacturerName[iLightNumber] = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/modelid"             ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ sArrayLightModelid[iLightNumber]          = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/name"                ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ sArrayLightName[iLightNumber]             = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/swversion"           ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ sArrayLightSwversion[iLightNumber]        = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/type"                ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ sArrayLightType[iLightNumber]             = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/uniqueid"            ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ sArrayLightUniqueid[iLightNumber]         = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/on"            ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ bArrayLightOn[iLightNumber]               = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/bri"           ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ iArrayLightBriCur[iLightNumber]           = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/hue"           ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ iArrayLightHueCur[iLightNumber]           = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/sat"           ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ iArrayLightSatCur[iLightNumber]           = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/effect"        ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ sArrayLightEffect[iLightNumber]           = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/xy"            ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ fArrayLightXyCur[iLightNumber]            = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/x"             ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ fArrayLightXyXCur[iLightNumber]           = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/y"             ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ fArrayLightXyYCur[iLightNumber]           = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/ct"            ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ iArrayLightCtCur[iLightNumber]            = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/alert"         ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ sArrayLightAlert[iLightNumber]            = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/colormode"     ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ sArrayLightColorMode[iLightNumber]        = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/reachable"     ; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ bArrayLightReachable[iLightNumber]        = data; /**/ }; }); };
  path = pathhuelightvalues + iLightNumber + "/state/transitiontime"; if ( fs.existsSync( path ) ){ fs.readFile( path , function read(err, data) { if(err) { return console.log(err); }   if( data !== undefined){ iArrayLightTransitionTime[iLightNumber]   = data; /**/ }; }); };
  
};



/****************\
| loadInfo - All |###############################################################################################################################################################\
|                                                                                                                                                                                |
| - loads all variables from all lights from disk                                                                                                                                |
|                                                                                                                                                                                |
| Example: light.loadInfoAll()                                                                                                                                                   |
|                                                                                                                                                                                |
\********************************************************************************************************************************************************************************/
exports.loadInfoAll = function(){
  //process.stdout.write('\n' + " Push Light Info...");
  var x = 1;
  loadInfoAllDo();

  function loadInfoAllDo(){
    if ( x > iArrayLightConnected.length ){ return; }
    light.loadInfo(iArrayLightConnected[x++]);
    setTimeout(loadInfoAllDo, 10);
  }
}



/**********\
| saveInfo |#####################################################################################################################################################################\
|                                                                                                                                                                                |
| - saves variables from 1 light from disk                                                                                                                                       |
|                                                                                                                                                                                |
| Example: light.saveInfo(iLightNumber)                                                                                                                                          |
|                                                                                                                                                                                |
\********************************************************************************************************************************************************************************/
exports.saveInfo = function(iLightNumber){

  if (!fs.existsSync(pathhuelightvalues + iLightNumber + "/state")) { exec("/bin/mkdir -p " + pathhuelightvalues + iLightNumber + "/state" ); };
  if ( sArrayLightManufacturerName[iLightNumber] !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/manufacturername",       sArrayLightManufacturerName[iLightNumber] , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( sArrayLightModelid[iLightNumber]          !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/modelid",                sArrayLightModelid[iLightNumber]          , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( sArrayLightName[iLightNumber]             !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/name",                   sArrayLightName[iLightNumber]             , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( sArrayLightSwversion[iLightNumber]        !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/swversion",              sArrayLightSwversion[iLightNumber]        , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( sArrayLightType[iLightNumber]             !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/type",                   sArrayLightType[iLightNumber]             , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( sArrayLightUniqueid[iLightNumber]         !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/uniqueid",               sArrayLightUniqueid[iLightNumber]         , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( bArrayLightOn[iLightNumber]               !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/on",               bArrayLightOn[iLightNumber]               , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( iArrayLightBriCur[iLightNumber]           !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/bri",              iArrayLightBriCur[iLightNumber]           , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( iArrayLightHueCur[iLightNumber]           !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/hue",              iArrayLightHueCur[iLightNumber]           , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( iArrayLightSatCur[iLightNumber]           !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/sat",              iArrayLightSatCur[iLightNumber]           , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( sArrayLightEffect[iLightNumber]           !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/effect",           sArrayLightEffect[iLightNumber]           , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( fArrayLightXyCur[iLightNumber]            !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/xy",               fArrayLightXyCur[iLightNumber]            , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( fArrayLightXyXCur[iLightNumber]           !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/x",                fArrayLightXyXCur[iLightNumber]           , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( fArrayLightXyYCur[iLightNumber]           !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/y",                fArrayLightXyYCur[iLightNumber]           , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( iArrayLightCtCur[iLightNumber]            !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/ct",               iArrayLightCtCur[iLightNumber]            , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( sArrayLightAlert[iLightNumber]            !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/alert",            sArrayLightAlert[iLightNumber]            , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( sArrayLightColorMode[iLightNumber]        !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/colormode",        sArrayLightColorMode[iLightNumber]        , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( bArrayLightReachable[iLightNumber]        !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/reachable",        bArrayLightReachable[iLightNumber]        , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
  if ( iArrayLightTransitionTime[iLightNumber]   !== undefined ){ fs.writeFile( pathhuelightvalues + iLightNumber + "/state/transitiontime",   iArrayLightTransitionTime[iLightNumber]   , function(err) { if(err) { return console.log(err); }; /**/ }); }; 
};



/***************\
| setInfo - All |################################################################################################################################################################\
|                                                                                                                                                                                |
| - saves all variables from all lights to disk                                                                                                                                  |
|                                                                                                                                                                                |
| Example: light.saveInfoAll()                                                                                                                                                   |
|                                                                                                                                                                                |
\********************************************************************************************************************************************************************************/
exports.saveInfoAll = function(){
  //process.stdout.write('\n' + " Fetch Light Info...");
  var x = 1;
  saveInfoAllDo();

  function saveInfoAllDo(){
    if ( x > iArrayLightConnected.length ){ return; }
    light.saveInfo(iArrayLightConnected[x++]);
    setTimeout(saveInfoAllDo, 10);
  }
}
