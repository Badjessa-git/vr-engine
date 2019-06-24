//Interface script to spawn interactable menus

//This channel will receive text values to display in text boxes
Messages.subscribe("entitySpawner");

//Set default text
var text = "Hello, world!";
//Messages.messageReceived.connect(function(channel, data, sender, localOnly)
//{
	var rotation = MyAvatar.orientation;
	var position = Vec3.sum(MyAvatar.position, Quat.getFront(rotation));
	//var text = data;
	
	var properties = {
		type: "Text",
		text: text,
		position: position,
		rotation: rotation,
		name: "testText",
		dimensions: {x:1,y:0.1,z:0.1},
		script: "atp:/textBoxScript.js"
	};
	
	var entityID = Entities.addEntity(properties);
	print("text spawn attempted");
	
Messages.messageReceived.connect(function (channel, message, senderID, localOnly) {
	//All entity creation logic goes here
});
//});
