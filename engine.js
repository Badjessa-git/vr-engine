//Finite State Machine

var activeAnimationURL;

//Text for menu options
var activeMenuOptions;

//specify counter to keep track of animation cycles
var count;

//Subscribe to message channel
Messages.subscribe("engine");

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

//spawn menu
function menuSpawner(unprocessedData)
{
	//Send message to entity creator script
	Messages.sendMessage("menuSystem", unprocessedData);
}

//----------------------------------------------------------------------------------------------------------------
//state function declarations

function statechange(animationURL, menuOptions)
{
	//test log
	print("Now entering state1");

	//set animation parameters and play animation
	activeAnimationURL = animationURL;
	activeMenuOptions = menuOptions;
	animationHelper();

	//listen for message to trigger transition
	Messages.messageReceived.connect(function state1Listener(channel, message, senderID, localOnly)
	{
		//test print
		print(message);
		if(message == "\"option1\"" || message == "\"option2\"" || message == "\"option3\"" || message == "\"option4\"")
		{
			Messages.messageReceived.disconnect(state1Listener);

			//NOTE: could have text contents as something else but this allows for easy order changing of dialogue options
			if (textContents == "Do you really think that I would be stealing from you?"){
				newMenuOptions = "check|Well, I’m not stealing anything from you. You know what you are doing is called racial profiling.|I did not steal anything from you. I purchased this item, and I have a receipt.|I’m sorry if it looked like I stole something, but I wouldn’t steal anything from this store.";
				newUrl = "Bill1D";

			}if (textContents == "Yes, I just purchased this and put it in my bag."){
				newMenuOptions = "check|Well, I’m not stealing anything from you. You know what you are doing is called racial profiling.|I did not steal anything from you. I purchased this item, and I have a receipt.|I’m sorry if it looked like I stole something, but I wouldn’t steal anything from this store.";
				newUrl = "Bill1N1";

			}if (textContents == "I put the sunglasses in my bag because I just bought them."){
				newMenuOptions = "check|Well, I’m not stealing anything from you. You know what you are doing is called racial profiling.|I did not steal anything from you. I purchased this item, and I have a receipt.|I’m sorry if it looked like I stole something, but I wouldn’t steal anything from this store.";
				newUrl = "Bill1N2";

			}if (textContents == "I did, I can show you the receipt showing I purchased it?"){
				newMenuOptions = "check|Well, I’m not stealing anything from you. You know what you are doing is called racial profiling.|I did not steal anything from you. I purchased this item, and I have a receipt.|I’m sorry if it looked like I stole something, but I wouldn’t steal anything from this store.";
				newUrl = "Bill1C";
			//2nd round of responses
			}if (textContents == "Well, I’m not stealing anything from you. You know what you are doing is called racial profiling."){
				newMenuOptions = "check|I have never been treated like this in my entire life! I can guarantee you don’t treat your other customers like this|I didn’t need a store bag because I brought my backpack to the store today. I didn’t think it would be an issue.|I just bought this watch a few minutes ago, and have my own bag. That’s why you saw me put them in there.|I didn’t mean for it to look suspicious or anything. I can show you my receipt right now if that would help.";
				newUrl = "Bill2D";

			}if (textContents == "I did not steal anything from you. I purchased this item, and I have a receipt."){
				newMenuOptions = "check|I have never been treated like this in my entire life! I can guarantee you don’t treat your other customers like this|I didn’t need a store bag because I brought my backpack to the store today. I didn’t think it would be an issue.|I just bought this watch a few minutes ago, and have my own bag. That’s why you saw me put them in there.|I didn’t mean for it to look suspicious or anything. I can show you my receipt right now if that would help.";
				newUrl = "Bill2N1";

			}if (textContents == "My receipt shows that I purchased these sunglasses. I would never steal them from your store."){
				newMenuOptions = "check|I have never been treated like this in my entire life! I can guarantee you don’t treat your other customers like this|I didn’t need a store bag because I brought my backpack to the store today. I didn’t think it would be an issue.|I just bought this watch a few minutes ago, and have my own bag. That’s why you saw me put them in there.|I didn’t mean for it to look suspicious or anything. I can show you my receipt right now if that would help.";
				newUrl = "Bill2N2";

			}if (textContents == "I’m sorry if it looked like I stole something, but I wouldn’t steal anything from this store."){
				newMenuOptions = "check|I have never been treated like this in my entire life! I can guarantee you don’t treat your other customers like this|I didn’t need a store bag because I brought my backpack to the store today. I didn’t think it would be an issue.|I just bought this watch a few minutes ago, and have my own bag. That’s why you saw me put them in there.|I didn’t mean for it to look suspicious or anything. I can show you my receipt right now if that would help.";
				newUrl = "Bill2C";

			}if (textContents == "I have never been treated like this in my entire life! I can guarantee you don’t treat your other customers like this "){
				newMenuOptions =  "check|Please don’t touch me or my bag. I know my rights and you’re obviously breaking the law.|As I said, I just purchased these. There is no need to check me or my bag.|I just purchased this pair of sunglasses, and you can check the security camera if you need proof.|You can look in my bag if you’d like, but I don’t think it’s necessary to search me.";
				newUrl = "Bill3D";

			}
			if (textContents == "I just bought these sunglasses a few minutes ago, and have my own bag. That’s why you saw me put them in there."){
				newMenuOptions =  "check|Please don’t touch me or my bag. I know my rights and you’re obviously breaking the law.|As I said, I just purchased these. There is no need to check me or my bag.|I just purchased this pair of sunglasses, and you can check the security camera if you need proof.|You can look in my bag if you’d like, but I don’t think it’s necessary to search me.";
				newUrl = "Bill3N1";

			}
			if (textContents == "I didn’t need a store bag because I brought my backpack to the store today. I didn’t think it would be an issue."){
				newMenuOptions =  "check|Please don’t touch me or my bag. I know my rights and you’re obviously breaking the law.|As I said, I just purchased these. There is no need to check me or my bag.|I just purchased this pair of sunglasses, and you can check the security camera if you need proof.|You can look in my bag if you’d like, but I don’t think it’s necessary to search me.";
				newUrl = "Bill3N2";

			}if (textContents == "I didn’t mean for it to look suspicious or anything. I can show you my receipt right now if that would help."){
				newMenuOptions =  "check|Please don’t touch me or my bag. I know my rights and you’re obviously breaking the law.|As I said, I just purchased these. There is no need to check me or my bag.|I just purchased this pair of sunglasses, and you can check the security camera if you need proof.|You can look in my bag if you’d like, but I don’t think it’s necessary to search me.";
				newUrl = "Bill3C";

			}if (textContents == "Please don’t touch me or my bag. I know my rights and you’re obviously breaking the law."){
				newMenuOptions =  "check|Are you kidding me? Go ahead and call the police so I can tell them how you won’t stop harassing me.|I am sure we can figure this out without the police getting involved. There has to be another way to solve this.|No need to call the police and make a scene in the store. I’m sure you and I can work this out.|Ok, I’ll go to the back, but I really do have a receipt. I didn’t mean for this to cause a scene.";
				newUrl = "Bill4D";

			}
			if (textContents == "As I said, I just purchased these. There is no need to check me or my bag."){
				newMenuOptions =  "check|Are you kidding me? Go ahead and call the police so I can tell them how you won’t stop harassing me.|I am sure we can figure this out without the police getting involved. There has to be another way to solve this.|No need to call the police and make a scene in the store. I’m sure you and I can work this out.|Ok, I’ll go to the back, but I really do have a receipt. I didn’t mean for this to cause a scene.";
				newUrl = "Bill4N1";

			}
			if (textContents == "As I said, I just purchased these. There is no need to check me or my bag.|I just purchased this pair of sunglasses, and you can check the security camera if you need proof."){
				newMenuOptions =  "check|Are you kidding me? Go ahead and call the police so I can tell them how you won’t stop harassing me.|I am sure we can figure this out without the police getting involved. There has to be another way to solve this.|No need to call the police and make a scene in the store. I’m sure you and I can work this out.|Ok, I’ll go to the back, but I really do have a receipt. I didn’t mean for this to cause a scene.";
				newUrl = "Bill4N2";

			}
			if (textContents == "You can look in my bag if you’d like, but I don’t think it’s necessary to search me."){
				newMenuOptions =  "check|Are you kidding me? Go ahead and call the police so I can tell them how you won’t stop harassing me.|I am sure we can figure this out without the police getting involved. There has to be another way to solve this.|No need to call the police and make a scene in the store. I’m sure you and I can work this out.|Ok, I’ll go to the back, but I really do have a receipt. I didn’t mean for this to cause a scene.";
				newUrl = "Bill4C";

			}

			statechange(newUrl, newMenuOptions);
		}
	});
}
//should be triggered from passing zone ect.
//Call initialState
statechange(StartingUrl, "check|Do you really think that I would be stealing from you?|Yes, I just purchased this and put it in my bag.|I put the watch in my bag because I just bought it.|I did, I can show you the receipt showing I purchased it?");
