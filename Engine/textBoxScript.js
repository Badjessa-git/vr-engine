//script to attach to text boxes so that they send a message to the assignment client when clicked
(function(){
	  //set up entity id storage
	  var _selfEntityID;
		
	  //subscribe to channel to be notified when to self-delete
	  Messages.subscribe("delete");

	  // The preload function fires whenever a client first loads the entity and this
	  // script. The reference to the entityID that this script is on is passed in as
	  // a parameter, which can be stored and used elsewhere in the script.
	  this.preload = function(entityID) {
		_selfEntityID = entityID;
	  };
	  
	  // We connect the mousePressOnEntity signal to call our function 
	  this.mousePressOnEntity = function() {
		//Test log
		print("Selection confirmed. Removing textboxes.");
		
		//Send message to engine to confirm selection
		var textProp = Entities.getEntityProperties(_selfEntityID, ["text"]);
		textProp = JSON.stringify(textProp.text);
		Messages.sendMessage("engine",textProp);
		print("Selected: " + textProp);
		  
		//Send delete command to all textboxes
		Messages.sendMessage("delete","");
	  };
	  
	  //Connect function to delete self on command
	  Messages.messageReceived.connect(function(){
		  Entities.deleteEntitiy(_selfEntityID);
	  });
});
