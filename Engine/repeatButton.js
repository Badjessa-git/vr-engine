//script to replay reading when entity is clicked

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
			//allow text box interactability
			initFlag = !initFlag;
		}
	});
	//On click, entity will send its text contents to the engine, and then it will send a message to trigger deletion of all text boxes
	this.mousePressOnEntity = function()
	{
		//only allow interactability if initial reading is complete
		if(initFlag)
		{
			//Send message to engine to confirm selection
			Messages.sendMessage("engine","repeatAudio");
		}
	};
});