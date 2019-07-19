/*
CONTENTS

State definitions
Basic setup
Execute State
Animation functions
Audio functions
*/

/*************************STATE DEFINITIONS*************************/

var initialState = {
	//HF asset browser URL of animation to be played upon state entering
	animationURL: "atp:/Animations/WalkTest2.hfr",
	
	//Response options to be presented to player
	option1: {
		//Text to be contained within option
		dialogue: "You are in initialState",
		//HF asset browser URL of voiceover for dialogue
		audioURL: "atp:/Audio/Option1.mp3",
		//ID of state to transition to when option is selected
		transition: "state0"
	},
	option2: {
		dialogue: "option2",
		audioURL: "atp:/Audio/Option2.mp3",
		transition: "state0"
	},
	option3: {
		dialogue: "option3",
		audioURL: "atp:/Audio/Option3.mp3",
		transition: "state0"
	},
	option4: {
		dialogue: "option4",
		audioURL: "atp:/Audio/Option4.mp3",
		transition: "state0"
	}
};

var state0 = {
	animationURL: "atp:/Animations/WalkTest1.hfr",
	
	option1: {
		dialogue: "You are in state0",
		audioURL: "atp:/Audio/Option1.mp3",
		transition: "state1"
	},
	option2: {
		dialogue: "option2",
		audioURL: "atp:/Audio/Option2.mp3",
		transition: "state1"
	},
	option3: {
		dialogue: "option3",
		audioURL: "atp:/Audio/Option3.mp3",
		transition: "state1"
	},
	option4: {
		dialogue: "option4",
		audioURL: "atp:/Audio/Option4.mp3",
		transition: "state1"
	}
};

var state1 = {
	animationURL: "atp:/Animations/WalkTest2.hfr",
	
	option1: {
		dialogue: "You are in state1",
		audioURL: "atp:/Audio/Option1.mp3",
		transition: "state0"
	},
	option2: {
		dialogue: "option2",
		audioURL: "atp:/Audio/Option2.mp3",
		transition: "state0"
	},
	option3: {
		dialogue: "option3",
		audioURL: "atp:/Audio/Option3.mp3",
		transition: "state0"
	},
	option4: {
		dialogue: "option4",
		audioURL: "atp:/Audio/Option4.mp3",
		transition: "state0"
	}
};

//Declare ID-state mappings
var stateMap = {
	"initialState": initialState,
	"state0": state0,
	"state1": state1
};

/*************************BASIC SETUP*************************/
//activeState will be referenced by the main controller function
var activeState = initialState;

//specify counter to keep track of animation cycles
var count = 0;
//this flag keeps track of whether it is currently the initial state
var initFlag = true;

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
	if(initFlag)
	{
		initialAnimationHelper();
	}
	else
	{
		animationHelper();
	}

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
				playAudio(activeState.option1.audioURL);
				activeState = stateMap[activeState.option1.transition];
				executeStateHelper();
				break;
			case "\"1\"":
				Messages.messageReceived.disconnect(stateListener);
				playAudio(activeState.option2.audioURL);
				activeState = stateMap[activeState.option2.transition];
				executeStateHelper();
				break;
			case "\"2\"":
				Messages.messageReceived.disconnect(stateListener);
				playAudio(activeState.option3.audioURL);
				activeState = stateMap[activeState.option3.transition];
				executeStateHelper();
				break;
			case "\"3\"":
				Messages.messageReceived.disconnect(stateListener);
				playAudio(activeState.option4.audioURL);
				activeState = stateMap[activeState.option4.transition];
				executeStateHelper();
				break;
			case "repeatAudio":
				//Send message to lock text boxes
				Messages.sendMessage("readingNotice", "toggle lock");
				readOptionsHelper(activeState.option1.audioURL, activeState.option2.audioURL, activeState.option3.audioURL, activeState.option4.audioURL);
		}
	});
}

//starts execution of next state after reading of dialogue has finished
function executeStateHelper()
{
	Messages.messageReceived.connect(function check(channel, message, senderID, localOnly)
	{
		if(message === "audioFinished")
		{
			Messages.messageReceived.disconnect(check);
			executeState();
		}
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
	readOptionsHelper(activeState.option1.audioURL, activeState.option2.audioURL, activeState.option3.audioURL, activeState.option4.audioURL);
}

/*************************ANIMATION*************************/
//Initial state requires that there be a higher count limit. 
//Reasons unknown. Possibly due to running during load?
//Count is set to 0 at first and then set to 1 in animationHelper()
//to circumvent this issue.
function initialAnimationHelper()
{
	initFlag = false;
	Script.update.connect(play);
}

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
			Script.update.disconnect(play);
			menuSpawner(activeState.option1.dialogue, activeState.option2.dialogue, activeState.option3.dialogue, activeState.option4.dialogue);
			Recording.stopPlaying();
			count = 0;
		}
	}
}
/*************************AUDIO*************************/
//package 4 audio urls for readOptions to play sequentially
function readOptionsHelper(audio1, audio2, audio3, audio4)
{
	var array = [audio1, audio2, audio3, audio4];
	readOptions(array, 0);
}

//Play all audio URLs recursively from given array index
function readOptions(array, index)
{
	//Base case, array of urls has been iterated through
	if(index === array.length)
	{
		//send message to unlock text boxes
		Messages.sendMessage("readingNotice", "toggle lock");
		return;
	}
	
	sound = SoundCache.getSound(array[index]);
	function playSound() 
	{
	    var injector = Audio.playSound(sound);
		
	    //connect signal to trigger next audio
	    injector.finished.connect(function recurse()
	    {
	    	injector.finished.disconnect(recurse);
			readOptions(array, ++index);
	    });
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

//Play an MP3 file from a url in the current state's audio array
function playAudio(audioURL)
{
	sound = SoundCache.getSound(audioURL);
	function playSound() 
	{
	    var injector = Audio.playSound(sound);
		injector.finished.connect(function message()
		{
			injector.finished.disconnect(message);
			Messages.sendMessage("engine", "audioFinished");
		});
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
