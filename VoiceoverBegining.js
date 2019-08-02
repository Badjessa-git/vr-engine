//NOTE: This needs to be re-written, recommend implementing inside engineCore instead

//sets scene before interaction with Manager
Messages.subscribe("checkOut");
function play(sound_url, time){

	function playSound(sound_url) {
		var injectorOptions = {
			position: MyAvatar.position
		};
		var injector = Audio.playSound(sound_url, injectorOptions);
		
	}

	function onSoundReady() {
		sound_url.ready.disconnect(onSoundReady);
		playSound(sound_url);
	}

	if (sound_url.downloaded) {
	   // Start playing only after a short while.
		Script.setTimeout(function () { playSound(sound_url);}, time); 
		
	} else {
		sound_url.ready.connect(onSoundReady);
	}
}


play(SoundCache.getSound("atp:/Voice Over - File 1.mp3"), 1000);
play(SoundCache.getSound("atp:/Voice Over - File 2.mp3"), 50000);
play(SoundCache.getSound("atp:/Voice Over - File 3.mp3"), 78000);
play(SoundCache.getSound("atp:/Voice Over - File 4.mp3"), 85000);
//trigger after in front of mirror (not implemented...they just get a lot of time)
play(SoundCache.getSound("atp:/Voice Over - File 6.mp3"), 1050000);
play(SoundCache.getSound("atp:/Voice Over - File 7.mp3"), 1450000); 

//after interaction with cashier

function cashier (channel, data, sender, localOnly){
	play(SoundCache.getSound("atp:/Voice Over - File 9.mp3"), 1000);
	play(SoundCache.getSound("atp:/Voice Over - File 10.mp3"), 15000);
}

Messages.messageReceived.connect(cashier);
