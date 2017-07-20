// Set to your preferred music player, 
// currently supports 'iTunes', 'Spotify', 'Audirvana Plus', and Swinsian.

var Players = ['Spotify','Swinsian','iTunes','Audirvana Plus'],

  //maximum displayed character
  maxChar = 30,

  //Colors
  frontColor = "#[fg=colour250,bg=colour240]",
  backColor = "#[fg=colour250,bg=colour237]",

  //Display duration (like [2:30/6:00])
  showDuration = true,
  showCurPosition = false,
  durationIsRemainingTime = false;

/* ---------------------------------------------------------------- */

const musicPlayerVar2 = (Player) => {
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

const musicPlayerVar = (Player) => {
  let musicPlayer = Application(Player);
  let trackName, artistName, position, duration, state, pause, play;
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
    return false
  };
  return { trackName, artistName, position, duration, state, pause, play };
};

const checkSongInfo = (x, Player) => {
  let output, totalChar, progressBar, frontOutput, backOutput;
  if ((x.state == x.play) || (x.state == x.pause)) {
    const divider = x.position / x.duration;
    if ((x.artistName != null) && (x.artistName.length > 0)) {
      output = "♫ " + x.artistName + " - " + x.trackName;
    } else {
      output = "♫ " + x.trackName;
    };
    if (output.length > maxChar) {
      output =  "♫ " + x.trackName;
      if (output.length > maxChar) {
        output = output.substring(0,(maxChar - 3)) + "...";
      };
    };
    if (x.state == x.pause) {
      if (output.substring((maxChar - 3),(maxChar)) == "...") {
        output = output.substring(0,(maxChar - 12)) + "... [Paused]";
      } else {
        if (output.length > maxChar - 9) {
          output = output.substring(0,(maxChar - 12)) + "... [Paused]";
        };
        output = output.substring(0,(maxChar - 9)) + " [Paused]";
      };
    };
    if ((showDuration == true) && (x.state != x.pause)) {
      const secToText = (time) => {
        const twoDigits = (val) => val.toString().length < 2 ? '0' + val.toString() : val;
        let hr = Math.floor(time / 3600),
          min = Math.floor((time - hr * 3600) / 60),
          sec = Math.floor(time - (hr * 3600) - min * 60);
        sec = twoDigits(sec), min = twoDigits(min), hr = twoDigits(hr);
        return time >= 3600 ? hr + ':' + min + ':' + sec : min + ':' + sec ;
      }
      if (showCurPosition == true) {
        output += ' [' + secToText(x.position) + '/' + secToText((durationIsRemainingTime ? (x.duration - x.position) : x.duration)) + ']';
      } else {
        output += ' [' + secToText((durationIsRemainingTime ? (x.duration - x.position) : x.duration)) + ']';
      }
    }
      totalChar = output.length,
      progressBar = Math.round(divider * totalChar),
      frontOutput = output.substring(0,(progressBar)),
      backOutput = output.substring((progressBar),totalChar);
  } else {
    return undefined;
  };
  return frontColor + " " + frontOutput + backColor + backOutput + " ";
};

for (i = 0; i < Players.length; i++) {
    try {
    if (Application(Players[i]).running()) {
      if (musicPlayerVar(Players[i]) != false) {
        if (!(checkSongInfo(musicPlayerVar(Players[i]),Players[i]) == undefined)) {
          checkSongInfo(musicPlayerVar(Players[i]),Players[i]);
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

