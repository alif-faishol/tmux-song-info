// Set to your preferred music player, 
// currently supports 'iTunes', 'Spotify', 'Audirvana Plus', and Swinsian.

var Players = ['Spotify']//,'Swinsian','iTunes','Audirvana Plus'],

  //maximum displayed character
  maxChar = 30,

  //Colors
  frontColor = "#[fg=colour250,bg=colour240]",
  backColor = "#[fg=colour250,bg=colour237]",

  //Display duration (like [2:30/6:00])
  showDuration = true,
  showCurPosition = false,
  durationIsRemainingTime = false

/* ---------------------------------------------------------------- */

const songInfo = (Player) => {
  let musicPlayer = Application(Player)
  let trackName, artistName, state, pause, play, position, duration
  if (Player == "Audirvana Plus") {
    trackName = musicPlayer.playingTrackTitle()
    artistName = musicPlayer.playingTrackArtist()
    state = musicPlayer.playerState()
    pause = "Paused"
    play = "Playing"
    postion = musicPlayer.playerPosition()
    duration = musicPlayer.playingTrackDuration()
  } else if ((Player == "iTunes") || (Player == "Spotify") || (Player == "Swinsian")) {
    state = musicPlayer.playerState()
    pause = "paused"
    play = "playing"
    if ((state == play) || (state == pause)) {
      trackName = musicPlayer.currentTrack.name()
      artistName = musicPlayer.currentTrack.artist()
      position = musicPlayer.playerPosition()
      duration = musicPlayer.currentTrack.duration()
      if (Player == "Spotify") {
        duration = duration / 1000
      }
    }
  }
  return { trackName, artistName, position, duration, state, pause, play }
}

const checkSongInfo2 = (x) => {
  let output 
  if ((x.state == x.play) || (x.state == x.pause)) {
    if ((x.artistName != null) && (x.artistName.length > 0)) {
      output = "♫ " + x.artistName + " - " + x.trackName
    } else {
      output = "♫ " + x.trackName
    }
    if (output.length > maxChar) {
      output =  "♫ " + x.trackName
      if (output.length > maxChar) {
        output = output.substring(0,(maxChar - 3)) + "..."
      }
    }
    if (x.state == x.pause) {
      if (output.substring((maxChar - 3),(maxChar)) == "...") {
        output = output.substring(0,(maxChar - 12)) + "... [Paused]"
      } else {
        if (output.length > maxChar - 9) {
          output = output.substring(0,(maxChar - 12)) + "... [Paused]"
        }
        output = output.substring(0,(maxChar - 9)) + " [Paused]"
      }
    }
  }
  return output
}

const checkSongInfo = (songData, maxChar=30) => {
  let sD = songData,
    aN = sD.artistName, tN = sD.trackName, st = sD.state, p = sD.play, s = sD.pause
  let isReady = st == s ? true : st == s ? true : false
  let isArtist = () => aN != null ? true : aN.length > 0 ? true : aN + tN + 5 <= maxChar ? true : false
  let charLimit = (input, limit) => input.substring(0,(limit-3)) + "..."
  let output = isReady = false ? null : isArtist() ? "♫ " + aN + " - " + tN
    : ("♫ " + tN).length <= maxChar ? "♫ " + tN
    : charLimit("♫ " + tN, maxChar)
  let pauseHandler = (input) => input.length + 9 <= maxChar ? input + " [Paused]"
    : input.substring(0,(input.length-12)) + "... [Paused]"
  return st == s ? pauseHandler(output) : output
}



const durationInfo = (duration, position, x=false, y=false) => {
  const secToText = (time) => {
    const twoDigits = (val) => val.toString().length < 2 ? '0' + val.toString() : val
    let hr = Math.floor(time / 3600),
      min = Math.floor((time - hr * 3600) / 60),
      sec = Math.floor(time - (hr * 3600) - min * 60)
    sec = twoDigits(sec), min = twoDigits(min), hr = twoDigits(hr)
    return time >= 3600 ? hr + ':' + min + ':' + sec : min + ':' + sec
  }
  if (x === true) {
    return ' [' + secToText(position) + '/' + secToText((y ? (duration - position) : duration)) + ']'
  } else {
    return ' [' + secToText((y ? (duration - position) : duration)) + ']'
  }
}

const progressBar = (x,y,z) => {
  let totalChar = x.length,
    divider = songInfo('Spotify').position / songInfo('Spotify').duration,
    progress = Math.round(divider * totalChar),
    frontOutput = x.substring(0,(progress)),
    backOutput = x.substring((progress),totalChar)
  return y + " " + frontOutput + z + backOutput + " "
}

for (i = 0; i < Players.length; i++) {
  //try {
  if (Application(Players[i]).running()) {
    if (songInfo(Players[i]) != false) {
      if (!(checkSongInfo(songInfo(Players[i])) == undefined)) {
        progressBar(checkSongInfo(songInfo(Players[i])),frontColor,backColor)
        break
      } else {
        ""
      }
    } else {
      break
    }
  }
  //} catch (err) {
  //  ''
  //}
}
