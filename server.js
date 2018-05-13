
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

      // Will do something when its get triggerd by emitter
      socket.on('power-off'       , function(data){ avr.SendCommand('power-off'                                      ); });


      socket.on('lightstoggle', function(iLightNumber){ 
        if (bArrayLightOn[iLightNumber]){
            light.setOff(iLightNumber);
            //bArrayLightOn[iLightNumber] = false;
        } else {
            light.setOn(iLightNumber,true);
            //bArrayLightOn[iLightNumber] = true;
        }
       
        socket.emit('updatefrontend', "lights");

        //console.log(light.getInfo(1));

      });

      socket.on('socketondata', function(){ 
          socket.emit('iCounter'     ,iCounter     );
          socket.emit('oHueStateOld' ,oHueStateOld );
          socket.emit('oHueStateCur' ,oHueStateCur );
          socket.emit('oHueStateNew' ,oHueStateNew );
      });

      // Send updates every second        
      //setInterval(function(){  


      //}, 250);
});

