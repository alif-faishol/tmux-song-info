# tmux-song-info
Display current song name and playback position in tmux status line, only for macOS.

Supported music player:
* Audirvana Plus
* iTunes
* Spotify

Bugs
-----------
Can't quit music player that's currently sending music info, IF the music player need more time than 1,8-ish sec to quit. Quit it twice may do.

Instalation
-----------

Download `tmux-song-info.js` and put it in `~/.tmux/tmux-song-info/[here]`.

Edit `~/.tmux/tmux-song-info/tmux-song-info.js`, change Players variable to your preference.

Put this in your `.tmux.conf` :
```
set -g status-right "#(osascript -l JavaScript ~/.tmux/tmux-song-info/tmux-song-info.js)"
set -g status-interval 1
```
