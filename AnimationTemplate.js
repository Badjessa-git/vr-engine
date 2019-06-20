var play = function (){
	var PLAYBACK_CHANNEL = "playbackChannel";
	Recording.loadRecording(/*Insert animation URL here*/);

	Recording.setPlayFromCurrentLocation(false);
	Recording.setPlayerUseDisplayName(true);
	Recording.setPlayerUseAttachments(true);
	Recording.setPlayerUseHeadModel(false);
	Recording.setPlayerLoop(false);
	Recording.setPlayerUseSkeletonModel(true);

	Agent.isAvatar = true;
	if (Recording.isPlaying()) 
	{
		Script.update.disconnect(play);
	}
	Recording.setPlayerTime(0.0);
	Recording.startPlaying();
}

Script.update.connect(play);
