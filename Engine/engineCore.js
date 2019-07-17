/*
CONTENTS

Basic setup
Execute State
Animation functions
Audio functions
*/

/*************************BASIC SETUP*************************/
//activeState will be referenced by the main controller function
var activeState = state0;

//specify counter to keep track of animation cycles
var count = 0;

//Subscribe to message channel to receive notices from other scripts
Messages.subscribe("engine");

/*************************EXECUTE STATE*************************/
function executeState()
{
	//log
	print("State transition occured");
	
	//set animation parameters and play animation
	initialAnimationHelper();
	
	//Test print
	print("animation connected to update trigger");
	//listen for message to trigger transition
	Messages.messageReceived.connect(function initialStateListener(channel, message, senderID, localOnly)
	{
		//test print
		print(message);
		//NOTE: Names are sent in HF with quotes, hence the need to include them here
		if(message == "\"0\"" || message == "\"1\"" || message == "\"2\"" || message == "\"3\"")
		{
			Messages.messageReceived.disconnect(initialStateListener);
			state1();
		}
		//respond to repeat button
		if(message == "repeatAudio")
		{
			//Send message to lock text boxes
			Messages.sendMessage("readingNotice", "toggle lock");
			readOptions(0);
		}
	});
}

/*************************ANIMATION*************************/
//Initial state requires that there be a higher count limit. 
//Reasons unknown. Possibly due to running during load?
//This funciton is in place to circumvent this issue.
function initialAnimationHelper()
{
	Script.update.connect(play);
}

//Helper function for animation player
function animationHelper()
{
	count = 1;
	Script.update.connect(play);
}

//play animation
function play()
{
	//log
	print("animation controller called");
	
	var PLAYBACK_CHANNEL = "playbackChannel";
	Recording.loadRecording(activeState.animationURL);

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
		
		if(count > 2)
		{ 
			menuSpawner(activeState.dialogue);
			Recording.stopPlaying();
			count = 0;
			Script.update.disconnect(play);
		}
	}
}
/*************************AUDIO*************************/
//Read all options in sequence
function readOptions(audioURL1, audioURL2, audioURL3, audioURL4)
{
	//call playAudio to play the first dialogue audio 
	var injector = playAudio(audioURL1);
	//Connect to signal to play next audio after first is done
	injector.finished.connect(function recurse()
	{
	   	injector.finished.disconnect(recurse);
		//call playAudio to play the second dialogue audio 
		injector = playAudio(audioURL2);
		injector.finished.connect(function recurse()
		{
			injector.finished.disconnect(recurse);
			//call playAudio to play the second dialogue audio 
			injector = playAudio(audioURL3);
			injector.finished.connect(function recurse()
			{
				injector.finished.disconnect(recurse);
				//call playAudio to play the second dialogue audio 
				injector = playAudio(audioURL4);
				injector.finished.connect(function recurse()
				{
					injector.finished.disconnect(recurse);
				});
			});
		});
	});
}

//Play an MP3 file from a url in the current state's audio array
function playAudio(audioURL)
{
	sound = SoundCache.getSound(audioURL);
	function playSound() 
	{
	    var injector = Audio.playSound(sound);
		return injector;
	}

	function onSoundReady() 
	{
	    sound.ready.disconnect(onSoundReady);
	    playSound();
	}

	if (sound.downloaded) 
	{
	    playSound();
	} 
	else 
	{
	    sound.ready.connect(onSoundReady);
	}
}
/*************************STATE DEFINITIONS*************************/
var state0
{
	//HF asset browser URL of animation to be played upon state entering
	animationURL: "atp:/Animations/WalkTest1.hfr",
	
	//Response options to be presented to player
	option1: {
		//Text to be contained within option
		dialogue: "option1",
		//HF asset browser URL of voiceover for dialogue
		audioURL: "atp:/Audio/Option1.mp3",
		//Index of state to transition to when option is selected
		transition: state1
	},
	option2: {
		dialogue: "option2",
		audioURL: "atp:/Audio/Option2.mp3",
		transition: state1
	},
	option3: {
		dialogue: "option3",
		audioURL: "atp:/Audio/Option3.mp3",
		transition: state1
	},
	option4: {
		dialogue: "option4",
		audioURL: "atp:/Audio/Option4.mp3",
		transition: state1
	}
},
var state1
{
	animationURL: "atp:/Animations/WalkTest2.hfr",
	
	option1: {
		dialogue: "option1",
		audioURL: "atp:/Audio/Option1.mp3",
		transition: state0
	},
	option2: {
		dialogue: "option2",
		audioURL: "atp:/Audio/Option2.mp3",
		transition: state0
	},
	option3: {
		dialogue: "option3",
		audioURL: "atp:/Audio/Option3.mp3",
		transition: state0
	},
	option4: {
		dialogue: "option4",
		audioURL: "atp:/Audio/Option4.mp3",
		transition: state0
	}
}
