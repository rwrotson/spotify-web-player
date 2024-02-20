class SpotifyDesktopException(Exception):
    """
    Base exception for desktop module.
    """
    pass


class SpotifyDesktopNotInstalledException(SpotifyDesktopException):
    """
    Raised when Spotify Desktop is not installed.
    """
    pass


class SpotifyDesktopNotRunningException(SpotifyDesktopException):
    """
    Raised when Spotify Desktop is not running.
    """
    pass


class SpotifyDesktopDisabledException(SpotifyDesktopException):
    """
    Raised when connection to Spotify Desktop is disabled.
    """
    pass
