
var count = 0;
var play = function (){
	var PLAYBACK_CHANNEL = "playbackChannel";
	Recording.loadRecording("atp:/meh.hfr");

	Recording.setPlayFromCurrentLocation(false);
	Recording.setPlayerUseDisplayName(true);
	Recording.setPlayerUseAttachments(true);
	Recording.setPlayerUseSkeletonModel(true);

	Agent.isAvatar = true;
	if (!Recording.isPlaying()) 
	{
		Recording.setPlayerTime(0.0);
		Recording.startPlaying();
		count++;
		
		if(count>2){
			Messages.sendMessage("entitySpawner", "bishPLAY");
			Recording.stopPlaying();
			Script.update.disconnect(play);
		}
		
	}
	
}
Script.update.connect(play);
