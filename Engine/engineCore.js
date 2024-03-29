//This assignment client script contains all logic to control the store manager,
//as well as all the logic that progresses through the simulation's states
/*
CONTENTS

State definitions
Basic setup
Execute State
Animation functions
Audio functions
*/

/*************************STATE DEFINITIONS*************************/
var state1 = {
	//ID of state to transition to next
	transition: "state2",
	
	//Response options to be presented to player
	option1: {
		//Text to be contained within option
		dialogue: "Do you really think that I would be stealing from you?",
		//HF asset browser URL of voiceover for dialogue
		audioURL: "atp:/Audio/JD1D1.mp3",
		//HF asset browser URL of animation to be played when selected
		animationURL: "atp:/Animations/Bill1D.hfr"
	},
	option2: {
		dialogue: "Yes, I just purchased this and put it in my bag.",
		audioURL: "atp:/Audio/JD1N1.mp3",
		animationURL: "atp:/Animations/Bill1N1.hfr"
	},
	option3: {
		dialogue: "I put the watch in my bag because I just bought it.",
		audioURL: "atp:/Audio/JD1N2.mp3",
		animationURL: "atp:/Animations/Bill1N2.hfr"
	},
	option4: {
		dialogue: "Yes, what do you need to verify that I purchased these?",
		audioURL: "atp:/Audio/JD1C1.mp3",
		animationURL: "atp:/Animations/Bill1C.hfr"
	}
};

var state2 = {
	transition: "state3",
	
	option1: {
		dialogue: "Well, I’m not stealing anything from you." + 
				  "You know what you are doing is called racial profiling.",
		audioURL: "atp:/Audio/JD2D1.mp3",
		animationURL: "atp:/Animations/Bill2D.hfr"
	},
	option2: {
		dialogue: "I did not steal anything from you. " +
				  "I purchased this item, and I have a receipt.",
		audioURL: "atp:/Audio/JD2N1.mp3",
		animationURL: "atp:/Animations/Bill2N1.hfr"
	},
	option3: {
		dialogue: "My receipt shows that I purchased this watch. " + 
				  "I would never steal it from your store.",
		audioURL: "atp:/Audio/JD2N2.mp3",
		animationURL: "atp:/Animations/Bill2N2.hfr"
	},
	option4: {
		dialogue: "I’m sorry if it looked like I stole something, " +
				  "but I wouldn’t steal anything from this store.",
		audioURL: "atp:/Audio/JD2C1.mp3",
		animationURL: "atp:/Animations/Bill2C.hfr"
	}
};

var state3 = {
	transition: "state4",
	
	option1: {
		dialogue: "I already told you that I would not " +
				  "steal anything from here, " +
				  "so I would appreciate it if you would stop harassing me.",
		audioURL: "atp:/Audio/JD3D1.mp3",
		animationURL: "atp:/Animations/Bill3D.hfr"
	},
	option2: {
		dialogue: "I just bought this watch a few minutes ago, " +
				  "and have my own bag. That’s why you saw me " +
				  "put it in there.",
		audioURL: "atp:/Audio/JD3N1.mp3",
		animationURL: "atp:/Animations/Bill3N1.hfr"
	},
	option3: {
		dialogue: "I didn’t need a store bag because I brought " +
				  "my backpack to the store today. " +
				  "I didn’t think it would be an issue.",
		audioURL: "atp:/Audio/JD3N2.mp3",
		animationURL: "atp:/Animations/Bill3N2.hfr"
	},
	option4: {
		dialogue: "I didn’t mean for it to look suspicious or anything. " +
				  "I can show you my receipt right now if that would help.",
		audioURL: "atp:/Audio/JD3C1.mp3",
		animationURL: "atp:/Animations/Bill3C.hfr"
	}
};

var state4 = {
	transition: "state5",
	
	option1: {
		dialogue: "Please don’t touch me or my bag. " +
				  "I know my rights and you’re obviously breaking the law.",
		audioURL: "atp:/Audio/JD4D1.mp3",
		animationURL: "atp:/Animations/Bill4D.hfr"
	},
	option2: {
		dialogue: "As I said, I just purchased these. " +
				  "There is no need to check me or my bag.",
		audioURL: "atp:/Audio/JD4N1.mp3",
		animationURL: "atp:/Animations/Bill4N1.hfr"
	},
	option3: {
		dialogue: "I just purchased this watch, " +
				  "and you can check the security camera if you need proof.",
		audioURL: "atp:/Audio/JD4N2.mp3",
		animationURL: "atp:/Animations/Bill4N2.hfr"
	},
	option4: {
		dialogue: "You can look in my bag if you’d like, " +
				  "but I don’t think it’s necessary to search me.",
		audioURL: "atp:/Audio/JD4C1.mp3",
		animationURL: "atp:/Animations/Bill4C.hfr"
	}
};

var state5 = {
	//TODO: Change transition to a final state
	//and handle restart of simulation
	transition: "state1",
	
	option1: {
		dialogue: "Are you kidding me? Go ahead and call the police " +
				  "so I can tell them how you won’t stop harassing me ",
		audioURL: "atp:/Audio/JD5D1.mp3",
		animationURL: "atp:/Animations/Bill5D.hfr"
	},
	option2: {
		dialogue: "I am sure we can figure this out without the police " +
				  "getting involved. There has to be another way to solve this.",
		audioURL: "atp:/Audio/JD5N1.mp3",
		animationURL: "atp:/Animations/Bill5N1.hfr"
	},
	option3: {
		dialogue: "No need to call the police and make a scene in the store. " +
				  "I’m sure you and I can work this out. ",
		audioURL: "atp:/Audio/JD5N2.mp3",
		animationURL: "atp:/Animations/Bill5N2.hfr"
	},
	option4: {
		dialogue: "Ok, I’ll go to the back, but I really do have a receipt. " +
				  "I didn’t mean for this to cause a scene.",
		audioURL: "atp:/Audio/JD5C1.mp3",
		animationURL: "atp:/Animations/Bill5C.hfr"
	}
};

//Declare ID-state mappings
var stateMap = {
	"state1": state1,
	"state2": state2,
	"state3": state3,
	"state4": state4,
	"state5": state5
};

/*************************BASIC SETUP*************************/
//activeState will be referenced by the main controller function
var activeState = state1;

//Initialize stateless animation URLs
var firstManagerURL = "atp:/Animations/Bill1.hfr";
var clerkIdleURL = "atp:/Animations/ClerkIdle.hfr";
var clerk1URL = "atp:/Animations/Clerk1.hfr";
var clerk2URL = "atp:/Animations/Clerk2.hfr";
var clerk3URL = "atp:/Animations/Clerk3.hfr";
var animationURL = clerkIdleURL;

//specify counter to keep track of animation cycles
var count = 0;
//this flag keeps track of whether the animation is the first animation for that character
var initFlag = true;

//Subscribe to message channel to receive notices from other scripts
Messages.subscribe("engine");

//TODO: MOVE TO RESET SYSTEM WHEN RESET SYSTEM IS IMPLEMENTED
Messages.sendMessage("shelfWatchSpawner", "spawnShelfWatches");

//Start the program:
settingScene();

/*************************STARTING LOGIC*************************/
//Handles store clerk animation logic and merchandize/zone related transitions
function settingScene()
{
	//Play clerk idle animation
	initialAnimationHelper();
	
	//Highlight watches
	Messages.sendMessage("shelfWatchNotify", "highlight");
	
	//Listen for message indicating user has entered cashier zone
	Messages.messageReceived.connect(function checkClerk(channel, message, senderID, localOnly)
	{
		if(message === "\"cashierZone\"")
		{	
			//Stop listening for cashier zone
			Messages.messageReceived.disconnect(checkClerk);
			
			//play clerk discussion animation
			animationURL = clerk1URL;
			animationHelper();
			
			//Listen for animation finished
			Messages.messageReceived.connect(function checkAnimation(channel, message, senderID, localOnly)
			{
				if(message === "animationFinished")
				{
					Messages.messageReceived.disconnect(checkAnimation);
					
					//Spawn watch selection
					Messages.sendMessage("watchSpawner", "spawnWatches");
				}
			});
		}
	});
	
	//Listen for when a watch is selected to purchase
	Messages.messageReceived.connect(function checkWatch(channel, message, senderID, localOnly)
	{
		if(message === "watchSelected")
		{
			Messages.messageReceived.disconnect(checkWatch);
			
			//play clerk ringup animation
			animationURL = clerk2URL;
			animationHelper();
			
			//Listen for animation finished
			Messages.messageReceived.connect(function checkAnimation(channel, message, senderID, localOnly)
			{
				if(message === "animationFinished")
				{
					Messages.messageReceived.disconnect(checkAnimation);
					
					//Spawn payment options
					Messages.sendMessage("paymentOptionSpawner", "spawnPaymentOptions");
				}
			});
		}
	});
	
	//Listen for payment option selection
	Messages.messageReceived.connect(function checkPayment(channel, message, senderID, localOnly)
	{
		if(message === "paymentProcessed")
		{
			Messages.messageReceived.disconnect(checkPayment);
			
			//play clerk animation prompting user to take watch from other room
			animationURL = clerk3URL;
			animationHelper();
		}
	});
	
	//Listen for thresholdZone notice, when received trigger manager
	Messages.messageReceived.connect(function checkThreshold(channel, message, senderID, localOnly)
	{
		if(message === "\"thresholdZone\"")
		{
			Messages.messageReceived.disconnect(checkThreshold);
			
			initFlag = true;
			animationURL = firstManagerURL;
			
			executeStateHelper();
		}
	});
}

/*************************EXECUTE STATE*************************/
//handles all post/pre-processing of events for each state
function executeStateHelper()
{	
	//If in initial state, play the animation and transition to next state
	if(initFlag)
	{
		animationHelper();
		
		Messages.messageReceived.connect(function checkAnimation(channel, message, senderID, localOnly)
		{
			if(message === "animationFinished")
			{						
				Messages.messageReceived.disconnect(checkAnimation);
				
				//spawn menu and then execute state
				menuSpawner(activeState.option1.dialogue, activeState.option2.dialogue, activeState.option3.dialogue, activeState.option4.dialogue);
				executeState();
			}
		});
	}
	else
	{
		Messages.messageReceived.connect(function checkAudio(channel, message, senderID, localOnly)
		{
			if(message === "audioFinished")
			{
				Messages.messageReceived.disconnect(checkAudio);
			
				//Set activeState to next state in list
				activeState = stateMap[activeState.transition];
			
				//Play animation from previous state
				animationHelper();
				
				Messages.messageReceived.connect(function checkAnimation(channel, message, senderID, localOnly)
				{
					if(message === "animationFinished")
					{						
						Messages.messageReceived.disconnect(checkAnimation);
						
						//spawn menu and then execute state
						menuSpawner(activeState.option1.dialogue, activeState.option2.dialogue, activeState.option3.dialogue, activeState.option4.dialogue);
						executeState();
					}
				});
			}
		});
	}
}

function executeState()
{
	//log
	print("State transition complete");

	//listen for message to trigger transition
	Messages.messageReceived.connect(function stateListener(channel, message, senderID, localOnly)
	{
		//test print
		print(message);
		
		switch(message)
		{
			case "\"0\"": //NOTE: Names are sent in HF with quotes, hence the need to include them here
				Messages.messageReceived.disconnect(stateListener);
				//If first option is selected, play the associated audio and set animation
				playAudio(activeState.option1.audioURL);
				animationURL = activeState.option1.animationURL;
				executeStateHelper();
				break;
			case "\"1\"":
				Messages.messageReceived.disconnect(stateListener);
				playAudio(activeState.option2.audioURL);
				animationURL = activeState.option2.animationURL;
				executeStateHelper();
				break;
			case "\"2\"":
				Messages.messageReceived.disconnect(stateListener);
				playAudio(activeState.option3.audioURL);
				animationURL = activeState.option3.animationURL;
				executeStateHelper();
				break;
			case "\"3\"":
				Messages.messageReceived.disconnect(stateListener);
				playAudio(activeState.option4.audioURL);
				animationURL = activeState.option4.animationURL;
				executeStateHelper();
				break;
			case "repeatAudio":
				//Send message to lock text boxes
				Messages.sendMessage("readingNotice", "toggle lock");
				readOptionsHelper(activeState.option1.audioURL, activeState.option2.audioURL, activeState.option3.audioURL, activeState.option4.audioURL);
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
	//Set animation parameters
	var PLAYBACK_CHANNEL = "playbackChannel";


	if(initFlag)
	{
		Recording.setPlayFromCurrentLocation(false);
	}
	else
	{
		Recording.setPlayFromCurrentLocation(true);
	}
	Recording.setPlayerUseDisplayName(true);
	Recording.setPlayerUseAttachments(true);
	Recording.setPlayerUseSkeletonModel(true);
	
	Recording.loadRecording(animationURL);

	Agent.isAvatar = true;
	//start recording
	if (!Recording.isPlaying())
	{
		//if play function has been called too many times, disconnect and stop animation
		if(count > 1)
		{ 
			//test print
			print("stopping animation");
	
			Script.update.disconnect(play);
			Recording.stopPlaying();
			
			initFlag = false;
			
			//Notify rest of engine that animation has completed
			Messages.sendMessage("engine", "animationFinished");
		}
		else
		{
			Recording.setPlayerTime(0.0);
			Recording.startPlaying();
			count++;
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