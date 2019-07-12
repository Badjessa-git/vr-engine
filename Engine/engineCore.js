//Finite State Machine

//Urls for animations
var firstAnimationURL = "atp:/Animations/20190712-181953.hfr";
var secondAnimationURL = "atp:/Animations/20190712-182011.hfr";

var activeAnimationURL;
var idleAnimationURL;

//Text for menu options
var activeMenuOptions;

//Audio for menu options
var dialogueAudio = ["atp:/Audio/Option1.mp3", 
		     "atp:/Audio/Option2.mp3", 
		     "atp:/Audio/Option3.mp3", 
		     "atp:/Audio/Option4.mp3"];

//specify counter to keep track of animation cycles
var count = 0;

//Subscribe to message channel
Messages.subscribe("engine");

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
	Recording.loadRecording(activeAnimationURL);

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
			menuSpawner(activeMenuOptions);
			Recording.stopPlaying();
			count = 0;
			Script.update.disconnect(play);
		}
	}
}

//Read all options in sequence recursively
function readOptions(index)
{
	//Base case, array of urls has been iterated through
	if(index === dialogueAudio.length)
	{
		//send message to unlock text boxes
		Messages.sendMessage("readingNotice", "toggle lock");
		return;
	}
	
	sound = SoundCache.getSound(dialogueAudio[index]);
	function playSound() 
	{
	    var injector = Audio.playSound(sound);
		
	    //connect signal to trigger next audio
	    injector.finished.connect(function recurse()
	    {
	    	injector.finished.disconnect(recurse);
			readOptions(++index);
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

//spawn menu
function menuSpawner(unprocessedData)
{
	//Send message to entity creator script
	Messages.sendMessage("menuSystem", unprocessedData);
}

//----------------------------------------------------------------------------------------------------------------
//state function declarations

function initialState()
{
	//log
	print("initialState entered");
	
	//set animation parameters and play animation
	activeAnimationURL = firstAnimationURL;
	activeMenuOptions = "check|Go to state1|Go to state1|Go to state1|Go to state1";
	initialAnimationHelper();
	
	//Test print
	print("animation connected to update trigger");
	//listen for message to trigger transition
	Messages.messageReceived.connect(function initialStateListener(channel, message, senderID, localOnly)
	{
		//test print
		print(message);
		//NOTE: Names are sent in HF with quotes, hence the need to include them here
		if(message == "\"option1\"" || message == "\"option2\"" || message == "\"option3\"" || message == "\"option4\"")
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

function state1()
{
	//test log
	print("Now entering state1");

	//set animation parameters and play animation
	activeAnimationURL = secondAnimationURL;
	activeMenuOptions = "check|Go to state2|Go to state2|Go to state2|Go to state2";
	animationHelper();
	
	//listen for message to trigger transition
	Messages.messageReceived.connect(function state1Listener(channel, message, senderID, localOnly)
	{
		//test print
		print(message);
		if(message == "\"option1\"" || message == "\"option2\"" || message == "\"option3\"" || message == "\"option4\"")
		{
			Messages.messageReceived.disconnect(state1Listener);
			state2();
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

function state2()
{
	//test log
	print("Now entering state2");

	//set animation parameters and play animation
	activeAnimationURL = firstAnimationURL;
	activeMenuOptions = "check|Go to state1|Go to state1|Go to state1|Go to state1";
	animationHelper();
	
	//listen for message to trigger transition
	Messages.messageReceived.connect(function state2Listener(channel, message, senderID, localOnly)
	{
		//test print
		print(message);
		if(message == "\"option1\"" || message == "\"option2\"" || message == "\"option3\"" || message == "\"option4\"")
		{
			Messages.messageReceived.disconnect(state2Listener);
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

//Call initialState
initialState();
