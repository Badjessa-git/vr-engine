//This interface script will handle spawning of zones for positional triggers

//Subscribe to channel to listen for commands to spawn zones
Messages.subscribe("zoneSpawner");

//variables to store ids of zones
var thresholdZoneID;
var cashierZoneID;
//set properties of zones to spawn
var thresholdZoneProps = {
	type: "Zone",
	position: {x: -1.2029, y: 0.9367, z: -4.0014},
	localRotation: {"x":0,"y":0,"z":0,"w":0},
	name: "thresholdZone",
	dimensions: {x: 0.1087, y: 2.6411, z: 1.4591},
	script: "atp:/Scripts/zoneScript.js"
};
		
var cashierZoneProps = {
	type: "Zone",
	position: {x: 1.3979, y: 0.6586, z: 2.7329},
	localRotation: {"x":0,"y":0,"z":0,"w":0},
	name: "cashierZone",
	dimensions: {x: 2.9000, y: 2.4084, z: 1},
	script: "atp:/Scripts/zoneScript.js"
};

Messages.messageReceived.connect(function (channel, message, senderID, localOnly) 
{
	if(message === "spawnThresholdZone")
	{
		 thresholdZoneID = Entities.addEntity(thresholdZoneProps);
	}
	else if(message === "spawnCashierZone")
	{
		cashierZoneID = Entities.addEntity(cashierZoneProps);
	}
});