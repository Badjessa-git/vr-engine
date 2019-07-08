var sound = SoundCache.getSound("atp:/AudioEx.mp3");

function playSound() {
    var injectorOptions = {
        position: MyAvatar.position
    };
    var injector = Audio.playSound(sound, injectorOptions);
}

function onSoundReady() {
    sound.ready.disconnect(onSoundReady);
    playSound();
}

if (sound.downloaded) {
    playSound();
} else {
    sound.ready.connect(onSoundReady);
}