
var loc = false;
var url = "atp:/confusion_Record.hfr";
// default animation
//change to FSM using distance from avatar as switch?
function startAn(){
	var PLAYBACK_CHANNEL = "playbackChannel";
	Recording.loadRecording(url);

	Recording.setPlayFromCurrentLocation(loc);
	Recording.setPlayerUseDisplayName(true);
	Recording.setPlayerUseAttachments(true);
	Recording.setPlayerUseHeadModel(false);
	Recording.setPlayerLoop(false);
	Recording.setPlayerUseSkeletonModel(true);

	Agent.isAvatar = true;
	if (!Recording.isPlaying()) 
	{
		Recording.setPlayerTime(0.0);
		Recording.startPlaying();
		
	}
	
}

Script.update.connect(startAn); // believe the issue must lie in here 





// Receiving script.
Messages.subscribe("101");
Messages.messageReceived.connect(play);



function play (channel, data, sender, localOnly){
	loc = true;
	//var PLAYBACK_CHANNEL = "playbackChannel";
		
	
		if(data === "hi"){
			url = "atp:/fall.hfr";
		}

		if(data === "fi"){
			url = "atp:/meh.hfr";
		}

		/*Recording.loadRecording(url);
		Recording.setPlayFromCurrentLocation(true);
		Recording.setPlayerUseDisplayName(true);
		Recording.setPlayerUseAttachments(true);
		Recording.setPlayerLoop(false);
		Agent.isAvatar = true;
		
		
		Recording.setPlayerTime(0.0);
		Recording.startPlaying();		

		Script.update.connect(update);
	*/
}
