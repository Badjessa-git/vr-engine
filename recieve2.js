//when server loads automatically loads default animation
//will change animation via clicks
var loc = false;
var url = "atp:/confusion_Record.hfr";
// default animation
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

Script.update.connect(startAn);


// Receiving script.
Messages.subscribe("101");
Messages.messageReceived.connect(play);


function play (channel, data, sender, localOnly){
	loc = true;
		
		if(data === "hi"){
			url = "atp:/fall.hfr";
		}

		if(data === "fi"){
			url = "atp:/meh.hfr";
		}


}
