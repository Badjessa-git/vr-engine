//script to attach to text boxes so that they send a message to the assignment client when clicked
(function()
{
	//set up entity id storage
	var _selfEntityID;

	//set flag to allow text box deletion
	var flag = false;
	
	//Stores entity id on creation
	this.preload = function(entityID) 
	{
		_selfEntityID = entityID;
	};
	
	//delay deleteability of text box by one second
	Script.setTimeout(function() 
	{
		flag = true;
	}, 1000);
	  
	//subscribe to channel to receive deletion notice
	Messages.subscribe("deletionNotice");
	Messages.messageReceived.connect(function (channel, message, senderID, localOnly) 
	{
		if(message === "delete" && flag)
		{
			//Self delete
			Entities.deleteEntity(_selfEntityID);
		}
	});
	//On click, entity will send its text contents to the engine, and then it will send a message to trigger deletion of all text boxes
	this.mousePressOnEntity = function()
	{
		//only allow interactability if has existed for a while
		if(flag)
		{
			//Send message to engine to confirm selection
			var textProp = Entities.getEntityProperties(_selfEntityID, ["name"]);
			textProp = JSON.stringify(textProp.name);
			Messages.sendMessage("engine",textProp);
			
			//Send deletion notice on local channel
			Messages.sendMessage("deletionNotice", "delete", true);
		}
	};
});