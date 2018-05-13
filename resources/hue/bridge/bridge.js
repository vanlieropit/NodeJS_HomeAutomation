exports.statusBridgeGetState = function(){

    var myCallback = function(data) {
        fs.writeFileSync( './bridge-db.json', JSON.stringify(data), 'UTF-8');
    }; //With callback


    var fetchStatusBridgeGetState = function(callback) {

        //init at start
        if (!iCounter){
            process.stdout.write('\n');
            client.fullState(function (err, result) {
                if (err){ return err; }
                oHueStateCur = result;
                callback(oHueStateCur);
            });
        //if not the first run
        } else {

            //Get updates for items that change less          
            if ( ( iCounter % 1000 ) == 0 ){

                client.groups(function (err, result) {
                if (err){ return err; }
                    oHueStateCur.groups = result;
                    callback(oHueStateCur);
                });

                client.schedules(function (err, result) {
                if (err){ return err; }
                    oHueStateCur.schedules = result;
                    callback(oHueStateCur);
                });

                client.rules(function (err, result) {
                if (err){ return err; }
                    oHueStateCur.rules = result;
                    callback(oHueStateCur);
                });

                client.scenes(function (err, result) {
                if (err){ return err; }
                    oHueStateCur.scenes = result;
                    callback(oHueStateCur);
                });

                client.config(function (err, result) {
                if (err){ return err; }
                    oHueStateCur.config = result;
                    callback(oHueStateCur);
                });

            //Get updates for items that change often
            } else {

                client.lights(function (err, result) {
                if (err){ return err; }
                    oHueStateCur.lights = result;
                    callback(oHueStateCur);
                });

                client.sensors(function (err, result) {
                if (err){ return err; }
                    oHueStateCur.sensors = result;
                    callback(oHueStateCur);
                });
            }
        }
    }

    fetchStatusBridgeGetState(myCallback);
}