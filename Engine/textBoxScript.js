//script to attach to dialogue text boxes

//NOTE: flag related stuff can be used to ensure that no 
//textbox signals can be sent out under certain situations
(function()
{
	//set up entity id storage
	var _selfEntityID;

	//set flag to tell when reading is finished
	var initFlag = false;
	
	//Stores entity id on creation
	this.preload = function(entityID) 
	{
		_selfEntityID = entityID;
	};
	
	//subscribe to channel to receive deletion notice
	Messages.subscribe("deletionNotice");
	//subscribe to channel to receive initFlag update notice
	Messages.subscribe("readingNotice");
	Messages.messageReceived.connect(function (channel, message, senderID, localOnly) 
	{
		if(message === "delete")
		{
			//Self delete
			Entities.deleteEntity(_selfEntityID);
		}
		else if(message === "toggle lock")
		{
			//toggle text box interactability
			initFlag = !initFlag;
		}
	});
	//On click, entity will send its text contents to the engine, and then it will send a message to trigger deletion of all text boxes
	this.mousePressOnEntity = function()
	{
		print("Click confirmed. initFlag = " + initFlag);
		
		//only allow interactability if reading is finished
		if(initFlag)
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