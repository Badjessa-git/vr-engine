// Receiving script.
Messages.subscribe("101");
Messages.messageReceived.connect(play);

function play (channel, data, sender, localOnly){
	if(data === "hi")
	{
		var PLAYBACK_CHANNEL = "playbackChannel";

		Recording.loadRecording("atp:/fall.hfr");

		Recording.setPlayFromCurrentLocation(false);
		Recording.setPlayerUseDisplayName(true);
		Recording.setPlayerUseAttachments(true);
		Recording.setPlayerUseHeadModel(false);
		Recording.setPlayerLoop(false);
		Recording.setPlayerUseSkeletonModel(true);

		Agent.isAvatar = true;
		if (!Recording.isPlaying()) 
		{
			//robo
			Recording.setPlayerTime(0.0);
			Recording.startPlaying();
			
		}
		Script.update.connect(update);
	}
	if(data === "fi")
	{
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
			//woody
			Recording.setPlayerTime(0.0);
			Recording.startPlaying();
			
		}
		Script.update.connect(update);
	}
}






