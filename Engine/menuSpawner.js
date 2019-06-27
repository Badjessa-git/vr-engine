//Interface script to spawn interactable menus

//This channel will receive text values to display in text boxes
Messages.subscribe("menuSystem");
	
Messages.messageReceived.connect(function (channel, unprocessedData, senderID, localOnly) {
	//Parse message from engine into 4 components
	var data = unprocessedData.split("|");
	
	//flag to ensure that message is from the engine
	var flag = data[0];
	//text for first option
	var text1 = data[1];
	//text for second option
	var text2 = data[2];
	//text for third option
	var text3 = data[3];

	//Check if message is from engine
	if(flag === "check")
	{
		//set up orientation and positions for the text boxes
		var rotation = MyAvatar.orientation;
		var left = Vec3.sum(MyAvatar.position, Quat.getUp(rotation));
		var front = Vec3.sum(MyAvatar.position, Quat.getFront(rotation));
		var right = Vec3.sum(MyAvatar.position, Quat.getRight(rotation));
		
		//Properties of message1
		var properties1 = {
			type: "Text",
			text: text1,
			position: left,
			rotation: rotation,
			name: "testText",
			dimensions: {x:1,y:0.1,z:0.1},
			script: "atp:/textBoxScript.js"
		};
		
		//Properties of message2
		var properties2 = {
			type: "Text",
			text: text2,
			position: front,
			rotation: rotation,
			name: "testText",
			dimensions: {x:1,y:0.1,z:0.1},
			script: "atp:/textBoxScript.js"
		};
		
		//Properties of message3
		var properties3 = {
			type: "Text",
			text: text3,
			position: right,
			rotation: rotation,
			name: "testText",
			dimensions: {x:1,y:0.1,z:0.1},
			script: "atp:/textBoxScript.js"
		};

		//spawn textboxes
		var leftEntityID = Entities.addEntity(properties1);
		var frontEntityID = Entities.addEntity(properties2);
		var rightEntityID = Entities.addEntity(properties3);
	}
});