class SpotifyAuthException(Exception):
    """
    Base exception for auth module.
    """
    pass


class APIKeysNotSetException(SpotifyAuthException):
    """
    Raised when Spotify CLIENT_ID and CLIENT_SECRET are not set.
    """
    pass
