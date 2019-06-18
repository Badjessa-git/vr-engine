
var Mess = false;
// default animation
//change to FSM using distance from avatar as switch?
function startAn(){
	
	var PLAYBACK_CHANNEL = "playbackChannel";
	Recording.loadRecording("atp:/confusion_Record.hfr");

	Recording.setPlayFromCurrentLocation(false);
	Recording.setPlayerUseDisplayName(true);
	Recording.setPlayerUseAttachments(true);
	Recording.setPlayerUseHeadModel(false);
	Recording.setPlayerLoop(false);
	Recording.setPlayerUseSkeletonModel(true);

	Agent.isAvatar = true;
	if (!Recording.isPlaying()) 
	{
		//woody
		Recording.setPlayerTime(0.0);
		Recording.startPlaying();
		
	}
	
}
if (!Mess){
	Script.update.connect(startAn); // believe the issue must lie in here 
}




// Receiving script.
Messages.subscribe("101");
Messages.messageReceived.connect(play);


function play (channel, data, sender, localOnly){
	var url;
	Mess = true;
	
	if(data === "hi"){
		url = "atp:/fall.hfr";
	}	

	if(data === "fi"){
		url = "atp:/meh.hfr";
	}
	var PLAYBACK_CHANNEL = "playbackChannel";

	Recording.loadRecording(url);
	Recording.setPlayFromCurrentLocation(true);
	Recording.setPlayerUseDisplayName(true);
	Recording.setPlayerUseAttachments(true);
	Recording.setPlayerLoop(false);
	Agent.isAvatar = true;

	Recording.setPlayerTime(0.0);
	Recording.startPlaying();		

	Script.update.connect(update);
}
