





// want to use this later, to send only the needed updates.
function ReplicationCheck(){
    iArrayLightHueCur !== iArrayLightHueOld
}

exports.ReplicatedEvent = function(sVariableName){
    // use socket.io
    var io = require('socket.io').listen(server);

    //turn off debug
    //io.set('log level', 0);

    // define interactions with client
    io.sockets.on('connection', function(socket){
	  
    console.log("FunctionCall: ReplicatedEvent: " + sVariableName);		


             if (VarName == 'iArrayLightConnected'           ){ socket.emit('iArrayLightConnected'           ,iArrayLightConnected           ); }                
        else if (VarName == 'sArrayLightManufacturerName'    ){ socket.emit('sArrayLightManufacturerName'    ,sArrayLightManufacturerName    ); }         
        else if (VarName == 'sArrayLightModelid'             ){ socket.emit('sArrayLightModelid'             ,sArrayLightModelid             ); }     
        else if (VarName == 'sArrayLightName'                ){ socket.emit('sArrayLightName'                ,sArrayLightName                ); }     
        else if (VarName == 'sArrayLightSwversion'           ){ socket.emit('sArrayLightSwversion'           ,sArrayLightSwversion           ); }     
        else if (VarName == 'sArrayLightType'                ){ socket.emit('sArrayLightType'                ,sArrayLightType                ); }     
        else if (VarName == 'sArrayLightUniqueid'            ){ socket.emit('sArrayLightUniqueid'            ,sArrayLightUniqueid            ); }     
        else if (VarName == 'bArrayLightOn'                  ){ socket.emit('bArrayLightOn'                  ,bArrayLightOn                  ); }     
        else if (VarName == 'bArrayLightReachable'           ){ socket.emit('bArrayLightReachable'           ,bArrayLightReachable           ); }     
        else if (VarName == 'sArrayLightAlert'               ){ socket.emit('sArrayLightAlert'               ,sArrayLightAlert               ); }     
        else if (VarName == 'sArrayLightColorMode'           ){ socket.emit('sArrayLightColorMode'           ,sArrayLightColorMode           ); }     
        else if (VarName == 'sArrayLightEffect'              ){ socket.emit('sArrayLightEffect'              ,sArrayLightEffect              ); }     
        else if (VarName == 'iArrayLightTransitionTime'      ){ socket.emit('iArrayLightTransitionTime'      ,iArrayLightTransitionTime      ); }     
        else if (VarName == 'fArrayLightXyCur'               ){ socket.emit('fArrayLightXyCur'               ,fArrayLightXyCur               ); }     
        else if (VarName == 'fArrayLightXyXCur'              ){ socket.emit('fArrayLightXyXCur'              ,fArrayLightXyXCur              ); }     
        else if (VarName == 'fArrayLightXyYCur'              ){ socket.emit('fArrayLightXyYCur'              ,fArrayLightXyYCur              ); }     
        else if (VarName == 'iArrayLightCtCur'               ){ socket.emit('iArrayLightCtCur'               ,iArrayLightCtCur               ); }     
        else if (VarName == 'iArrayLightHueCur'              ){ socket.emit('iArrayLightHueCur'              ,iArrayLightHueCur              ); }     
        else if (VarName == 'iArrayLightSatCur'              ){ socket.emit('iArrayLightSatCur'              ,iArrayLightSatCur              ); }     
        else if (VarName == 'iArrayLightBriCur'              ){ socket.emit('iArrayLightBriCur'              ,iArrayLightBriCur              ); }     
        else if (VarName == 'iArrayLightRgbRedCur'           ){ socket.emit('iArrayLightRgbRedCur'           ,iArrayLightRgbRedCur           ); }     
        else if (VarName == 'iArrayLightRgbGreenCur'         ){ socket.emit('iArrayLightRgbGreenCur'         ,iArrayLightRgbGreenCur         ); }     
        else if (VarName == 'iArrayLightRgbBlueCur'          ){ socket.emit('iArrayLightRgbBlueCur'          ,iArrayLightRgbBlueCur          ); }     
        else if (VarName == 'fArrayLightXyNew'               ){ socket.emit('fArrayLightXyNew'               ,fArrayLightXyNew               ); }     
        else if (VarName == 'fArrayLightXyXNew'              ){ socket.emit('fArrayLightXyXNew'              ,fArrayLightXyXNew              ); }     
        else if (VarName == 'fArrayLightXyYNew'              ){ socket.emit('fArrayLightXyYNew'              ,fArrayLightXyYNew              ); }     
        else if (VarName == 'iArrayLightCtNew'               ){ socket.emit('iArrayLightCtNew'               ,iArrayLightCtNew               ); }     
        else if (VarName == 'iArrayLightHueNew'              ){ socket.emit('iArrayLightHueNew'              ,iArrayLightHueNew              ); }     
        else if (VarName == 'iArrayLightSatNew'              ){ socket.emit('iArrayLightSatNew'              ,iArrayLightSatNew              ); }     
        else if (VarName == 'iArrayLightBriNew'              ){ socket.emit('iArrayLightBriNew'              ,iArrayLightBriNew              ); }     
        else if (VarName == 'iArrayLightRgbRedNew'           ){ socket.emit('iArrayLightRgbRedNew'           ,iArrayLightRgbRedNew           ); }     
        else if (VarName == 'iArrayLightRgbGreenNew'         ){ socket.emit('iArrayLightRgbGreenNew'         ,iArrayLightRgbGreenNew         ); }     
        else if (VarName == 'iArrayLightRgbBlueNew'          ){ socket.emit('iArrayLightRgbBlueNew'          ,iArrayLightRgbBlueNew          ); }     
        else if (VarName == 'fArrayLightXyOld'               ){ socket.emit('fArrayLightXyOld'               ,fArrayLightXyOld               ); }     
        else if (VarName == 'fArrayLightXyXOld'              ){ socket.emit('fArrayLightXyXOld'              ,fArrayLightXyXOld              ); }     
        else if (VarName == 'fArrayLightXyYOld'              ){ socket.emit('fArrayLightXyYOld'              ,fArrayLightXyYOld              ); }     
        else if (VarName == 'iArrayLightCtOld'               ){ socket.emit('iArrayLightCtOld'               ,iArrayLightCtOld               ); }     
        else if (VarName == 'iArrayLightHueOld'              ){ socket.emit('iArrayLightHueOld'              ,iArrayLightHueOld              ); }     
        else if (VarName == 'iArrayLightSatOld'              ){ socket.emit('iArrayLightSatOld'              ,iArrayLightSatOld              ); }     
        else if (VarName == 'iArrayLightBriOld'              ){ socket.emit('iArrayLightBriOld'              ,iArrayLightBriOld              ); }     
        else if (VarName == 'iArrayLightRgbRedOld'           ){ socket.emit('iArrayLightRgbRedOld'           ,iArrayLightRgbRedOld           ); }     
        else if (VarName == 'iArrayLightRgbGreenOld'         ){ socket.emit('iArrayLightRgbGreenOld'         ,iArrayLightRgbGreenOld         ); }     
        else if (VarName == 'iArrayLightRgbBlueOld'          ){ socket.emit('iArrayLightRgbBlueOld'          ,iArrayLightRgbBlueOld          ); }     
        else if (VarName == 'iArraySensorConnected'          ){ socket.emit('iArraySensorConnected'          ,iArraySensorConnected          ); }     
        else if (VarName == 'sArraySensorName'               ){ socket.emit('sArraySensorName'               ,sArraySensorName               ); }     
        else if (VarName == 'sArraySensorType'               ){ socket.emit('sArraySensorType'               ,sArraySensorType               ); }     
        else if (VarName == 'sArraySensorModelId'            ){ socket.emit('sArraySensorModelId'            ,sArraySensorModelId            ); }     
        else if (VarName == 'sArraySensorManufacturerName'   ){ socket.emit('sArraySensorManufacturerName'   ,sArraySensorManufacturerName   ); }     
        else if (VarName == 'sArraySensorSwVersion'          ){ socket.emit('sArraySensorSwVersion'          ,sArraySensorSwVersion          ); }     
        else if (VarName == 'sArraySensorUniqueId'           ){ socket.emit('sArraySensorUniqueId'           ,sArraySensorUniqueId           ); }     
        else if (VarName == 'bArraySensorRecycle'            ){ socket.emit('bArraySensorRecycle'            ,bArraySensorRecycle            ); }     
        else if (VarName == 'sArraySensorNameCur'            ){ socket.emit('sArraySensorNameCur'            ,sArraySensorNameCur            ); }     
        else if (VarName == 'sArraySensorTypeCur'            ){ socket.emit('sArraySensorTypeCur'            ,sArraySensorTypeCur            ); }     
        else if (VarName == 'sArraySensorModelIdCur'         ){ socket.emit('sArraySensorModelIdCur'         ,sArraySensorModelIdCur         ); }     
        else if (VarName == 'sArraySensorManufacturerNameCur'){ socket.emit('sArraySensorManufacturerNameCur',sArraySensorManufacturerNameCur); }     
        else if (VarName == 'sArraySensorSwVersionCur'       ){ socket.emit('sArraySensorSwVersionCur'       ,sArraySensorSwVersionCur       ); }     
        else if (VarName == 'sArraySensorUniqueIdCur'        ){ socket.emit('sArraySensorUniqueIdCur'        ,sArraySensorUniqueIdCur        ); }     
        else if (VarName == 'bArraySensorRecycleCur'         ){ socket.emit('bArraySensorRecycleCur'         ,bArraySensorRecycleCur         ); }     
        else if (VarName == 'sArraySensorNameNew'            ){ socket.emit('sArraySensorNameNew'            ,sArraySensorNameNew            ); }     
        else if (VarName == 'sArraySensorTypeNew'            ){ socket.emit('sArraySensorTypeNew'            ,sArraySensorTypeNew            ); }     
        else if (VarName == 'sArraySensorModelIdNew'         ){ socket.emit('sArraySensorModelIdNew'         ,sArraySensorModelIdNew         ); }     
        else if (VarName == 'sArraySensorManufacturerNameNew'){ socket.emit('sArraySensorManufacturerNameNew',sArraySensorManufacturerNameNew); }     
        else if (VarName == 'sArraySensorSwVersionNew'       ){ socket.emit('sArraySensorSwVersionNew'       ,sArraySensorSwVersionNew       ); }     
        else if (VarName == 'sArraySensorUniqueIdNew'        ){ socket.emit('sArraySensorUniqueIdNew'        ,sArraySensorUniqueIdNew        ); }     
        else if (VarName == 'bArraySensorRecycleNew'         ){ socket.emit('bArraySensorRecycleNew'         ,bArraySensorRecycleNew         ); }     
        else if (VarName == 'sArraySensorNameOld'            ){ socket.emit('sArraySensorNameOld'            ,sArraySensorNameOld            ); }     
        else if (VarName == 'sArraySensorTypeOld'            ){ socket.emit('sArraySensorTypeOld'            ,sArraySensorTypeOld            ); }     
        else if (VarName == 'sArraySensorModelIdOld'         ){ socket.emit('sArraySensorModelIdOld'         ,sArraySensorModelIdOld         ); }     
        else if (VarName == 'sArraySensorManufacturerNameOld'){ socket.emit('sArraySensorManufacturerNameOld',sArraySensorManufacturerNameOld); }     
        else if (VarName == 'sArraySensorSwVersionOld'       ){ socket.emit('sArraySensorSwVersionOld'       ,sArraySensorSwVersionOld       ); }     
        else if (VarName == 'sArraySensorUniqueIdOld'        ){ socket.emit('sArraySensorUniqueIdOld'        ,sArraySensorUniqueIdOld        ); }     
        else if (VarName == 'bArraySensorRecycleOld'         ){ socket.emit('bArraySensorRecycleOld'         ,bArraySensorRecycleOld         ); }     
        else if (VarName == 'iArraySensorButtonEvent'        ){ socket.emit('iArraySensorButtonEvent'        ,iArraySensorButtonEvent        ); }     
        else if (VarName == 'iArraySensorLightLevel'         ){ socket.emit('iArraySensorLightLevel'         ,iArraySensorLightLevel         ); }     
        else if (VarName == 'bArraySensorDark'               ){ socket.emit('bArraySensorDark'               ,bArraySensorDark               ); }     
        else if (VarName == 'bArraySensorDaylight'           ){ socket.emit('bArraySensorDaylight'           ,bArraySensorDaylight           ); }     
        else if (VarName == 'iArraySensorStatus'             ){ socket.emit('iArraySensorStatus'             ,iArraySensorStatus             ); }     
        else if (VarName == 'sArraySensorLastupdated'        ){ socket.emit('sArraySensorLastupdated'        ,sArraySensorLastupdated        ); }     
        else if (VarName == 'bArraySensorPresence'           ){ socket.emit('bArraySensorPresence'           ,bArraySensorPresence           ); }     
        else if (VarName == 'iArraySensorTemperature'        ){ socket.emit('iArraySensorTemperature'        ,iArraySensorTemperature        ); }     
        else if (VarName == 'iArraySensorButtonEventCur'     ){ socket.emit('iArraySensorButtonEventCur'     ,iArraySensorButtonEventCur     ); }     
        else if (VarName == 'iArraySensorLightLevelCur'      ){ socket.emit('iArraySensorLightLevelCur'      ,iArraySensorLightLevelCur      ); }     
        else if (VarName == 'bArraySensorDarkCur'            ){ socket.emit('bArraySensorDarkCur'            ,bArraySensorDarkCur            ); }     
        else if (VarName == 'bArraySensorDaylightCur'        ){ socket.emit('bArraySensorDaylightCur'        ,bArraySensorDaylightCur        ); }     
        else if (VarName == 'iArraySensorStatusCur'          ){ socket.emit('iArraySensorStatusCur'          ,iArraySensorStatusCur          ); }     
        else if (VarName == 'sArraySensorLastupdatedCur'     ){ socket.emit('sArraySensorLastupdatedCur'     ,sArraySensorLastupdatedCur     ); }     
        else if (VarName == 'bArraySensorPresenceCur'        ){ socket.emit('bArraySensorPresenceCur'        ,bArraySensorPresenceCur        ); }     
        else if (VarName == 'iArraySensorTemperatureCur'     ){ socket.emit('iArraySensorTemperatureCur'     ,iArraySensorTemperatureCur     ); }     
        else if (VarName == 'iArraySensorButtonEventNew'     ){ socket.emit('iArraySensorButtonEventNew'     ,iArraySensorButtonEventNew     ); }     
        else if (VarName == 'iArraySensorLightLevelNew'      ){ socket.emit('iArraySensorLightLevelNew'      ,iArraySensorLightLevelNew      ); }     
        else if (VarName == 'bArraySensorDarkNew'            ){ socket.emit('bArraySensorDarkNew'            ,bArraySensorDarkNew            ); }     
        else if (VarName == 'bArraySensorDaylightNew'        ){ socket.emit('bArraySensorDaylightNew'        ,bArraySensorDaylightNew        ); }     
        else if (VarName == 'iArraySensorStatusNew'          ){ socket.emit('iArraySensorStatusNew'          ,iArraySensorStatusNew          ); }     
        else if (VarName == 'sArraySensorLastupdatedNew'     ){ socket.emit('sArraySensorLastupdatedNew'     ,sArraySensorLastupdatedNew     ); }     
        else if (VarName == 'bArraySensorPresenceNew'        ){ socket.emit('bArraySensorPresenceNew'        ,bArraySensorPresenceNew        ); }     
        else if (VarName == 'iArraySensorTemperatureNew'     ){ socket.emit('iArraySensorTemperatureNew'     ,iArraySensorTemperatureNew     ); }     
        else if (VarName == 'iArraySensorButtonEventOld'     ){ socket.emit('iArraySensorButtonEventOld'     ,iArraySensorButtonEventOld     ); }     
        else if (VarName == 'iArraySensorLightLevelOld'      ){ socket.emit('iArraySensorLightLevelOld'      ,iArraySensorLightLevelOld      ); }     
        else if (VarName == 'bArraySensorDarkOld'            ){ socket.emit('bArraySensorDarkOld'            ,bArraySensorDarkOld            ); }     
        else if (VarName == 'bArraySensorDaylightOld'        ){ socket.emit('bArraySensorDaylightOld'        ,bArraySensorDaylightOld        ); }     
        else if (VarName == 'iArraySensorStatusOld'          ){ socket.emit('iArraySensorStatusOld'          ,iArraySensorStatusOld          ); }     
        else if (VarName == 'sArraySensorLastupdatedOld'     ){ socket.emit('sArraySensorLastupdatedOld'     ,sArraySensorLastupdatedOld     ); }     
        else if (VarName == 'bArraySensorPresenceOld'        ){ socket.emit('bArraySensorPresenceOld'        ,bArraySensorPresenceOld        ); }     
        else if (VarName == 'iArraySensorTemperatureOld'     ){ socket.emit('iArraySensorTemperatureOld'     ,iArraySensorTemperatureOld     ); }     
        else if (VarName == 'bArraySensorOn'                 ){ socket.emit('bArraySensorOn'                 ,bArraySensorOn                 ); }     
        else if (VarName == 'iArraySensorBattery'            ){ socket.emit('iArraySensorBattery'            ,iArraySensorBattery            ); }     
        else if (VarName == 'bArraySensorConfigured'         ){ socket.emit('bArraySensorConfigured'         ,bArraySensorConfigured         ); }     
        else if (VarName == 'bArraySensorReachable'          ){ socket.emit('bArraySensorReachable'          ,bArraySensorReachable          ); }     
        else if (VarName == 'sArraySensorAlert'              ){ socket.emit('sArraySensorAlert'              ,sArraySensorAlert              ); }     
        else if (VarName == 'iArraySensorTholdDark'          ){ socket.emit('iArraySensorTholdDark'          ,iArraySensorTholdDark          ); }     
        else if (VarName == 'iArraySensorTholdOffset'        ){ socket.emit('iArraySensorTholdOffset'        ,iArraySensorTholdOffset        ); }     
        else if (VarName == 'iArraySensorStatus'             ){ socket.emit('iArraySensorStatus'             ,iArraySensorStatus             ); }     
        else if (VarName == 'iArraySensorTholdOffset'        ){ socket.emit('iArraySensorTholdOffset'        ,iArraySensorTholdOffset        ); }     
        else if (VarName == 'bArraySensorLedindication'      ){ socket.emit('bArraySensorLedindication'      ,bArraySensorLedindication      ); }     
        else if (VarName == 'bArraySensorUsertest'           ){ socket.emit('bArraySensorUsertest'           ,bArraySensorUsertest           ); }     
        else if (VarName == 'iArraySensorSensitivity'        ){ socket.emit('iArraySensorSensitivity'        ,iArraySensorSensitivity        ); }     
        else if (VarName == 'iArraySensorSensitivityMax'     ){ socket.emit('iArraySensorSensitivityMax'     ,iArraySensorSensitivityMax     ); }     
        else if (VarName == 'iArraySensorSunsetoffset'       ){ socket.emit('iArraySensorSunsetoffset'       ,iArraySensorSunsetoffset       ); }     
        else if (VarName == 'iArraySensorSunriseoffset'      ){ socket.emit('iArraySensorSunriseoffset'      ,iArraySensorSunriseoffset      ); }     
        else if (VarName == 'sArraySensorPending'            ){ socket.emit('sArraySensorPending'            ,sArraySensorPending            ); }     
        else if (VarName == 'bArraySensorOnCur'              ){ socket.emit('bArraySensorOnCur'              ,bArraySensorOnCur              ); }     
        else if (VarName == 'iArraySensorBatteryCur'         ){ socket.emit('iArraySensorBatteryCur'         ,iArraySensorBatteryCur         ); }     
        else if (VarName == 'bArraySensorConfiguredCur'      ){ socket.emit('bArraySensorConfiguredCur'      ,bArraySensorConfiguredCur      ); }     
        else if (VarName == 'bArraySensorReachableCur'       ){ socket.emit('bArraySensorReachableCur'       ,bArraySensorReachableCur       ); }     
        else if (VarName == 'sArraySensorAlertCur'           ){ socket.emit('sArraySensorAlertCur'           ,sArraySensorAlertCur           ); }     
        else if (VarName == 'iArraySensorTholdDarkCur'       ){ socket.emit('iArraySensorTholdDarkCur'       ,iArraySensorTholdDarkCur       ); }     
        else if (VarName == 'iArraySensorTholdOffsetCur'     ){ socket.emit('iArraySensorTholdOffsetCur'     ,iArraySensorTholdOffsetCur     ); }     
        else if (VarName == 'iArraySensorStatusCur'          ){ socket.emit('iArraySensorStatusCur'          ,iArraySensorStatusCur          ); }     
        else if (VarName == 'iArraySensorTholdOffsetCur'     ){ socket.emit('iArraySensorTholdOffsetCur'     ,iArraySensorTholdOffsetCur     ); }     
        else if (VarName == 'bArraySensorLedindicationCur'   ){ socket.emit('bArraySensorLedindicationCur'   ,bArraySensorLedindicationCur   ); }     
        else if (VarName == 'bArraySensorUsertestCur'        ){ socket.emit('bArraySensorUsertestCur'        ,bArraySensorUsertestCur        ); }     
        else if (VarName == 'iArraySensorSensitivityCur'     ){ socket.emit('iArraySensorSensitivityCur'     ,iArraySensorSensitivityCur     ); }     
        else if (VarName == 'iArraySensorSensitivityMaxCur'  ){ socket.emit('iArraySensorSensitivityMaxCur'  ,iArraySensorSensitivityMaxCur  ); }     
        else if (VarName == 'iArraySensorSunsetoffsetCur'    ){ socket.emit('iArraySensorSunsetoffsetCur'    ,iArraySensorSunsetoffsetCur    ); }     
        else if (VarName == 'iArraySensorSunriseoffsetCur'   ){ socket.emit('iArraySensorSunriseoffsetCur'   ,iArraySensorSunriseoffsetCur   ); }     
        else if (VarName == 'sArraySensorPendingCur'         ){ socket.emit('sArraySensorPendingCur'         ,sArraySensorPendingCur         ); }     
        else if (VarName == 'bArraySensorOnNew'              ){ socket.emit('bArraySensorOnNew'              ,bArraySensorOnNew              ); }     
        else if (VarName == 'iArraySensorBatteryNew'         ){ socket.emit('iArraySensorBatteryNew'         ,iArraySensorBatteryNew         ); }     
        else if (VarName == 'bArraySensorConfiguredNew'      ){ socket.emit('bArraySensorConfiguredNew'      ,bArraySensorConfiguredNew      ); }     
        else if (VarName == 'bArraySensorReachableNew'       ){ socket.emit('bArraySensorReachableNew'       ,bArraySensorReachableNew       ); }     
        else if (VarName == 'sArraySensorAlertNew'           ){ socket.emit('sArraySensorAlertNew'           ,sArraySensorAlertNew           ); }     
        else if (VarName == 'iArraySensorTholdDarkNew'       ){ socket.emit('iArraySensorTholdDarkNew'       ,iArraySensorTholdDarkNew       ); }     
        else if (VarName == 'iArraySensorTholdOffsetNew'     ){ socket.emit('iArraySensorTholdOffsetNew'     ,iArraySensorTholdOffsetNew     ); }     
        else if (VarName == 'iArraySensorStatusNew'          ){ socket.emit('iArraySensorStatusNew'          ,iArraySensorStatusNew          ); }     
        else if (VarName == 'iArraySensorTholdOffsetNew'     ){ socket.emit('iArraySensorTholdOffsetNew'     ,iArraySensorTholdOffsetNew     ); }     
        else if (VarName == 'bArraySensorLedindicationNew'   ){ socket.emit('bArraySensorLedindicationNew'   ,bArraySensorLedindicationNew   ); }     
        else if (VarName == 'bArraySensorUsertestNew'        ){ socket.emit('bArraySensorUsertestNew'        ,bArraySensorUsertestNew        ); }     
        else if (VarName == 'iArraySensorSensitivityNew'     ){ socket.emit('iArraySensorSensitivityNew'     ,iArraySensorSensitivityNew     ); }     
        else if (VarName == 'iArraySensorSensitivityMaxNew'  ){ socket.emit('iArraySensorSensitivityMaxNew'  ,iArraySensorSensitivityMaxNew  ); }     
        else if (VarName == 'iArraySensorSunsetoffsetNew'    ){ socket.emit('iArraySensorSunsetoffsetNew'    ,iArraySensorSunsetoffsetNew    ); }     
        else if (VarName == 'iArraySensorSunriseoffsetNew'   ){ socket.emit('iArraySensorSunriseoffsetNew'   ,iArraySensorSunriseoffsetNew   ); }     
        else if (VarName == 'sArraySensorPendingNew'         ){ socket.emit('sArraySensorPendingNew'         ,sArraySensorPendingNew         ); }     
        else if (VarName == 'bArraySensorOnOld'              ){ socket.emit('bArraySensorOnOld'              ,bArraySensorOnOld              ); }     
        else if (VarName == 'iArraySensorBatteryOld'         ){ socket.emit('iArraySensorBatteryOld'         ,iArraySensorBatteryOld         ); }     
        else if (VarName == 'bArraySensorConfiguredOld'      ){ socket.emit('bArraySensorConfiguredOld'      ,bArraySensorConfiguredOld      ); }     
        else if (VarName == 'bArraySensorReachableOld'       ){ socket.emit('bArraySensorReachableOld'       ,bArraySensorReachableOld       ); }     
        else if (VarName == 'sArraySensorAlertOld'           ){ socket.emit('sArraySensorAlertOld'           ,sArraySensorAlertOld           ); }     
        else if (VarName == 'iArraySensorTholdDarkOld'       ){ socket.emit('iArraySensorTholdDarkOld'       ,iArraySensorTholdDarkOld       ); }     
        else if (VarName == 'iArraySensorTholdOffsetOld'     ){ socket.emit('iArraySensorTholdOffsetOld'     ,iArraySensorTholdOffsetOld     ); }     
        else if (VarName == 'iArraySensorStatusOld'          ){ socket.emit('iArraySensorStatusOld'          ,iArraySensorStatusOld          ); }     
        else if (VarName == 'iArraySensorTholdOffsetOld'     ){ socket.emit('iArraySensorTholdOffsetOld'     ,iArraySensorTholdOffsetOld     ); }     
        else if (VarName == 'bArraySensorLedindicationOld'   ){ socket.emit('bArraySensorLedindicationOld'   ,bArraySensorLedindicationOld   ); }     
        else if (VarName == 'bArraySensorUsertestOld'        ){ socket.emit('bArraySensorUsertestOld'        ,bArraySensorUsertestOld        ); }     
        else if (VarName == 'iArraySensorSensitivityOld'     ){ socket.emit('iArraySensorSensitivityOld'     ,iArraySensorSensitivityOld     ); }     
        else if (VarName == 'iArraySensorSensitivityMaxOld'  ){ socket.emit('iArraySensorSensitivityMaxOld'  ,iArraySensorSensitivityMaxOld  ); }     
        else if (VarName == 'iArraySensorSunsetoffsetOld'    ){ socket.emit('iArraySensorSunsetoffsetOld'    ,iArraySensorSunsetoffsetOld    ); }     
        else if (VarName == 'iArraySensorSunriseoffsetOld'   ){ socket.emit('iArraySensorSunriseoffsetOld'   ,iArraySensorSunriseoffsetOld   ); }     
        else if (VarName == 'sArraySensorPendingOld'         ){ socket.emit('sArraySensorPendingOld'         ,sArraySensorPendingOld         ); }   
        else { //ReplicateAll; 
        };
    }
)};

//Reset the page to home
function goHomepage(){
      window.history.pushState("", "", '/');
}








////		for (x = 0; x < ModeArrayLength ; x++)
////		{                                                      								//		
////			ModeAccessLevelArray[x]=(ModeAccessLevelArray[x]); 								//		
////		}              


