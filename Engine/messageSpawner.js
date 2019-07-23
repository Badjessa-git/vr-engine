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
	//text for fourth option
	var text4 = data[4];

	//Check if message is from engine
	if(flag === "check")
	{
		//set up orientation and positions for the text boxes
		var rotation = MyAvatar.orientation;
		var basePosition = Vec3.sum(MyAvatar.position, Quat.getFront(rotation));
		var position1 = Vec3.sum(basePosition, {x:0, y:0.75, z:0});
		var position2 = Vec3.sum(basePosition, {x:0, y:0.5, z:0});
		var position3 = Vec3.sum(basePosition, {x:0, y:0.25, z:0});
		var position4 = basePosition;
		var repeatButtonPosition = Vec3.sum(basePosition, {x:0, y:-0.25, z:0});
		
		//Properties of message1
		var properties1 = {
			type: "Text",
			text: text1,
			position: position1,
			rotation: rotation,
			name: "0",
			dimensions: {x:1.5, y:0.1, z:0.1},
			script: "atp:/Scripts/textBoxScript.js"
		};
		
		//Properties of message2
		var properties2 = {
			type: "Text",
			text: text2,
			position: position2,
			rotation: rotation,
			name: "1",
			dimensions: {x:1.5, y:0.1, z:0.1},
			script: "atp:/Scripts/textBoxScript.js"
		};
		
		//Properties of message3
		var properties3 = {
			type: "Text",
			text: text3,
			position: position3,
			rotation: rotation,
			name: "2",
			dimensions: {x:1.5, y:0.1, z:0.1},
			script: "atp:/Scripts/textBoxScript.js"
		};
		
		//Properties of message4
		var properties4 = {
			type: "Text",
			text: text4,
			position: position4,
			rotation: rotation,
			name: "3",
			dimensions: {x:1.5, y:0.1, z:0.1},
			script: "atp:/Scripts/textBoxScript.js"
		};
		
		//Properties of repeatButton
		var repeatButtonProps = {
			type: "Text",
			text: "Repeat Audio",
			position: repeatButtonPosition,
			rotation: rotation,
			name: "repeatButton",
			dimensions: {x:0.5, y:0.1, z:0.1},
			script: "atp:/Scripts/repeatButton.js"
		};
		
		//spawn textboxes
		var textBoxID1 = Entities.addEntity(properties1);
		var textBoxID2 = Entities.addEntity(properties2);
		var textBoxID3 = Entities.addEntity(properties3);
		var textBoxID4 = Entities.addEntity(properties4);
		var repeatButtonID = Entities.addEntity(repeatButtonProps);
	}
});