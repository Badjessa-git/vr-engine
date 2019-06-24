//Interface script to spawn interactable menus

//This channel will receive text values to display in text boxes
Messages.subscribe("entitySpawner");

//Set default text
var text1 = "Hello, world!";
var text2 = "Evening, world!";
var text3 = "Goodbye, world!";
	
Messages.dataReceived.connect(function (channel, data, senderID, localOnly) {
	var rotation = MyAvatar.orientation;
	var position = Vec3.sum(MyAvatar.position, Quat.getFront(rotation));
	//var text = data;
	
	var properties1 = {
		type: "Text",
		text: text1,
		position: position,
		rotation: rotation,
		name: "testText",
		dimensions: {x:1,y:0.1,z:0.1},
		script: "atp:/textBoxScript.js"
	};
	
	var properties2 = // adjust positioning and ref text2
	    
	var properties3 = // adjust positioning and ref text3
	
	var entityID = Entities.addEntity(properties);
	print("text spawn attempted");
});
