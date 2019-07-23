

(function() {
  
  
  // The enterEntity signal is called when your avatar's hips cross into
  // the bounds of the box entity or into the zone entity - this script
  // will work with either entity type. 
  this.enterEntity = function() {
  
	Messages.sendMessage("101", "hi");

  };
  
})