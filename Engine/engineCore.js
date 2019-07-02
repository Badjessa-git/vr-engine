//Finite State Machine

//Urls for animations
var firstAnimationURL = "var firstAnimationURL = "atp:/1592e15e-c822-41aa-b314-4ef261e5d843-v1/20190702-205132.hfr";";
var secondAnimationURL = "atp:/20190702-203823.hfr";

var activeAnimationURL;
var idleAnimationURL;

//Text for menu options
var activeMenuOptions;

//specify counter to keep track of animation cycles
var count = 0;

//Subscribe to message channel
Messages.subscribe("engine");

//Helper function for animation player
function animationHelper()
{
	count = 0;
	Script.update.connect(play);
}

//play animation
function play()
{
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
			//TODO fix menuspawner
			menuSpawner(activeMenuOptions);
			Recording.stopPlaying();
			Script.update.disconnect(play);
		}
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
	Script.update.connect(play);
	
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
	});
}

function state1()
{
	//test log
	print("Now entering state1");

	//set animation parameters and play animation
	activeAnimationURL = firstAnimationURL;
	activeMenuOptions = "check|Go to state2|Go to state2|Go to state2|Go to state2";
	Script.update.connect(play);
	
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
	});
}

function state2()
{
	//test log
	print("Now entering state2");

	//set animation parameters and play animation
	activeAnimationURL = firstAnimationURL;
	activeMenuOptions = "check|Go to state1|Go to state1|Go to state1|Go to state1";
	Script.update.connect(play);
	
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
	});
}

//Call initialState
initialState();
