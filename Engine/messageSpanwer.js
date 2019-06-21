//Interface script to spawn interactable menus

Messages.subscribe("entitySpawner");
//Messages.messageReceived.connect(function(channel, data, sender, localOnly)
//{
	var rotation = MyAvatar.orientation;
	var position = Vec3.sum(MyAvatar.position, Quat.getFront(rotation));
	
	var properties = {
		type: "Text",
		text: "Hello, world!",
		position: position,
		rotation: rotation,
		name: "testText",
		dimensions: {x:1,y:1,z:0.1},
		script: "atp:/textBoxScript.js"
	};
	
	var entityID = Entities.addEntity(properties);
	print("text spawn attempted");
	
Messages.messageReceived.connect(function (channel, message, senderID, localOnly) {
    Entities.deleteEntity(message);
});
//});