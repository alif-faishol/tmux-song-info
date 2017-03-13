# tmux-song-info
Display current song name and playback position in tmux status line, only for macOS.

Supported music player:
* Audirvana Plus
* iTunes
* Spotify

Instalation
-----------

Download `tmux-song-info.js` and put it in `~/.tmux/tmux-song-info/[here]`.

Put this in your `.tmux.conf` :
```
set -g status-right "#(osascript -l JavaScript ~/.tmux/tmux-song-info/tmux-song-info.js)"
set -g status-interval 1
```
