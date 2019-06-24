//Finite State Machine

//Urls for animations
var firstAnimationURL = "atp:/20190606-185600.hfr";
var secondAnimationURL = "atp:/20190618-182303.hfr";

var activeAnimationURL;
var idleAnimationURL;

//Specify boolean flag to keep track of whether animation has ended
var flag = false;

//Subscribe to message channel
Messages.subscribe("engine");

//play animation
function play()
{
	var PLAYBACK_CHANNEL = "playbackChannel";

	Recording.loadRecording(activeAnimationURL);
	
	Recording.setPlayFromCurrentLocation(false);
	Recording.setPlayerUseDisplayName(true);
	Recording.setPlayerUseAttachments(true);
	Recording.setPlayerUseHeadModel(false);
	Recording.setPlayerLoop(false);
	Recording.setPlayerUseSkeletonModel(true);
	Agent.isAvatar = true;
	
	if (Recording.isPlaying()) 
	{
		Script.update.disconnect(play);
		print("disconnected animation player");

	}
	Recording.setPlayerTime(0.0);
	Recording.startPlaying();
	print(Recording.playerLength());
}

//spawn menu (TODO: spawn proper UI stuffs. Read aloud?)
function menuSpawner(option1, option2, option3)
{
	//compile array
	var array = {option1, option2, option3};
	
	//Send message to entity creator script
	Messages.sendData("entitySpawner", array.buffer);
	print("menu spawner contacted");
}

//Can store user selection as received from textBoxScript
Messages.messageReceived.connect(function(channel, message, senderID, localOnly)
{
	//for now, just print
	print(message);
}
//----------------------------------------------------------------------------------------------------------------
//state function declarations

var state1 = function()
{
	//animation logic
	/*
	activeAnimationURL = firstAnimationURL;
	Script.update.connect(play);
	print("connected animation player");
	*/
	menuSpawner("From the weakness","of the mind","Omnissiah save us");
};

//var state2 = //similar function to above
//var state3 = //similar funciton to above
//etc

//The active state will be changed to 
//whatever the current state is
var activeState = state1;

//Call activeState in a loop
while(true)
{
	activeState();
	break;
}
