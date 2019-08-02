//This entity script will be attached to the watches
(function()
{
	//set up entity id storage
	var _selfEntityID;
	
	//Stores entity id on creation
	this.preload = function(entityID) 
	{
		_selfEntityID = entityID;
	};
	
	//subscribe to channel to receive deletion notice
	Messages.subscribe("watchNotify");
	Messages.messageReceived.connect(function (channel, message, senderID, localOnly) 
	{
		if(message === "deleteWatch")
		{
			//Self delete
			Entities.deleteEntity(_selfEntityID);
		}
	});
	//On click, entity will notify engine that watch has been selected
	this.mousePressOnEntity = function()
	{
		//Send message to shelfWatches to confirm which one to make clickable
		var textProp = Entities.getEntityProperties(_selfEntityID, ["name"]);
		textProp = JSON.stringify(textProp.name);
		Messages.sendMessage("shelfWatchNotify", textProp);
		
		//Notify engine that selection was made
		Messages.sendMessage("engine", "watchSelected");
		
		//Send message to instructions to delete
		Messages.sendMessage("instructionNotify", "delete");
		
		//Send message to watches to delete
		Messages.sendMessage("watchNotify", "deleteWatch");
	};
});

