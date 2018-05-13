
//var server;


/***************\
| NodeJS Server |###############################################################################################################################################################################
\***************/

server = http.createServer(function(req, res){
  console.log("Client connected");
  var bDoPageRefresh = false;

  //var htmlScript = fs.readFileSync( pathconfigvar + './db.var', "UTF8", function(err, data){  });
    // your normal server code
    var path = url.parse(req.url).pathname;

    //Register listener
    //var varArray      = fs.readFileSync(pathconfigvarsrc + "./db.arrays", 'UTF8').replace(/\n/g,'').split("\r").map(x => '\n' + 'socket.on( ' + x + ',function(data){ AddTableCollumn(data, ' + x + ' ); }););';

    var varArray      = fs.readFileSync(pathconfigvarsrc + "./db.arrays", 'UTF8').replace(/\n/g,'').split("\r").map(x => '\n' + 'socket.on( \'' + x + '\',function(data){ AddTableCollumn(data, \'' + x + '\' ); }););');
   
    
    //var varString     = fs.readFileSync(pathconfigvar + "./db.strings", 'UTF8').replace(/\n/g,'').split("\r").map(x => '\n' + x +  " = '';");
    console.log(pathpublic);
    switch (path){
        case '/':
            fs.readFile( pathpublic + './index.html', function(err, data){
              if (err){ return send404(res); };
              res.writeHead(200, {'Content-type': 'text/html'}); 
             //   res.write("<script>" + '\n' + htmlScript +  '\n' + "</script>" +  '\n');


             //Register listener
//                res.write("<script>", 'utf8');
//                for ( x = 0; varArray.length > x; x++ ){
//                    res.write(varArray[x]);
//                };
//                res.write("</script>", 'utf8');
                res.write(data, 'utf8');
                console.log(varArray[1]);
              res.end();
            });
            break;
        case '/test.html':
            fs.readFile( pathpublic + __dirname, function(err, data){
                if (err){ return send404(res); };
                res.writeHead(200, {'Content-type': 'text/html'});
                res.write(data, 'utf8');
                res.end();
            });
          break;

        //Run functions by call the url  
        case '/volup'  :   if (err){ return send404(res); }; volumeup();  bDoPageRefresh = true; 
          break;
        case '/voldown':   if (err){ return send404(res); }; volumeup();  bDoPageRefresh = true; 
          break;

        default: send404(res);

    }
    if (bDoPageRefresh){  // For all actions without a page
        fs.readFile(pathpublic + './index.html', function(err, data){
            if (err){ return send404(res); }
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(data, 'utf8'); res.end();
        });
    }
}),

//    http.createServer(function (req, res) {
//      var html = buildHtml(req);
//    
//      res.writeHead(200, {
//        'Content-Type': 'text/html',
//        'Content-Length': html.length,
//        'Expires': new Date().toUTCString()
//      });
//      res.end(html);
//    }).listen(8080);
//    
//    function buildHtml(req) {
//      var header = '';
//      var body = '';
//      var script = '';
//    
//      fs.readFile( pathpublic + 'index.html', function(err, data){
//          script = data;
//    });
//    
//    
//      // concatenate header string
//      // concatenate body string
//    
//      return '<!DOCTYPE html>'
//           + '<html><header>' + header + '</header><body>' + body + '</body></html>';
//    };







send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(80);





// use socket.io
var io = require('socket.io').listen(server);

  //turn off debug
  //io.set('log level', 0);

  // define interactions with client
  io.sockets.on('connection', function(socket){



      // █████╗ ██╗   ██╗██████╗ 
      //██╔══██╗██║   ██║██╔══██╗
      //███████║██║   ██║██████╔╝
      //██╔══██║╚██╗ ██╔╝██╔══██╗
      //██║  ██║ ╚████╔╝ ██║  ██║
      //╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝
      //Listen avr module
      // Will do something when its get triggerd by emitter
      socket.on('power-off'       , function(data){ avr.SendCommand('power-off'                                      ); });
      socket.on('power-on'        , function(data){ avr.SendCommand('power-on'                                       ); });
      socket.on('mute-toggle'     , function(data){ avr.SendCommand('mute-toggle'                                    ); });
      socket.on('mute-on'         , function(data){ avr.SendCommand('mute-on'                                        ); });
      socket.on('mute-off'        , function(data){ avr.SendCommand('mute-off'                                       ); });
      socket.on('volume-down'     , function(data){ avr.SendCommand('volume-down'                                    ); });
      socket.on('volume-up'       , function(data){ avr.SendCommand('volume-up'                                      ); });
      socket.on('ok'              , function(data){ avr.SendCommand('ok'                                             ); });
      socket.on('home'            , function(data){ avr.SendCommand('home'                                           ); });
      socket.on('options'         , function(data){ avr.SendCommand('options'                                        ); });
      socket.on('down'            , function(data){ avr.SendCommand('down'                                           ); });
      socket.on('up'              , function(data){ avr.SendCommand('up'                                             ); });
      socket.on('left'            , function(data){ avr.SendCommand('left'                                           ); });
      socket.on('right'           , function(data){ avr.SendCommand('right'                                          ); });
      socket.on('back'            , function(data){ avr.SendCommand('back'                                           ); });
      socket.on('forward'         , function(data){ avr.SendCommand('forward'                                        ); });
      socket.on('pause'           , function(data){ avr.SendCommand('pause'                                          ); });
      socket.on('play'            , function(data){ avr.SendCommand('play'                                           ); });
      socket.on('next'            , function(data){ avr.SendCommand('next'                                           ); });
      socket.on('previous'        , function(data){ avr.SendCommand('previous'                                       ); });
      socket.on('sleep'           , function(data){ avr.SendCommand('sleep'                                          ); });
      socket.on('delay'           , function(data){ avr.SendCommand('delay'                                          ); });
      socket.on('channel-up'      , function(data){ avr.SendCommand('channel-up'                                     ); });
      socket.on('channel-down'    , function(data){ avr.SendCommand('channel-down'                                   ); });
      socket.on('tuner-up'        , function(data){ avr.SendCommand('tuner-up'                                       ); });
      socket.on('tuner-down'      , function(data){ avr.SendCommand('tuner-down'                                     ); });
      socket.on('AUX'             , function(data){ avr.SendCommand('source-selection', undefined, 'AUX'             ); });
      socket.on('TV'              , function(data){ avr.SendCommand('source-selection', undefined, 'TV'              ); });
      socket.on('Cable Sat'       , function(data){ avr.SendCommand('source-selection', undefined, 'Cable Sat'       ); });
      socket.on('STB'             , function(data){ avr.SendCommand('source-selection', undefined, 'STB'             ); });
      socket.on('Radio'           , function(data){ avr.SendCommand('source-selection', undefined, 'Radio'           ); });
      socket.on('Game'            , function(data){ avr.SendCommand('source-selection', undefined, 'Game'            ); });
      socket.on('USB'             , function(data){ avr.SendCommand('source-selection', undefined, 'USB'             ); });
      socket.on('Disc'            , function(data){ avr.SendCommand('source-selection', undefined, 'Disc'            ); });
      socket.on('Media Server'    , function(data){ avr.SendCommand('source-selection', undefined, 'Media Server'    ); });
      socket.on('Home Network'    , function(data){ avr.SendCommand('source-selection', undefined, 'Home Network'    ); });
      socket.on('AM'              , function(data){ avr.SendCommand('source-selection', undefined, 'AM'              ); });
      socket.on('FM'              , function(data){ avr.SendCommand('source-selection', undefined, 'FM'              ); });
      socket.on('vTuner'          , function(data){ avr.SendCommand('source-selection', undefined, 'vTuner'          ); });
      socket.on('Bluetooth'       , function(data){ avr.SendCommand('source-selection', undefined, 'Bluetooth'       ); });
      //socket.on('iPod'            , function(data){ avr.SendCommand('source-selection', undefined, 'iPod'            ); });
      //socket.on('Spotify'         , function(data){ avr.SendCommand('source-selection', undefined, 'Spotify'         ); });





      //███████╗███╗   ███╗ █████╗ ██████╗ ████████╗████████╗██╗   ██╗
      //██╔════╝████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝╚══██╔══╝██║   ██║
      //███████╗██╔████╔██║███████║██████╔╝   ██║      ██║   ██║   ██║
      //╚════██║██║╚██╔╝██║██╔══██║██╔══██╗   ██║      ██║   ╚██╗ ██╔╝
      //███████║██║ ╚═╝ ██║██║  ██║██║  ██║   ██║      ██║    ╚████╔╝ 
      //╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝     ╚═══╝  
      socket.on('SmartTvValuePostAmbilightCached'        , function(data){ smarttv.SmartTvValuePostAmbilightCached()        ; });
      socket.on('SmartTvValuePostAmbiLightLounge'        , function(data){ smarttv.SmartTvValuePostAmbiLightLounge()        ; });
      socket.on('SmartTvValuePostAmbiLightMode'          , function(data){ smarttv.SmartTvValuePostAmbiLightMode()          ; });
      socket.on('SmartTvValuePostAudioVolume'            , function(data){ smarttv.SmartTvValuePostAudioVolume()            ; });
      socket.on('SmartTvValuePostInputPointer'           , function(data){ smarttv.SmartTvValuePostInputPointer()           ; });


      socket.on('SmartTvValuePostInputKeyStandby'        , function(data){ smarttv.SmartTvValuePostInputKeyStandby()        ; });
      socket.on('SmartTvValuePostInputKeyBack'           , function(data){ smarttv.SmartTvValuePostInputKeyBack()           ; });
      socket.on('SmartTvValuePostInputKeyFind'           , function(data){ smarttv.SmartTvValuePostInputKeyFind()           ; });
      socket.on('SmartTvValuePostInputKeyRedColour'      , function(data){ smarttv.SmartTvValuePostInputKeyRedColour()      ; });
      socket.on('SmartTvValuePostInputKeyGreenColour'    , function(data){ smarttv.SmartTvValuePostInputKeyGreenColour()    ; });
      socket.on('SmartTvValuePostInputKeyYellowColour'   , function(data){ smarttv.SmartTvValuePostInputKeyYellowColour()   ; });
      socket.on('SmartTvValuePostInputKeyBlueColour'     , function(data){ smarttv.SmartTvValuePostInputKeyBlueColour()     ; });
      socket.on('SmartTvValuePostInputKeyHome'           , function(data){ smarttv.SmartTvValuePostInputKeyHome()           ; });
      socket.on('SmartTvValuePostInputKeyVolumeUp'       , function(data){ smarttv.SmartTvValuePostInputKeyVolumeUp()       ; });
      socket.on('SmartTvValuePostInputKeyVolumeDown'     , function(data){ smarttv.SmartTvValuePostInputKeyVolumeDown()     ; });
      socket.on('SmartTvValuePostInputKeyMute'           , function(data){ smarttv.SmartTvValuePostInputKeyMute()           ; });
      socket.on('SmartTvValuePostInputKeyOptions'        , function(data){ smarttv.SmartTvValuePostInputKeyOptions()        ; });
      socket.on('SmartTvValuePostInputKeyDot'            , function(data){ smarttv.SmartTvValuePostInputKeyDot()            ; });
      socket.on('SmartTvValuePostInputKeyDigit0'         , function(data){ smarttv.SmartTvValuePostInputKeyDigit0()         ; });
      socket.on('SmartTvValuePostInputKeyDigit1'         , function(data){ smarttv.SmartTvValuePostInputKeyDigit1()         ; });
      socket.on('SmartTvValuePostInputKeyDigit2'         , function(data){ smarttv.SmartTvValuePostInputKeyDigit2()         ; });
      socket.on('SmartTvValuePostInputKeyDigit3'         , function(data){ smarttv.SmartTvValuePostInputKeyDigit3()         ; });
      socket.on('SmartTvValuePostInputKeyDigit4'         , function(data){ smarttv.SmartTvValuePostInputKeyDigit4()         ; });
      socket.on('SmartTvValuePostInputKeyDigit5'         , function(data){ smarttv.SmartTvValuePostInputKeyDigit5()         ; });
      socket.on('SmartTvValuePostInputKeyDigit6'         , function(data){ smarttv.SmartTvValuePostInputKeyDigit6()         ; });
      socket.on('SmartTvValuePostInputKeyDigit7'         , function(data){ smarttv.SmartTvValuePostInputKeyDigit7()         ; });
      socket.on('SmartTvValuePostInputKeyDigit8'         , function(data){ smarttv.SmartTvValuePostInputKeyDigit8()         ; });
      socket.on('SmartTvValuePostInputKeyDigit9'         , function(data){ smarttv.SmartTvValuePostInputKeyDigit9()         ; });
      socket.on('SmartTvValuePostInputKeyInfo'           , function(data){ smarttv.SmartTvValuePostInputKeyInfo()           ; });
      socket.on('SmartTvValuePostInputKeyCursorUp'       , function(data){ smarttv.SmartTvValuePostInputKeyCursorUp()       ; });
      socket.on('SmartTvValuePostInputKeyCursorDown'     , function(data){ smarttv.SmartTvValuePostInputKeyCursorDown()     ; });
      socket.on('SmartTvValuePostInputKeyCursorLeft'     , function(data){ smarttv.SmartTvValuePostInputKeyCursorLeft()     ; });
      socket.on('SmartTvValuePostInputKeyCursorRight'    , function(data){ smarttv.SmartTvValuePostInputKeyCursorRight()    ; });
      socket.on('SmartTvValuePostInputKeyConfirm'        , function(data){ smarttv.SmartTvValuePostInputKeyConfirm()        ; });
      socket.on('SmartTvValuePostInputKeyNext'           , function(data){ smarttv.SmartTvValuePostInputKeyNext()           ; });
      socket.on('SmartTvValuePostInputKeyPrevious'       , function(data){ smarttv.SmartTvValuePostInputKeyPrevious()       ; });
      socket.on('SmartTvValuePostInputKeyAdjust'         , function(data){ smarttv.SmartTvValuePostInputKeyAdjust()         ; });
      socket.on('SmartTvValuePostInputKeyWatchTV'        , function(data){ smarttv.SmartTvValuePostInputKeyWatchTV()        ; });
      socket.on('SmartTvValuePostInputKeyViewmode'       , function(data){ smarttv.SmartTvValuePostInputKeyViewmode()       ; });
      socket.on('SmartTvValuePostInputKeyTeletext'       , function(data){ smarttv.SmartTvValuePostInputKeyTeletext()       ; });
      socket.on('SmartTvValuePostInputKeySubtitle'       , function(data){ smarttv.SmartTvValuePostInputKeySubtitle()       ; });
      socket.on('SmartTvValuePostInputKeyChannelStepUp'  , function(data){ smarttv.SmartTvValuePostInputKeyChannelStepUp()  ; });
      socket.on('SmartTvValuePostInputKeyChannelStepDown', function(data){ smarttv.SmartTvValuePostInputKeyChannelStepDown(); });
      socket.on('SmartTvValuePostInputKeySource'         , function(data){ smarttv.SmartTvValuePostInputKeySource()         ; });
      socket.on('SmartTvValuePostInputKeyAmbilightOnOff' , function(data){ smarttv.SmartTvValuePostInputKeyAmbilightOnOff (); });
      socket.on('SmartTvValuePostInputKeyPlayPause'      , function(data){ smarttv.SmartTvValuePostInputKeyPlayPause()      ; });
      socket.on('SmartTvValuePostInputKeyPause'          , function(data){ smarttv.SmartTvValuePostInputKeyPause()          ; });
      socket.on('SmartTvValuePostInputKeyFastForward'    , function(data){ smarttv.SmartTvValuePostInputKeyFastForward()    ; });
      socket.on('SmartTvValuePostInputKeyStop'           , function(data){ smarttv.SmartTvValuePostInputKeyStop()           ; });
      socket.on('SmartTvValuePostInputKeyRewind'         , function(data){ smarttv.SmartTvValuePostInputKeyRewind()         ; });
      socket.on('SmartTvValuePostInputKeyRecord'         , function(data){ smarttv.SmartTvValuePostInputKeyRecord()         ; });
      socket.on('SmartTvValuePostInputKeyOnline'         , function(data){ smarttv.SmartTvValuePostInputKeyOnline()         ; });

      socket.on('SmartTvValuePostPowerstateOn'           , function(data){ smarttv.SmartTvValuePostPowerstateOn()           ; });
      socket.on('SmartTvValuePostPowerstateStandby'      , function(data){ smarttv.SmartTvValuePostPowerstateStandby()      ; });

      socket.on('message'      , function(data){ console.log('client is here')      ; });;
      //socket.broadcast.emit('message', 'Another client has just connected!');





      //  ██╗     ██╗ ██████╗ ██╗  ██╗████████╗███████╗
      //  ██║     ██║██╔════╝ ██║  ██║╚══██╔══╝██╔════╝
      //  ██║     ██║██║  ███╗███████║   ██║   ███████╗
      //  ██║     ██║██║   ██║██╔══██║   ██║   ╚════██║
      //  ███████╗██║╚██████╔╝██║  ██║   ██║   ███████║
      //  ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝

      socket.on('lightstoggle', function(iLightNumber){ 
        if (bArrayLightOn[iLightNumber]){
            light.setOff(iLightNumber);
            bArrayLightOn[iLightNumber] = false;
        } else {
            light.setOn(iLightNumber,true);
            bArrayLightOn[iLightNumber] = true;
        }
        //console.log(light.getInfo(1));

      });


      socket.on('lightsoff'      , function(data){ light.setOff(1)      ; });
      socket.on('lightson'      , function(data){ light.setOn(1,true)      ; });

      socket.on('getInfo            '                    ,function(iLightNumber,sValue){          light.getInfo(iLightNumber,sValue);           });          
      socket.on('getInfoAll         '                    ,function(){                             light.getInfoAll();                           });              

      socket.on('setInfo            '                    ,function(iLightNumber,sValue){          light.setInfo(iLightNumber,sValue);           });          
      socket.on('setInfoAll         '                    ,function(){                             light.setInfoAll();                           });          

      socket.on('getManufacturerName'                    ,function(iLightNumber,cb){              light.getManufacturerName(iLightNumber,cb);   });                                  
      socket.on('getModelId         '                    ,function(iLightNumber,cb){              light.getModelId(iLightNumber,cb);            });              
      socket.on('getName            '                    ,function(iLightNumber,cb){              light.getName(iLightNumber,cb);               });          
      socket.on('getSwVersion       '                    ,function(iLightNumber,cb){              light.getSwVersion(iLightNumber,cb);          });                
      socket.on('getType            '                    ,function(iLightNumber,cb){              light.getType(iLightNumber,cb);               });          
      socket.on('getUniqueid        '                    ,function(iLightNumber,cb){              light.getUniqueid(iLightNumber,cb);           });              
      socket.on('getOn              '                    ,function(iLightNumber,cb){              light.getOn(iLightNumber,cb);                 });        
      socket.on('getBri             '                    ,function(iLightNumber,cb){              light.getBri(iLightNumber,cb);                });          
      socket.on('getHue             '                    ,function(iLightNumber,cb){              light.getHue(iLightNumber,cb);                });          
      socket.on('getSat             '                    ,function(iLightNumber,cb){              light.getSat(iLightNumber,cb);                });          
      socket.on('getEffect          '                    ,function(iLightNumber,cb){              light.getEffect(iLightNumber,cb);             });            
      socket.on('getXy              '                    ,function(iLightNumber,cb){              light.getXy(iLightNumber,cb);                 });        
      socket.on('getXyX             '                    ,function(iLightNumber,cb){              light.getXyX(iLightNumber,cb);                });          
      socket.on('getXyY             '                    ,function(iLightNumber,cb){              light.getXyY(iLightNumber,cb);                });          
      socket.on('getCt              '                    ,function(iLightNumber,cb){              light.getCt(iLightNumber,cb);                 });        
      socket.on('getAlert           '                    ,function(iLightNumber,cb){              light.getAlert(iLightNumber,cb);              });            
      socket.on('getColormode       '                    ,function(iLightNumber,cb){              light.getColormode(iLightNumber,cb);          });                
      socket.on('getReachable       '                    ,function(iLightNumber,cb){              light.getReachable(iLightNumber,cb);          });                
      socket.on('getTransisitonTime '                    ,function(iLightNumber,cb){              light.getTransisitonTime(iLightNumber,cb);    });                                  

      socket.on('setOn              '                    ,function(iLightNumber,bValue){          light.setOn( iLightNumber,bValue);            });        
      socket.on('setOff             '                    ,function(iLightNumber){                 light.setOff(iLightNumber);                   });          
      socket.on('setBri             '                    ,function(iLightNumber,iValue){          light.setBri(iLightNumber,iValue);            });          
      socket.on('setBriDec          '                    ,function(iLightNumber,iValue){          light.setBriDec(iLightNumber,iValue);         });            
      socket.on('setBriInc          '                    ,function(iLightNumber,iValue){          light.setBriInc(iLightNumber,iValue);         });            
      socket.on('setHue             '                    ,function(iLightNumber,iValue){          light.setHue(iLightNumber,iValue);            });          
      socket.on('setHueDec          '                    ,function(iLightNumber,iValue){          light.setHueDec(iLightNumber,iValue);         });            
      socket.on('setHueInc          '                    ,function(iLightNumber,iValue){          light.setHueInc(iLightNumber,iValue);         });            
      socket.on('setSat             '                    ,function(iLightNumber,iValue){          light.setSat(iLightNumber,iValue);            });          
      socket.on('setSatDec          '                    ,function(iLightNumber,iValue){          light.setSatDec(iLightNumber,iValue);         });            
      socket.on('setSatInc          '                    ,function(iLightNumber,iValue){          light.setSatInc(iLightNumber,iValue);         });            
      socket.on('setEffect          '                    ,function(iLightNumber,sValue){          light.setEffect(iLightNumber,sValue);         });            
      socket.on('setXy              '                    ,function(iLightNumber,fValue1,fValue2){ light.setXy(iLightNumber,fValue1,fValue2);    });        
      socket.on('setXyDec           '                    ,function(iLightNumber,fValue){          light.setXyDec(iLightNumber,fValue);          });            
      socket.on('setXyInc           '                    ,function(iLightNumber,fValue){          light.setXyInc(iLightNumber,fValue);          });            
      socket.on('setCt              '                    ,function(iLightNumber,iValue){          light.setCt(iLightNumber,iValue);             });        
      socket.on('setAlert           '                    ,function(iLightNumber,sValue){          light.setAlert(iLightNumber,sValue);          });            
      socket.on('setAlertNone       '                    ,function(iLightNumber){                 light.setAlertNone(iLightNumber);             });                
      socket.on('setAlertSelect     '                    ,function(iLightNumber){                 light.setAlertSelect(iLightNumber);           });                  
      socket.on('setAlertLSelect    '                    ,function(iLightNumber){                 light.setAlertLSelect(iLightNumber);          });                  
      socket.on('setColormode       '                    ,function(iLightNumber,sValue){          light.setColormode(iLightNumber,sValue);      });                
      socket.on('setReachable       '                    ,function(iLightNumber,bValue){          light.setReachable(iLightNumber,bValue);      });                
      socket.on('setTransitionTime  '                    ,function(iLightNumber,iValue){          light.setTransitionTime(iLightNumber,iValue); });                    
      socket.on('loadInfo           '                    ,function(iLightNumber){                 light.loadInfo(iLightNumber);                 });            
      socket.on('loadInfoAll        '                    ,function(){                             light.loadInfoAll();                          });              
      socket.on('saveInfo           '                    ,function(iLightNumber){                 light.saveInfo(iLightNumber);                 });            
      socket.on('saveInfoAll        '                    ,function(){                             light.saveInfoAll();                          });              





      //███████╗███████╗███╗   ██╗███████╗ ██████╗ ██████╗ ███████╗
      //██╔════╝██╔════╝████╗  ██║██╔════╝██╔═══██╗██╔══██╗██╔════╝
      //███████╗█████╗  ██╔██╗ ██║███████╗██║   ██║██████╔╝███████╗
      //╚════██║██╔══╝  ██║╚██╗██║╚════██║██║   ██║██╔══██╗╚════██║
      //███████║███████╗██║ ╚████║███████║╚██████╔╝██║  ██║███████║
      //╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝










      //███████╗███╗   ███╗██╗████████╗    ██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗███████╗
      //██╔════╝████╗ ████║██║╚══██╔══╝    ██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔════╝
      //█████╗  ██╔████╔██║██║   ██║       ██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗  ███████╗
      //██╔══╝  ██║╚██╔╝██║██║   ██║       ██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝  ╚════██║
      //███████╗██║ ╚═╝ ██║██║   ██║       ╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗███████║
      //╚══════╝╚═╝     ╚═╝╚═╝   ╚═╝        ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝


      // Send updates every second        
      setInterval(function(){  

          socket.emit('iCounter'                       ,iCounter                       );
          socket.emit('iArrayLightConnected'           ,iArrayLightConnected           );                                         
          socket.emit('sArrayLightManufacturerName'    ,sArrayLightManufacturerName    );                                         
          socket.emit('sArrayLightModelid'             ,sArrayLightModelid             );                                 
          socket.emit('sArrayLightName'                ,sArrayLightName                );                             
          socket.emit('sArrayLightSwversion'           ,sArrayLightSwversion           );                                   
          socket.emit('sArrayLightType'                ,sArrayLightType                );                             
          socket.emit('sArrayLightUniqueid'            ,sArrayLightUniqueid            );                                 
          socket.emit('bArrayLightOn'                  ,bArrayLightOn                  );                           
          socket.emit('bArrayLightReachable'           ,bArrayLightReachable           );                                   
          socket.emit('sArrayLightAlert'               ,sArrayLightAlert               );                               
          socket.emit('sArrayLightColorMode'           ,sArrayLightColorMode           );                                   
          socket.emit('sArrayLightEffect'              ,sArrayLightEffect              );                               
          socket.emit('iArrayLightTransitionTime'      ,iArrayLightTransitionTime      );                                       
          socket.emit('fArrayLightXyCur'               ,fArrayLightXyCur               );                               
          socket.emit('fArrayLightXyXCur'              ,fArrayLightXyXCur              );                               
          socket.emit('fArrayLightXyYCur'              ,fArrayLightXyYCur              );                               
          socket.emit('iArrayLightCtCur'               ,iArrayLightCtCur               );                               
          socket.emit('iArrayLightHueCur'              ,iArrayLightHueCur              );                               
          socket.emit('iArrayLightSatCur'              ,iArrayLightSatCur              );                               
          socket.emit('iArrayLightBriCur'              ,iArrayLightBriCur              );                               
          socket.emit('iArrayLightRgbRedCur'           ,iArrayLightRgbRedCur           );                                   
          socket.emit('iArrayLightRgbGreenCur'         ,iArrayLightRgbGreenCur         );                                     
          socket.emit('iArrayLightRgbBlueCur'          ,iArrayLightRgbBlueCur          );                                   
          socket.emit('fArrayLightXyNew'               ,fArrayLightXyNew               );                               
          socket.emit('fArrayLightXyXNew'              ,fArrayLightXyXNew              );                               
          socket.emit('fArrayLightXyYNew'              ,fArrayLightXyYNew              );                               
          socket.emit('iArrayLightCtNew'               ,iArrayLightCtNew               );                               
          socket.emit('iArrayLightHueNew'              ,iArrayLightHueNew              );                               
          socket.emit('iArrayLightSatNew'              ,iArrayLightSatNew              );                               
          socket.emit('iArrayLightBriNew'              ,iArrayLightBriNew              );                               
          socket.emit('iArrayLightRgbRedNew'           ,iArrayLightRgbRedNew           );                                   
          socket.emit('iArrayLightRgbGreenNew'         ,iArrayLightRgbGreenNew         );                                     
          socket.emit('iArrayLightRgbBlueNew'          ,iArrayLightRgbBlueNew          );                                   
          socket.emit('fArrayLightXyOld'               ,fArrayLightXyOld               );                               
          socket.emit('fArrayLightXyXOld'              ,fArrayLightXyXOld              );                               
          socket.emit('fArrayLightXyYOld'              ,fArrayLightXyYOld              );                               
          socket.emit('iArrayLightCtOld'               ,iArrayLightCtOld               );                               
          socket.emit('iArrayLightHueOld'              ,iArrayLightHueOld              );                               
          socket.emit('iArrayLightSatOld'              ,iArrayLightSatOld              );                               
          socket.emit('iArrayLightBriOld'              ,iArrayLightBriOld              );                               
          socket.emit('iArrayLightRgbRedOld'           ,iArrayLightRgbRedOld           );                                   
          socket.emit('iArrayLightRgbGreenOld'         ,iArrayLightRgbGreenOld         );                                     
          socket.emit('iArrayLightRgbBlueOld'          ,iArrayLightRgbBlueOld          );                                   
          socket.emit('iArraySensorConnected'          ,iArraySensorConnected          );                                   
          socket.emit('sArraySensorName'               ,sArraySensorName               );                               
          socket.emit('sArraySensorType'               ,sArraySensorType               );                               
          socket.emit('sArraySensorModelId'            ,sArraySensorModelId            );                                 
          socket.emit('sArraySensorManufacturerName'   ,sArraySensorManufacturerName   );                                           
          socket.emit('sArraySensorSwVersion'          ,sArraySensorSwVersion          );                                   
          socket.emit('sArraySensorUniqueId'           ,sArraySensorUniqueId           );                                   
          socket.emit('bArraySensorRecycle'            ,bArraySensorRecycle            );                                 
          socket.emit('sArraySensorNameCur'            ,sArraySensorNameCur            );                                 
          socket.emit('sArraySensorTypeCur'            ,sArraySensorTypeCur            );                                 
          socket.emit('sArraySensorModelIdCur'         ,sArraySensorModelIdCur         );                                     
          socket.emit('sArraySensorManufacturerNameCur',sArraySensorManufacturerNameCur);                                             
          socket.emit('sArraySensorSwVersionCur'       ,sArraySensorSwVersionCur       );                                       
          socket.emit('sArraySensorUniqueIdCur'        ,sArraySensorUniqueIdCur        );                                     
          socket.emit('bArraySensorRecycleCur'         ,bArraySensorRecycleCur         );                                     
          socket.emit('sArraySensorNameNew'            ,sArraySensorNameNew            );                                 
          socket.emit('sArraySensorTypeNew'            ,sArraySensorTypeNew            );                                 
          socket.emit('sArraySensorModelIdNew'         ,sArraySensorModelIdNew         );                                     
          socket.emit('sArraySensorManufacturerNameNew',sArraySensorManufacturerNameNew);                                             
          socket.emit('sArraySensorSwVersionNew'       ,sArraySensorSwVersionNew       );                                       
          socket.emit('sArraySensorUniqueIdNew'        ,sArraySensorUniqueIdNew        );                                     
          socket.emit('bArraySensorRecycleNew'         ,bArraySensorRecycleNew         );                                     
          socket.emit('sArraySensorNameOld'            ,sArraySensorNameOld            );                                 
          socket.emit('sArraySensorTypeOld'            ,sArraySensorTypeOld            );                                 
          socket.emit('sArraySensorModelIdOld'         ,sArraySensorModelIdOld         );                                     
          socket.emit('sArraySensorManufacturerNameOld',sArraySensorManufacturerNameOld);                                             
          socket.emit('sArraySensorSwVersionOld'       ,sArraySensorSwVersionOld       );                                       
          socket.emit('sArraySensorUniqueIdOld'        ,sArraySensorUniqueIdOld        );                                     
          socket.emit('bArraySensorRecycleOld'         ,bArraySensorRecycleOld         );                                     
          socket.emit('iArraySensorButtonEvent'        ,iArraySensorButtonEvent        );                                     
          socket.emit('iArraySensorLightLevel'         ,iArraySensorLightLevel         );                                     
          socket.emit('bArraySensorDark'               ,bArraySensorDark               );                               
          socket.emit('bArraySensorDaylight'           ,bArraySensorDaylight           );                                   
          socket.emit('iArraySensorStatus'             ,iArraySensorStatus             );                                 
          socket.emit('sArraySensorLastupdated'        ,sArraySensorLastupdated        );                                     
          socket.emit('bArraySensorPresence'           ,bArraySensorPresence           );                                   
          socket.emit('iArraySensorTemperature'        ,iArraySensorTemperature        );                                     
          socket.emit('iArraySensorButtonEventCur'     ,iArraySensorButtonEventCur     );                                         
          socket.emit('iArraySensorLightLevelCur'      ,iArraySensorLightLevelCur      );                                       
          socket.emit('bArraySensorDarkCur'            ,bArraySensorDarkCur            );                                 
          socket.emit('bArraySensorDaylightCur'        ,bArraySensorDaylightCur        );                                     
          socket.emit('iArraySensorStatusCur'          ,iArraySensorStatusCur          );                                   
          socket.emit('sArraySensorLastupdatedCur'     ,sArraySensorLastupdatedCur     );                                         
          socket.emit('bArraySensorPresenceCur'        ,bArraySensorPresenceCur        );                                     
          socket.emit('iArraySensorTemperatureCur'     ,iArraySensorTemperatureCur     );                                         
          socket.emit('iArraySensorButtonEventNew'     ,iArraySensorButtonEventNew     );                                         
          socket.emit('iArraySensorLightLevelNew'      ,iArraySensorLightLevelNew      );                                       
          socket.emit('bArraySensorDarkNew'            ,bArraySensorDarkNew            );                                 
          socket.emit('bArraySensorDaylightNew'        ,bArraySensorDaylightNew        );                                     
          socket.emit('iArraySensorStatusNew'          ,iArraySensorStatusNew          );                                   
          socket.emit('sArraySensorLastupdatedNew'     ,sArraySensorLastupdatedNew     );                                         
          socket.emit('bArraySensorPresenceNew'        ,bArraySensorPresenceNew        );                                     
          socket.emit('iArraySensorTemperatureNew'     ,iArraySensorTemperatureNew     );                                         
          socket.emit('iArraySensorButtonEventOld'     ,iArraySensorButtonEventOld     );                                         
          socket.emit('iArraySensorLightLevelOld'      ,iArraySensorLightLevelOld      );                                       
          socket.emit('bArraySensorDarkOld'            ,bArraySensorDarkOld            );                                 
          socket.emit('bArraySensorDaylightOld'        ,bArraySensorDaylightOld        );                                     
          socket.emit('iArraySensorStatusOld'          ,iArraySensorStatusOld          );                                   
          socket.emit('sArraySensorLastupdatedOld'     ,sArraySensorLastupdatedOld     );                                         
          socket.emit('bArraySensorPresenceOld'        ,bArraySensorPresenceOld        );                                     
          socket.emit('iArraySensorTemperatureOld'     ,iArraySensorTemperatureOld     );                                         
          socket.emit('bArraySensorOn'                 ,bArraySensorOn                 );                             
          socket.emit('iArraySensorBattery'            ,iArraySensorBattery            );                                 
          socket.emit('bArraySensorConfigured'         ,bArraySensorConfigured         );                                     
          socket.emit('bArraySensorReachable'          ,bArraySensorReachable          );                                   
          socket.emit('sArraySensorAlert'              ,sArraySensorAlert              );                               
          socket.emit('iArraySensorTholdDark'          ,iArraySensorTholdDark          );                                   
          socket.emit('iArraySensorTholdOffset'        ,iArraySensorTholdOffset        );                                     
          socket.emit('iArraySensorStatus'             ,iArraySensorStatus             );                                 
          socket.emit('iArraySensorTholdOffset'        ,iArraySensorTholdOffset        );                                     
          socket.emit('bArraySensorLedindication'      ,bArraySensorLedindication      );                                       
          socket.emit('bArraySensorUsertest'           ,bArraySensorUsertest           );                                   
          socket.emit('iArraySensorSensitivity'        ,iArraySensorSensitivity        );                                     
          socket.emit('iArraySensorSensitivityMax'     ,iArraySensorSensitivityMax     );                                         
          socket.emit('iArraySensorSunsetoffset'       ,iArraySensorSunsetoffset       );                                       
          socket.emit('iArraySensorSunriseoffset'      ,iArraySensorSunriseoffset      );                                       
          socket.emit('sArraySensorPending'            ,sArraySensorPending            );                                 
          socket.emit('bArraySensorOnCur'              ,bArraySensorOnCur              );                               
          socket.emit('iArraySensorBatteryCur'         ,iArraySensorBatteryCur         );                                     
          socket.emit('bArraySensorConfiguredCur'      ,bArraySensorConfiguredCur      );                                       
          socket.emit('bArraySensorReachableCur'       ,bArraySensorReachableCur       );                                       
          socket.emit('sArraySensorAlertCur'           ,sArraySensorAlertCur           );                                   
          socket.emit('iArraySensorTholdDarkCur'       ,iArraySensorTholdDarkCur       );                                       
          socket.emit('iArraySensorTholdOffsetCur'     ,iArraySensorTholdOffsetCur     );                                         
          socket.emit('iArraySensorStatusCur'          ,iArraySensorStatusCur          );                                   
          socket.emit('iArraySensorTholdOffsetCur'     ,iArraySensorTholdOffsetCur     );                                         
          socket.emit('bArraySensorLedindicationCur'   ,bArraySensorLedindicationCur   );                                           
          socket.emit('bArraySensorUsertestCur'        ,bArraySensorUsertestCur        );                                     
          socket.emit('iArraySensorSensitivityCur'     ,iArraySensorSensitivityCur     );                                         
          socket.emit('iArraySensorSensitivityMaxCur'  ,iArraySensorSensitivityMaxCur  );                                           
          socket.emit('iArraySensorSunsetoffsetCur'    ,iArraySensorSunsetoffsetCur    );                                         
          socket.emit('iArraySensorSunriseoffsetCur'   ,iArraySensorSunriseoffsetCur   );                                           
          socket.emit('sArraySensorPendingCur'         ,sArraySensorPendingCur         );                                     
          socket.emit('bArraySensorOnNew'              ,bArraySensorOnNew              );                               
          socket.emit('iArraySensorBatteryNew'         ,iArraySensorBatteryNew         );                                     
          socket.emit('bArraySensorConfiguredNew'      ,bArraySensorConfiguredNew      );                                       
          socket.emit('bArraySensorReachableNew'       ,bArraySensorReachableNew       );                                       
          socket.emit('sArraySensorAlertNew'           ,sArraySensorAlertNew           );                                   
          socket.emit('iArraySensorTholdDarkNew'       ,iArraySensorTholdDarkNew       );                                       
          socket.emit('iArraySensorTholdOffsetNew'     ,iArraySensorTholdOffsetNew     );                                         
          socket.emit('iArraySensorStatusNew'          ,iArraySensorStatusNew          );                                   
          socket.emit('iArraySensorTholdOffsetNew'     ,iArraySensorTholdOffsetNew     );                                         
          socket.emit('bArraySensorLedindicationNew'   ,bArraySensorLedindicationNew   );                                           
          socket.emit('bArraySensorUsertestNew'        ,bArraySensorUsertestNew        );                                     
          socket.emit('iArraySensorSensitivityNew'     ,iArraySensorSensitivityNew     );                                         
          socket.emit('iArraySensorSensitivityMaxNew'  ,iArraySensorSensitivityMaxNew  );                                           
          socket.emit('iArraySensorSunsetoffsetNew'    ,iArraySensorSunsetoffsetNew    );                                         
          socket.emit('iArraySensorSunriseoffsetNew'   ,iArraySensorSunriseoffsetNew   );                                           
          socket.emit('sArraySensorPendingNew'         ,sArraySensorPendingNew         );                                     
          socket.emit('bArraySensorOnOld'              ,bArraySensorOnOld              );                               
          socket.emit('iArraySensorBatteryOld'         ,iArraySensorBatteryOld         );                                     
          socket.emit('bArraySensorConfiguredOld'      ,bArraySensorConfiguredOld      );                                       
          socket.emit('bArraySensorReachableOld'       ,bArraySensorReachableOld       );                                       
          socket.emit('sArraySensorAlertOld'           ,sArraySensorAlertOld           );                                   
          socket.emit('iArraySensorTholdDarkOld'       ,iArraySensorTholdDarkOld       );                                       
          socket.emit('iArraySensorTholdOffsetOld'     ,iArraySensorTholdOffsetOld     );                                         
          socket.emit('iArraySensorStatusOld'          ,iArraySensorStatusOld          );                                   
          socket.emit('iArraySensorTholdOffsetOld'     ,iArraySensorTholdOffsetOld     );                                         
          socket.emit('bArraySensorLedindicationOld'   ,bArraySensorLedindicationOld   );                                           
          socket.emit('bArraySensorUsertestOld'        ,bArraySensorUsertestOld        );                                     
          socket.emit('iArraySensorSensitivityOld'     ,iArraySensorSensitivityOld     );                                         
          socket.emit('iArraySensorSensitivityMaxOld'  ,iArraySensorSensitivityMaxOld  );                                           
          socket.emit('iArraySensorSunsetoffsetOld'    ,iArraySensorSunsetoffsetOld    );                                         
          socket.emit('iArraySensorSunriseoffsetOld'   ,iArraySensorSunriseoffsetOld   );                                           
          socket.emit('sArraySensorPendingOld'         ,sArraySensorPendingOld         );                   
      }, 500);
});











