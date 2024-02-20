try
	tell application "Finder" to get application file id "com.spotify.client"
on error
	error "Spotify Desktop not installed" number -1002
end try

tell application "Spotify"
    activate
end tell