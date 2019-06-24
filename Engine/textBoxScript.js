//script to attach to text boxes so that they send a message to the assignment client when clicked
(function(){
	  //set up entity id storage
	  var _selfEntityID;
		
	  //subscribe to channel to be notified when to send ID to spawner for deletion
	  Messages.subscribe("getMenuIDs");

	  // The preload function fires whenever a client first loads the entity and this
	  // script. The reference to the entityID that this script is on is passed in as
	  // a parameter, which can be stored and used elsewhere in the script.
	  this.preload = function(entityID) {
		_selfEntityID = entityID;
	  };
	  
	  // We connect the mousePressOnEntity signal to call our function 
	  this.mousePressOnEntity = function() {
		Entities.deleteEntity(_selfEntityID);
		
		/*
		//Test log
		print("Selection confirmed. Removing textboxes.");
		
		//Send message to engine to confirm selection
		var textProp = Entities.getEntityProperties(_selfEntityID, ["text"]);
		textProp = JSON.stringify(textProp.text);
		Messages.sendMessage("engine",textProp);
		print("Selected: " + textProp);
	  };
	  
	  //Connect function to send ID to messageSpawner on command
	  Messages.messageReceived.connect(function(){
		  Messages.sendMessage("deleterChannel",_selfEntityID);
	  */
	  };
});