//Interface script to spawn interactable menus

//This channel will receive text values to display in text boxes
Messages.subscribe("entitySpawner");

//This channel will receive ids of text boxes that need to be deleted
Messages.subscribe("deleterChannel");

//This channel will receive a notice that a text box has been selected
Messages.subscribe("engine");

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
    if(channel === "entitySpawner")
	{
		//All entity creation logic will go here
	}
	else if(channel === "deleterChannel")
	{
		//Deletes each entity according to the id found in the message
		Entities.deleteEntity(message);
	}
	else if(channel === "engine")
	{
		//This picks up that a message has been selected,
		//and prompts all textboxes to send their ids for deletion
		Messages.sendMessage("getMenuIDs","");
	}
});
//});