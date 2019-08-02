//This interface script will handle spawning of watches for selection

//Subscribe to channel to listen for command to spawn watches
Messages.subscribe("watchSpawner");

//prep positions for watches to spawn
var basePosition = {x: 1.7450, y: 0.6969, z: 3.0263};
var position1 = Vec3.sum(basePosition, {x:-0.25, y:0, z:0});
var position2 = Vec3.sum(basePosition, {x:0.25, y:0, z:0});
var instructionPos = Vec3.sum(basePosition, {x:0, y:0.5, z:0});

//set properties of watches
var watch1Props = {
	type: "Model",
	modelURL: "atp:/Models/RedWatch.fbx",
	position: position1,
	localRotation: {"x":0,"y":90,"z":0,"w":0},
	name: "watch1",
	dimensions: {x: 0.0811, y: 0.0360, z: 0.0450},
	userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
	script: "atp:/Scripts/watchScript.js"
};

var watch2Props = {
	type: "Model",
	modelURL: "atp:/Models/FlatWatch.fbx",
	position: basePosition,
	localRotation: {"x":0,"y":0,"z":0,"w":0},
	name: "watch1",
	dimensions: {x: 0.0498, y: 0.0077, z: 0.2390},
	userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
	script: "atp:/Scripts/watchScript.js"
};
		
var watch3Props = {
	type: "Model",
	modelURL: "atp:/Models/WatchTest.FBX",
	position: position2,
	localRotation: {"x":0,"y":180,"z":0,"w":0},
	name: "watch2",
	dimensions: {x: 0.1040, y: 0.0841, z: 0.1021},
	userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
	script: "atp:/Scripts/watchScript.js"
};

var instructionProps = {
	type: "Text",
	text: "Please select a watch.",
	position: instructionPos,
	localRotation: {"x":0,"y":1,"z":0,"w":0},
	name: "watchInstructions",
	dimensions: {x: 1, y: 0.1, z: 0.1},
	userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
	script: "atp:/Scripts/instructionBoxScript.js"
};

Messages.messageReceived.connect(function (channel, message, senderID, localOnly) 
{
	if(message === "spawnWatches")
	{
		var watchID1 = Entities.addEntity(watch1Props);
		var watchID2 = Entities.addEntity(watch2Props);
		var watchID3 = Entities.addEntity(watch3Props);
		var instructionID = Entities.addEntity(instructionProps);
	}
});