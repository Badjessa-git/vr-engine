//Subscribe to channel to listen for commands to spawn zones
Messages.subscribe("shelfWatchSpawner");

//prep positions for watches to spawn (TEMPORARY SETUP)
var basePosition = {x: -2.8120, y: 0.6982, z: 1.3256};
var position1 = Vec3.sum(basePosition, {x:-0.25, y:0, z:0});
var position2 = Vec3.sum(basePosition, {x:0.25, y:0, z:0});

//set properties of watches
var watch1Props = {
	type: "Box",
	position: position1,
	localRotation: {"x":0,"y":0,"z":0,"w":0},
	name: "watch0",
	dimensions: {x: 0.1, y: 0.1, z: 0.1},
	userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
	script: "atp:/Scripts/shelfWatchScript.js"
};

var watch2Props = {
	type: "Box",
	position: basePosition,
	localRotation: {"x":0,"y":0,"z":0,"w":0},
	name: "watch1",
	dimensions: {x: 0.1, y: 0.1, z: 0.1},
	userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
	script: "atp:/Scripts/shelfWatchScript.js"
};
		
var watch3Props = {
	type: "Box",
	position: position2,
	localRotation: {"x":0,"y":0,"z":0,"w":0},
	name: "watch2",
	dimensions: {x: 0.1, y: 0.1, z: 0.1},
	userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
	script: "atp:/Scripts/shelfWatchScript.js"
};

Messages.messageReceived.connect(function (channel, message, senderID, localOnly) 
{
	if(message === "spawnShelfWatches")
	{
		var watchID1 = Entities.addEntity(watch1Props);
		var watchID2 = Entities.addEntity(watch2Props);
		var watchID3 = Entities.addEntity(watch3Props);
	}
});