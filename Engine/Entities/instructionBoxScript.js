//This script is attached to any instructional textboxes that appear

//It exists solely to delete the instruction box when it is no longer needed
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
	Messages.subscribe("instructionNotify");
	Messages.messageReceived.connect(function (channel, message, senderID, localOnly)
	{
		if(message === "delete" && channel === "instructionNotify")
		{
			//Self delete
			Entities.deleteEntity(_selfEntityID);
		}
	});
});

