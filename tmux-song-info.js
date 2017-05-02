// Set to your preferred music player, 
// currently supports 'iTunes', 'Spotify', 'Audirvana Plus', and Swinsian.

var Players = ['Spotify','Swinsian','iTunes','Audirvana Plus'],
    maxChar = 40; //maximum displayed character

/* ---------------------------------------------------------------- */

var musicPlayer, trackName, artistName, position, duration, state, pause, play;

function musicPlayerVar(Player) {
    musicPlayer = Application(Player);
    if (Player == "Audirvana Plus") {
        trackName = musicPlayer.playingTrackTitle();
        artistName = musicPlayer.playingTrackArtist();
        position = musicPlayer.playerPosition();
        duration = musicPlayer.playingTrackDuration();
        state = musicPlayer.playerState();
        pause = "Paused";
        play = "Playing";
    } else if ((Player == "iTunes") || (Player == "Spotify") || (Player == "Swinsian")) {
        state = musicPlayer.playerState();
        pause = "paused";
        play = "playing";
        if ((state == play) || (state == pause)) {
            trackName = musicPlayer.currentTrack.name();
            artistName = musicPlayer.currentTrack.artist();
            position = musicPlayer.playerPosition();
            duration = musicPlayer.currentTrack.duration();
            if (Player == "Spotify") {
                duration = duration / 1000;
            };
        };
    } else {
        return false;
    };
    return true;
};

function checkSongInfo(Player) {
    if ((state == play) || (state == pause)) {
        var divider = position / duration;
        if ((artistName != null) && (artistName.length > 0)) {
            var output = "♫ " + artistName + " - " + trackName;
        } else {
            var output = "♫ " + trackName;
        };
        if (output.length > maxChar) {
            output =  "♫ " + trackName;
            if (output.length > maxChar) {
                output = output.substring(0,(maxChar - 3)) + "...";
            };
        };
        if (state == pause) {
            if (output.substring((maxChar - 3),(maxChar)) == "...") {
                output = output.substring(0,(maxChar - 12)) + "... [Paused]";
            } else {
                if (output.length > maxChar - 9) {
                    output = output.substring(0,(maxChar - 12)) + "... [Paused]";
                };
                output = output.substring(0,(maxChar - 9)) + " [Paused]";
            };
        };
        var totalChar = output.length,
        progressBar = Math.round(divider * totalChar),
        frontOutput = output.substring(0,(progressBar)),
        backOutput = output.substring((progressBar),totalChar);
    } else {
        return undefined;
    };
    return "#[fg=colour250,bg=colour240] " + frontOutput + "#[fg=colour250,bg=colour237]" + backOutput + " ";
};

for (i = 0; i < Players.length; i++) {
    try {
        if (Application(Players[i]).running()) {
            if (musicPlayerVar(Players[i]) == true) {
                if (!(checkSongInfo(Players[i]) == undefined)) {
                    checkSongInfo(Players[i]);
                    break;
                } else {
                    "";
                };
            } else {
                break;
            };
        };
    } catch (err) {
        ''
    }
};
