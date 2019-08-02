//This entity script is attached to the shelf watches
(function()
{
	//set up entity id storage
	var _selfEntityID;
	
	//Flag to indicate selectability
	var isSelectable = false;
	
	//Set up highlighting capability
	var LIST_NAME = "SelectionExample",
        ITEM_TYPE = "entity",
        HIGHLIGHT_STYLE = {
            outlineUnoccludedColor: { red: 0, green: 180, blue: 0 },
            outlineUnoccludedAlpha: 0.5,
            outlineOccludedColor: { red: 0, green: 180, blue: 0 },
            outlineOccludedAlpha: 0.5,
            outlineWidth: 4
        };

    Selection.enableListHighlight(LIST_NAME, HIGHLIGHT_STYLE);
	
	//set up storage of name
	var textProp;
	
	//Stores entity id and name on creation
	this.preload = function(entityID)
	{
		_selfEntityID = entityID;
		textProp = Entities.getEntityProperties(_selfEntityID, ["name"]);
		textProp = JSON.stringify(textProp.name);
	};
	
	//subscribe to channel to receive notification of selection
	Messages.subscribe("shelfWatchNotify");
	
	//subscribe to global channel for cleanup purposes
	Messages.subscribe("globalNotify");
	Messages.messageReceived.connect(function watchListen(channel, message, senderID, localOnly)
	{
		if(message === "deleteShelfWatch")
		{
			//Self delete
			Entities.deleteEntity(_selfEntityID);
		}
		//if same watch was selected, highlight this one and make it selectable
		else if(message === textProp)
		{
			Messages.messageReceived.disconnect(watchListen);
			
			//unhighlight all watches
			Messages.sendMessage("shelfWatchNotify", "unhighlight");
			
			//highlight this watch
			Selection.addToSelectedItemsList(LIST_NAME, ITEM_TYPE, _selfEntityID);
			
			//make this watch selectable
			isSelectable = true;
		}
		//global highlight
		else if(message === "highlight")
		{
			Selection.addToSelectedItemsList(LIST_NAME, ITEM_TYPE, _selfEntityID);
		}
		//global unhighlight
		else if(message === "unhighlight")
		{
			Selection.removeFromSelectedItemsList(LIST_NAME, ITEM_TYPE, _selfEntityID);
		}
	});
	
	//if selectable, delete self when clicked and spawn thresholdZone
	this.mousePressOnEntity = function()
	{
		if(isSelectable)
		{			
			Messages.sendMessage("zoneSpawner", "spawnThresholdZone");
			
			Entities.deleteEntity(_selfEntityID);
		}
	};
});

