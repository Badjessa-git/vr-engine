//Interface script to spawn interactable menus

//Messages.subscribe("entitySpawner");
//Messages.messageReceived.connect(function(channel, data, sender, localOnly)
//{
	var position = Vec3.sum(MyAvatar.position, Quat.getFront(MyAvatar.orientation));
	
	var properties = {
		type: "Text",
		text: "Hello, world!",
		position: position,
		name: "testText",
		dimensions: {x:1,y:1,z:0.1},
		script: "atp:/textBoxScript.js"
	};
	
	var entityID = Entities.addEntity(properties);
	print("text spawn attempted");
//});
