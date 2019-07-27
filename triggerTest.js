
//when server loads automatically loads default animation

//will change animation via clicks

var loc = false;

var url = "atp:/ClerkIdle.hfr";

// default animation

function startAn(){

	var PLAYBACK_CHANNEL = "playbackChannel";

	Recording.loadRecording(url);



	Recording.setPlayFromCurrentLocation(loc);

	Recording.setPlayerUseDisplayName(true);

	Recording.setPlayerUseAttachments(true);

	Recording.setPlayerLoop(false);





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

	Recording.setPlayerTime(0.0);

		

		if(data === "hi"){

			url = "atp:/RingUp.hfr";

		}



		if(data === "fi"){

			url = "atp:/meh.hfr";

		}





}