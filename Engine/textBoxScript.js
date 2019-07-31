//This client entity script controls the dialogue text boxes

(function()
{
	//set up entity id storage
	var _selfEntityID;

	//set flag to tell when reading is finished
	var initFlag = false;
	//set flag to tell if box has been clicked
	var clickFlag = false;
	
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
		if(message === "deleteMenu")
		{
			//Self delete
			Entities.deleteEntity(_selfEntityID);
		}
		else if(message === "toggle lock")
		{
			//toggle text box interactability
			initFlag = !initFlag;
		}
		else if(message === "unhighlight")
		{
			//unhighlight this box
			Entities.editEntity(_selfEntityID, {textAlpha: 0.5, textColor: {r:255, g:255, b:255}});
			//unset clickFlag
			clickFlag = false;
		}
	});
	//On click, entity will send its text contents to the engine, and then it will send a message to trigger deletion of all text boxes
	this.mousePressOnEntity = function()
	{
		print("Click confirmed. initFlag = " + initFlag);
		
		//only allow interactability if reading is finished
		if(initFlag)
		{
			//if box has been highlighted, confirm selection
			if(clickFlag)
			{
				//Send message to engine to confirm selection
				var textProp = Entities.getEntityProperties(_selfEntityID, ["name"]);
				textProp = JSON.stringify(textProp.name);
				Messages.sendMessage("engine",textProp);
				
				//Send deletion notice on local channel
				Messages.sendMessage("deletionNotice", "deleteMenu", true);
				//Delete instructions
				Messages.sendMessage("instructionNotify", "delete");
			}
			//else, highlight box
			else
			{
				//unhighlight all other boxes
				Messages.sendMessage("readingNotice", "unhighlight", true);
				//highlight this box
				Entities.editEntity(_selfEntityID, {textAlpha: 1.0, textColor: {r:255, g:255, b:0}});
				//set clickFlag
				clickFlag = true;
			}
		}
	};
});