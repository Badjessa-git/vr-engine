


var update = function (){
	var PLAYBACK_CHANNEL = "playbackChannel";
	Recording.loadRecording("atp:/meh.hfr");

	Recording.setPlayFromCurrentLocation(false);
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
Script.update.connect(update);

