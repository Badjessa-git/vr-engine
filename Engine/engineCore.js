/*
CONTENTS
Basic setup
Execute State
Animation functions
Audio functions
*/

/*************************BASIC SETUP*************************/
//activeState will be referenced by the main controller function
var activeState = initialState;

//specify counter to keep track of animation cycles
var count = 0;

//Subscribe to message channel to receive notices from other scripts
Messages.subscribe("engine");

//Start the program:
executeState();

/*************************EXECUTE STATE*************************/
function executeState()
{
	//log
	print("State transition complete");
	
	//set animation parameters and play animation
	Script.update.connect(play);

	//listen for message to trigger transition
	Messages.messageReceived.connect(function stateListener(channel, message, senderID, localOnly)
	{
		//test print
		print(message);
		
		switch(message)
		{
			case "\"0\"": //NOTE: Names are sent in HF with quotes, hence the need to include them here
				Messages.messageReceived.disconnect(stateListener);
				//If first option is selected, set activeState to the transition found under the current state's option1
				var injector = playAudio(activeState.option1.audioURL);
				activeState = activeState.option1.transition;
				executeStateHelper(injector);
				break;
			case "\"1\"":
				Messages.messageReceived.disconnect(stateListener);
				activeState = activeState.option2.transition;
				executeState();
				break;
			case "\"2\"":
				Messages.messageReceived.disconnect(stateListener);
				activeState = activeState.option3.transition;
				executeState();
				break;
			case "\"3\"":
				Messages.messageReceived.disconnect(stateListener);
				activeState = activeState.option4.transition;
				executeState();
				break;
			case "repeatAudio":
				//Send message to lock text boxes
				Messages.sendMessage("readingNotice", "toggle lock");
				readOptions();
		}
	});
}

//starts execution of next state after reading of dialogue has finished
executeStateHelper(injector)
{
	injector.finished.connect(function check()
	{
		injector.finished.disconnect(check());
		executeState();
	});
}

//sends message to the interface script menuSpawner.js (should be found in running scripts in HF)
//containing the 4 dialogue options for the new state, then read all dialogue options
function menuSpawner(dialogue1, dialogue2, dialogue3, dialogue4)
{
	//"check" is needed to ensure that the message came from the engine, 
	//as the menuSpawner tends to receive odd message from an unknown location for some reason
	var output = "check|" + dialogue1 + "|" + dialogue2 + "|" + dialogue3 + "|" + dialogue4;
	Messages.sendMessage("menuSystem", output);
	readOptions();
}

/*************************ANIMATION*************************/
//Initial state requires that there be a higher count limit. 
//Reasons unknown. Possibly due to running during load?
//Count is set to 0 at first and then set to 1 when disconnecting
//the play funciton to circumvent this issue.

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
			menuSpawner(activeState.option1.dialogue, activeState.option2.dialogue, activeState.option3.dialogue, activeState.option4.dialogue);
			Recording.stopPlaying();
			count = 1;
			Script.update.disconnect(play);
		}
	}
}
/*************************AUDIO*************************/
//Read all options in sequence
function readOptions()
{
	//call playAudio to play the first dialogue audio 
	var injector = playAudio(activeState.option1.audioURL);
	//Connect to signal to play next audio after first is done
	injector.finished.connect(function recurse()
	{
	   	injector.finished.disconnect(recurse);
		injector = playAudio(activeState.option2.audioURL);
		injector.finished.connect(function recurse()
		{
			injector.finished.disconnect(recurse);
			injector = playAudio(activeState.option3.audioURL);
			injector.finished.connect(function recurse()
			{
				injector.finished.disconnect(recurse);
				injector = playAudio(activeState.option4.audioURL);
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
var initialState = {
	//HF asset browser URL of animation to be played upon state entering
	animationURL: "atp:/Animations/WalkTest2.hfr",
	
	//Response options to be presented to player
	option1: {
		//Text to be contained within option
		dialogue: "option1",
		//HF asset browser URL of voiceover for dialogue
		audioURL: "atp:/Audio/Option1.mp3",
		//Index of state to transition to when option is selected
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
};

var state0 = {
	animationURL: "atp:/Animations/WalkTest1.hfr",
	
	option1: {
		dialogue: "option1",
		audioURL: "atp:/Audio/Option1.mp3",
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
};

var state1 = {
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
};
