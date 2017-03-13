// Set to your preferred music player, 
// currently supports 'iTunes', 'Spotify', and 'Audirvana Plus'.

var Player = 'Spotify',
    maxChar = 40;

/* ---------------------------------------------------------------- */
if (Application(Player).running) {
    if (Player == "Audirvana Plus") {
        var musicPlayer = Application(Player),
            trackName = musicPlayer.playingTrackTitle(),
            artistName = musicPlayer.playingTrackArtist(),
            position = musicPlayer.playerPosition(),
            duration = musicPlayer.playingTrackDuration(),
            state = musicPlayer.playerState(),
            pause = "Paused",
            play = "Playing";
    };
    if ((Player == "iTunes") || (Player == "Spotify")) {
        var musicPlayer = Application(Player),
            state = musicPlayer.playerState(),
            pause = "paused",
            play = "playing";
    };
    if ((state == play) || (state == pause)) {
        if ((Player == "iTunes") || (Player == "Spotify")) {
            var trackName = musicPlayer.currentTrack.name(),
                artistName = musicPlayer.currentTrack.artist(),
                position = musicPlayer.playerPosition(),
                duration = musicPlayer.currentTrack.duration();
        };
        if (Player == "Spotify") {
            var duration = duration / 1000;
        };
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
                var output = output.substring(0,(maxChar - 9))+ " [Paused]";
            };
        };
        var totalChar = output.length;
        var progressBar = divider * totalChar;
        if (!progressBar.toString().indexOf(".") < 1) {
            var round = progressBar.toString().indexOf(".");
            var progressBar = progressBar.toString().substring(0,(round));
        };
        var frontOutput = output.substring(0,(progressBar));
        var backOutput = output.substring((progressBar),totalChar);
        "#[fg=colour250,bg=colour240] " + frontOutput + "#[fg=colour250,bg=colour237]" + backOutput + " "
    };
};

