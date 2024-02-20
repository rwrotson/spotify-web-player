from app.auth.consts import CLIENT_ID, CLIENT_SECRET
from app.auth.exceptions import APIKeysNotSetException


def check_spotify_api_keys():
    if not CLIENT_ID or not CLIENT_SECRET:
        raise APIKeysNotSetException("CLIENT_ID and/or CLIENT_SECRET are not set")
