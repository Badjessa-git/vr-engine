//This script controls the replay button

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
	//On click, entity will notify engine to re-read audio sequentially
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