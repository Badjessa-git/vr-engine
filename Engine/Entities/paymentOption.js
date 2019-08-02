//This script is attached to the payment options that appear when talking to the cashier

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
	Messages.subscribe("paymentOption");
	Messages.messageReceived.connect(function (channel, message, senderID, localOnly)
	{
		if(message === "delete" && channel === "paymentOption")
		{
			//Self delete
			Entities.deleteEntity(_selfEntityID);
		}
	});
	
	this.mousePressOnEntity = function()
	{
		//Notify engine that option was selected
		Messages.sendMessage("engine", "paymentProcessed");
		
		//Delete the payment options
		Messages.sendMessage("paymentOption", "delete");
	};
});

