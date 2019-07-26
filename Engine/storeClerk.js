//This assignment client script controls all logic for animating the store clerk

//animationURLs
var idle = "atp:/Animations/ClerkIdle.hfr";
var ringUp = "atp:/Animations/RingUp.hfr";

//Subscribe to messaging channel "storeClerk"
Messages.subscribe("storeClerk");

//Function plays a given animation on a loop when connected to update signal
var play = function(){
	var PLAYBACK_CHANNEL = "playbackChannel";
	Recording.loadRecording(idle);

	Recording.setPlayFromCurrentLocation(false);
	Recording.setPlayerUseDisplayName(true);
	Recording.setPlayerUseAttachments(true);
	Recording.setPlayerUseHeadModel(false);
	Recording.setPlayerLoop(true);
	Recording.setPlayerUseSkeletonModel(true);

	Agent.isAvatar = true;
	if (!Recording.isPlaying()) 
	{
		Recording.setPlayerTime(0.0);
		Recording.startPlaying();
	}
}

//play(idle);

//start playing idle animation on loop
Script.update.connect(play);
/*
//When message received, stop idle, play ringup, then continue idle
Messages.messageRecieved.connect(function (channel, message, senderID, localOnly)
{
	//stop idle
	Script.update.disconnect(play);
	
	//play ringup animation
	play(
});*/

