//script to attach to text boxes so that they send a message to the assignment client when clicked

	//set up entity id storage
	var _selfEntityID;

  // The preload function fires whenever a client first loads the entity and this
  // script. The reference to the entityID that this script is on is passed in as
  // a parameter, which can be stored and used elsewhere in the script.
  this.preload = function(entityID) {
    _selfEntityID = entityID;
  }
  
  // We connect the mousePressOnEntity signal to call our function 
  this.mousePressOnEntity.connect(function(entityID, event) {
	// Sending message
	Messages.sendMessage("engine", "hi"); // sends "message" to channel "channel"
	
	//Test log
	print("IT SENT");
	
	//Have text box kill itself
	Entities.deleteEntity(_selfEntityID);
  });
