//zone will be created that has script attached

var unentered = true;
//Attach to invisible zone entity & on collision (entry of zone) will trigger animation by sending message
(function() {
  
  // The enterEntity signal is called when your avatar's hips cross into
  // the bounds of the box entity or into the zone entity - this script
  // will work with either entity type. 
  this.enterEntity = function() {
  
	var properties = {
		type: "Zone",
		name: "ScriptBox",
		position: {x: -1.0316, y: 0.7083, z: -3.1617},
		dimensions: {x: 0.3604, y: 1.0723, z: 1.4220},
		script: "atp:/triggerZone.js",
		grab: {triggerable: true},
	
	};
	if (unentered){
		var entityID = Entities.addEntity(properties);
		unentered = false;
	}
  };
  
})
