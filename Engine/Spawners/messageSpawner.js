//Interface script to spawn interactable menus
//NOTE: You can find entity properties at
//"https://apidocs.highfidelity.com/Entities.html#.EntityProperties-Text"

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
		//log
		print("spawning message");
		
		//set up orientation and positions for the text boxes
		
		var rotation = {"x":0,"y":0.9189745187759399,"z":0,"w":-0.3943169116973877};
		var basePosition = {x:1.8786, y:0.46, z:-2.2622};
		//These lines make the text boxes spawn directly in front of user
		//var rotation = MyAvatar.orientation;
		//var basePosition = Vec3.sum(MyAvatar.position, Quat.getFront(rotation));
		
		var position1 = Vec3.sum(basePosition, {x:0, y:0.75, z:0});
		var position2 = Vec3.sum(basePosition, {x:0, y:0.5, z:0});
		var position3 = Vec3.sum(basePosition, {x:0, y:0.25, z:0});
		var position4 = basePosition;
		var instructionPos = var position3 = Vec3.sum(basePosition, {x:0, y:1, z:0});
		var repeatButtonPosition = Vec3.sum(basePosition, {x:0, y:-0.25, z:0});
		var dimensions = {x:2, y:0.15, z:0.1};
		var lineHeight = 0.075;
		
		//Properties of message1
		var properties1 = {
			type: "Text",
			text: text1,
			textAlpha: 0.8,
			position: position1,
			localRotation: rotation,
			name: "0",
			dimensions: dimensions,
			lineHeight: lineHeight,
			userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
			script: "atp:/Scripts/textBoxScript.js"
		};
		
		//Properties of message2
		var properties2 = {
			type: "Text",
			text: text2,
			textAlpha: 0.8,
			position: position2,
			localRotation: rotation,
			name: "1",
			dimensions: dimensions,
			lineHeight: lineHeight,
			userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
			script: "atp:/Scripts/textBoxScript.js"
		};
		
		//Properties of message3
		var properties3 = {
			type: "Text",
			text: text3,
			textAlpha: 0.8,
			position: position3,
			localRotation: rotation,
			name: "2",
			dimensions: dimensions,
			lineHeight: lineHeight,
			userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
			script: "atp:/Scripts/textBoxScript.js"
		};
		
		//Properties of message4
		var properties4 = {
			type: "Text",
			text: text4,
			textAlpha: 0.8,
			position: position4,
			localRotation: rotation,
			name: "3",
			dimensions: dimensions,
			lineHeight: lineHeight,
			userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
			script: "atp:/Scripts/textBoxScript.js"
		};
		
		//Properties of repeatButton
		var repeatButtonProps = {
			type: "Text",
			text: "Repeat Audio",
			position: repeatButtonPosition,
			localRotation: rotation,
			name: "repeatButton",
			dimensions: {x:0.5, y:0.1, z:0.1},
			userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
			script: "atp:/Scripts/repeatButton.js"
		};
		
		//Properties of instructionBox
		var instructionProps = {
			type: "Text",
			text: "Please select a response.",
			position: ,
			localRotation: {"x":0,"y":1,"z":0,"w":0},
			name: "watchInstructions",
			dimensions: {x: 1, y: 0.1, z: 0.1},
			userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
			script: "atp:/Scripts/instructionBoxScript.js"
		};
		
		//spawn textboxes
		var textBoxID1 = Entities.addEntity(properties1);
		var textBoxID2 = Entities.addEntity(properties2);
		var textBoxID3 = Entities.addEntity(properties3);
		var textBoxID4 = Entities.addEntity(properties4);
		var instructionID = Entities.addEntity(instructionProps);
		var repeatButtonID = Entities.addEntity(repeatButtonProps);
	}
});