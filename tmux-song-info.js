// Set to your preferred music player, 
// currently supports 'iTunes', 'Spotify', 'Audirvana Plus', and Swinsian.

var Players = ['Spotify','Swinsian','iTunes','Audirvana Plus'],
    maxChar = 40; //maximum displayed character

/* ---------------------------------------------------------------- */

function musicPlayerVar(Player) {
    var musicPlayer = Application(Player);
    if (Player == "Audirvana Plus") {
        var trackName = musicPlayer.playingTrackTitle(),
            artistName = musicPlayer.playingTrackArtist(),
            position = musicPlayer.playerPosition(),
            duration = musicPlayer.playingTrackDuration(),
            state = musicPlayer.playerState(),
            pause = "Paused",
            play = "Playing";
    } else if ((Player == "iTunes") || (Player == "Spotify") || (Player == "Swinsian")) {
        var state = musicPlayer.playerState(),
            pause = "paused",
            play = "playing";
        if ((state == play) || (state == pause)) {
            var trackName = musicPlayer.currentTrack.name(),
                artistName = musicPlayer.currentTrack.artist(),
                position = musicPlayer.playerPosition(),
                duration = musicPlayer.currentTrack.duration();
            if (Player == "Spotify") {
                var duration = duration / 1000;
            };
        };
    } else {
        return undefined;
    };
    return {
        musicPlayer : musicPlayer,
        trackName : trackName,
        artistName : artistName,
        position : position,
        duration : duration,
        state : state,
        pause : pause,
        play : play
    };
};

function checkSongInfo(Player) {
    if (Application(Player).running()) {
        if ((state == play) || (state == pause)) {
            var divider = position / duration;
            if (artistName.length > 0) {
                var output = "♫ " + artistName + " - " + trackName;
            } else {
                var output = "♫ " + trackName;
            };
            if (output.length > maxChar) {
                var output =  "♫ " + trackName;
                if (output.length > maxChar) {
                    var output = output.substring(0,(maxChar - 3)) + "...";
                };
            };
            if (state == pause) {
                if (output.substring((maxChar - 3),(maxChar)) == "...") {
                    var output = output.substring(0,(maxChar - 12)) + "... [Paused]";
                } else {
                    if (output.length > maxChar - 9) {
                        var output = output.substring(0,(maxChar - 12)) + "... [Paused]";
                    };
                    var output = output.substring(0,(maxChar - 9)) + " [Paused]";
                };
            };
            var totalChar = output.length,
            progressBar = Math.round(divider * totalChar),
            frontOutput = output.substring(0,(progressBar)),
            backOutput = output.substring((progressBar),totalChar);
        } else {
            return undefined;
        };
    };
    return "#[fg=colour250,bg=colour240] " + frontOutput + "#[fg=colour250,bg=colour237]" + backOutput + " ";
};

for (i = 0; i < Players.length; i++) {
    try {
        if (Application(Players[i]).running()) {
            var musicPlayer = musicPlayerVar(Players[i]).musicPlayer,
                trackName = musicPlayerVar(Players[i]).trackName,
                artistName = musicPlayerVar(Players[i]).artistName,
                position = musicPlayerVar(Players[i]).position,
                duration = musicPlayerVar(Players[i]).duration,
                state = musicPlayerVar(Players[i]).state,
                pause = musicPlayerVar(Players[i]).pause,
                play = musicPlayerVar(Players[i]).play;
            if (!(checkSongInfo(Players[i]) == undefined)) {
                checkSongInfo(Players[i]);
                break;
            } else {
                "";
            };
        };
    } catch (err) {
        ''
    }
};
