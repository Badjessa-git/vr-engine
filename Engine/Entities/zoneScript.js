//This entity script will be attached to zones
(function()
{	
	//set up entity id storage
	var _selfEntityID;

	//Subscribe to channel to listen to notices
	Messages.subscribe("zoneNotice");

	//Stores entity id on creation
	this.preload = function(entityID) 
	{
		_selfEntityID = entityID;
	};

	Messages.messageReceived.connect(function (channel, message, senderID, localOnly) 
	{
		if(message === "deleteZone")
		{
			//Self delete
			Entities.deleteEntity(_selfEntityID);
		}
	});

	//Upon entering, sends message to engine that zone has been entered
	this.enterEntity = function()
	{
		//Send message to engine to confirm selection
		var textProp = Entities.getEntityProperties(_selfEntityID, ["name"]);
		textProp = JSON.stringify(textProp.name);
		Messages.sendMessage("engine",textProp);
	};
});