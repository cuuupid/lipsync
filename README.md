#Lipsync

##What it does
Speak to your watch, and it'll play that song from what's currently playing. Like Alexa, on your watch.
SPOTIFY ONLY

##How it does it
- Pebble smartwatch with mic (pebble time and beyond models)
- Pebble speech to text using C
- Pass from C to javascript handler by contacting yourself (PebbleJS/Webkit)
- Ajax request to spotify endpoint, get API key using a curl request yourself since I didn't finish that yet
- Spotify makes a new playlist called LipSync Defined if it doesn't exist, if it does exist delete all songs
Then, adds every song in library.
- Ajax request to add song to playlist based on what you said
- this way it always starts playing your song and then once it finishes it shuffles through your library
- start playback of the lipsync playlist on your phone and setup is complete
Useful for runs!
