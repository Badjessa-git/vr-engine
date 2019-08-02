Messages.subscribe("paymentSpawner");

var basePosition = {x: 1.7450, y: 0.6969, z: 3.0263};
var position1 = Vec3.sum(basePosition, {x:-0.25, y:0, z:0});
var position2 = Vec3.sum(basePosition, {x:0.25, y:0, z:0});

//set properties of texboxes to spawn
var creditProps = {
	type: "Text",
	position: position1,
	localRotation: {"x":0,"y":1,"z":0,"w":0},
	name: "thresholdZone",
	dimensions: {x:0.5, y:0.1, z:0.1},
	script: "atp:/Scripts/paymentOption.js"
};
		
var cashProps = {
	type: "Text",
	position: position2,
	localRotation: {"x":0,"y":1,"z":0,"w":0},
	name: "cashierZone",
	dimensions: {x:0.5, y:0.1, z:0.1},
	script: "atp:/Scripts/paymentOption.js"
};

Messages.messageReceived.connect(function (channel, message, senderID, localOnly) 
{
	if(message === "spawnPaymentOptions")
	{
		 var creditID = Entities.addEntity(creditProps);
		 var cashID = Entities.addEntity(cashProps);
	}
});