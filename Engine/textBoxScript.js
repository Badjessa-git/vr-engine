//script to attach to text boxes so that they send a message to the assignment client when clicked
(function(){
	  //set up entity id storage
	  var _selfEntityID;

	  //Stores entity id on creation
	  this.preload = function(entityID) {
		_selfEntityID = entityID;
	  };
	  
	  //On click, entity will send its text contents to the engine, and then it will delete itself
	  this.mousePressOnEntity = function() {
		
		//Send message to engine to confirm selection
		var textProp = Entities.getEntityProperties(_selfEntityID, ["text"]);
		textProp = JSON.stringify(textProp.text);
		Messages.sendMessage("engine",textProp);
		
		//Self delete
		Entities.deleteEntity(_selfEntityID);
	  };
});