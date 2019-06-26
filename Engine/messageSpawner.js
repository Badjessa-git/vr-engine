//Interface script to spawn interactable menus

//This channel will receive text values to display in text boxes
Messages.subscribe("entitySpawner");

//Set default text
var text1 = "Hello, world!";
var text2 = "Evening, world!";
var text3 = "Goodbye, world!";
	
Messages.messageReceived.connect(function (channel, unprocessedData, senderID, localOnly) {
	if(unprocessedData === "bob")
	{
		var rotation = MyAvatar.orientation;
		var left = Vec3.sum(MyAvatar.position, Quat.getUp(rotation));
		var front = Vec3.sum(MyAvatar.position, Quat.getFront(rotation));
		var right = Vec3.sum(MyAvatar.position, Quat.getRight(rotation));
		var data = unprocessedData.split("|");
		text1 = data[0];
		text2 = data[1];
		text3 = data[2];
		
		var properties1 = {
			type: "Text",
			text: text1,
			position: left,
			rotation: rotation,
			name: "testText",
			dimensions: {x:1,y:0.1,z:0.1},
			script: "atp:/textBoxScript.js"
		};
		
		var properties2 = {
			type: "Text",
			text: text2,
			position: front,
			rotation: rotation,
			name: "testText",
			dimensions: {x:1,y:0.1,z:0.1},
			script: "atp:/textBoxScript.js"
		};
			
		var properties3 = {
			type: "Text",
			text: text3,
			position: right,
			rotation: rotation,
			name: "testText",
			dimensions: {x:1,y:0.1,z:0.1},
			script: "atp:/textBoxScript.js"
		};
		
		var leftEntityID = Entities.addEntity(properties1);
		var frontEntityID = Entities.addEntity(properties2);
		var rightEntityID = Entities.addEntity(properties3);
		print("text spawn attempted");
	}
});
