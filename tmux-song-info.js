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
  durationIsRemainingTime = false

/* ---------------------------------------------------------------- */

const songData = (Player) => {
  let mP = Application(Player)
  let trackName, artistName, state, pause, play, position, duration
  if (Player == "Audirvana Plus") {
    trackName = mP.playingTrackTitle()
    artistName = mP.playingTrackArtist()
    state = mP.playerState()
    pause = "Paused"
    play = "Playing"
    postion = mP.playerPosition()
    duration = mP.playingTrackDuration()
  } else if ((Player == "iTunes") || (Player == "Spotify") || (Player == "Swinsian")) {
    state = mP.playerState()
    pause = "paused"
    play = "playing"
    if ((state == play) || (state == pause)) {
      trackName = mP.currentTrack.name()
      artistName = mP.currentTrack.artist()
      position = mP.playerPosition()
      duration = mP.currentTrack.duration()
      if (Player == "Spotify") {
        duration = duration / 1000
      }
    }
  }
  return { trackName, artistName, position, duration, state, pause, play }
}

const songInfo = (songData, maxChar=30) => {
  let sD = songData,
    aN = sD.artistName, tN = sD.trackName, st = sD.state, p = sD.play, s = sD.pause
  let isReady = st == s ? true : st == s ? true : false
  let isArtist = () => aN == null ? false : aN.length <= 0 ? false : aN + tN + 5 <= maxChar ? true : false
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
    divider = songData('Spotify').position / songData('Spotify').duration,
    progress = Math.round(divider * totalChar),
    frontOutput = x.substring(0,(progress)),
    backOutput = x.substring((progress),totalChar)
  return y + " " + frontOutput + z + backOutput + " "
}

for (i = 0; i < Players.length; i++) {
  //try {
  if (Application(Players[i]).running()) {
    if (songData(Players[i]) != false) {
      if (!(songInfo(songData(Players[i])) == undefined)) {
        progressBar(songInfo(songData(Players[i])) + durationInfo(songData(Players[i]).duration,songData(Players[i]).position,showCurPosition,durationIsRemainingTime),frontColor,backColor)
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
