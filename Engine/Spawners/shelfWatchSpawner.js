//Subscribe to channel to listen for commands to spawn zones
Messages.subscribe("shelfWatchSpawner");

//set properties of watches
var watch1Props = {
	type: "Model",
	modelURL: "atp:/Models/RedWatch.fbx",
	position: {x: -2.2982, y: 0.7962, z: 3.5750},
	localRotation: {"x":0,"y":180,"z":0,"w":0},
	name: "watch0",
	dimensions: {x: 0.0811, y: 0.0360, z: 0.0450},
	userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
	script: "atp:/Scripts/shelfWatchScript.js"
};

var watch2Props = {
	type: "Model",
	modelURL: "atp:/Models/FlatWatch.fbx",
	position: {x: -2.0534, y: 0.7825, z: 3.5749},
	localRotation: {"x":0,"y":1,"z":0,"w":0.25},
	name: "watch1",
	dimensions: {x: 0.0498, y: 0.0077, z: 0.2390},
	userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
	script: "atp:/Scripts/shelfWatchScript.js"
};
		
var watch3Props = {
	type: "Model",
	modelURL: "atp:/Models/WatchTest.FBX",
	position: {x: -2.5428, y: 0.7993, z: 3.5749},
	localRotation: {"x":0,"y":180,"z":0,"w":0},
	name: "watch2",
	dimensions: {x: 0.1040, y: 0.0841, z: 0.1021},
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