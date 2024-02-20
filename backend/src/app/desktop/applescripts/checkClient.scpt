try
	tell application "Finder" to get application file id "com.spotify.client"
on error
	error "Spotify Desktop not installed" number -1002
end try

if application "Spotify" is not running then
	error "Spotify Desktop not running" number -1001
end if
