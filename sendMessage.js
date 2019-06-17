


// entity-client-script-change-color.js
//
// This script is an example of an entity client script in High Fidelity
// To use this script, paste it into the 'script' property text box while
// in Create mode. This script makes a primitive entity change color when clicked.
// You must enable "Triggerable" on the entity.
// 
// Copyright 2019 High Fidelity
// Licensed under the Apache 2.0 License
// 
/* globals Entities */
(function() {
  
  // We first store a reference to the entity that this script is on
  var _selfEntityID;
  
  // A function that generates a random number between 0 and 255
  function randomRGBValue() {
    return Math.random()*255;
  };
  
  // A function that generates a random color and edits the color property
  // of the entity with the ID stored in _selfEntityID
  function changeEntityColor() {
    var newColor = {r: randomRGBValue(), g: randomRGBValue(), b: randomRGBValue()};
    var newProperties = {
      'color' : newColor 
    };
    Entities.editEntity(_selfEntityID, newProperties);
  };
  
  // The preload function fires whenever a client first loads the entity and this
  // script. The reference to the entityID that this script is on is passed in as
  // a parameter, which can be stored and used elsewhere in the script.
  this.preload = function(entityID) {
    _selfEntityID = entityID;
  }
  
  // We connect the mousePressOnEntity signal to call our color change function 
  this.mousePressOnEntity = function() {
    changeEntityColor();
	// Sending script.
	Messages.sendMessage("101", "hi"); // sends "message" to channel "channel"
	print("IT SENT");
  };
  
  // We connect the stopFarTrigger signal to call our color change function
  this.stopFarTrigger = function() {
    changeEntityColor();
  };
})