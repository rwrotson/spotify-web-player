import os

from app.desktop.exceptions import SpotifyDesktopDisabledException


def check_spotify_desktop_enabled():
    is_run_inside_docker = bool(os.getenv("DOCKERBUILD", False))
    is_spotify_desktop_enabled = bool(os.getenv("ENABLE_SPOTIFY_DESKTOP", True))

    if is_run_inside_docker and is_spotify_desktop_enabled:
        raise SpotifyDesktopDisabledException("Spotify Desktop is not connected")
