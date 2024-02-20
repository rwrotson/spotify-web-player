tell application "Spotify"
	set isPlaying to player state
	set trackId to the id of current track
	set title to the name of current track
	set artists to the artist of current track
	set albumTitle to the album of current track
	set artworkUrl to the artwork url of current track
	
	return "{ \"isPlaying\": \"" & isPlaying & "\", \"trackId\": \"" & trackId & "\", \"title\": \"" & title & "\", \"artists\": \"" & artists & "\", \"albumTitle\": \"" & albumTitle & "\", \"artworkUrl\": \"" & artworkUrl & "\" }"
end tell