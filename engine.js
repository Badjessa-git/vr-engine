//Finite State Machine

//Specify urls for the recordings
var firstAnimationURL = "atp:/20190618-182156.hfr";
var secondAnimationURL = "atp:/20190618-182303.hfr";

//Specify boolean flag to keep track of whether animation has ended
var flag = false;

//function to play animation (TODO:only play once)
function play(AnimationURL)
{
	var PLAYBACK_CHANNEL = "playbackChannel";

	Recording.loadRecording(AnimationURL);
	
	Recording.setPlayFromCurrentLocation(false);
	Recording.setPlayerUseDisplayName(true);
	Recording.setPlayerUseAttachments(true);
	Recording.setPlayerUseHeadModel(false);
	Recording.setPlayerLoop(false);
	Recording.setPlayerUseSkeletonModel(true);
	Agent.isAvatar = true;
	
	Recording.startPlaying();
}

//function to spawn menu (TODO: spawn proper UI stuffs. Read aloud?)
function menuSpawner()
{
	//Send message to entity creator script
}

//state function declarations

var state1 = function()
{
	//animation logic
	play(firstAnimationURL);
	//After animation has played once, <---This part is the problem child
	
	menuSpawner();
	
	//Set flag to true to indicate that idle animation should begin
	flag = true;
	while(flag)
	{
		//-switch to relevant idle animation
		//-listen for response

		if(/*response received*/)
		{
			flag = false;
			activeState = //an appropriate state based on response
		}
	}
};

var state2 = //similar function to above
//var state3 = //similar funciton to above
//etc

//The active state will be changed to 
//whatever the current state is
var activeState = state1;

//Call activeState in a loop
while(true)
{
	activeState();
}