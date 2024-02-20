from pathlib import Path
from dotenv import load_dotenv
import os

from app.consts import BACKEND_URL


load_dotenv()


CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID", None)
CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET", None)

REDIRECT_URI = f"{BACKEND_URL}/auth/callback"

SCOPE = [
    "streaming", 
    "user-read-private", 
    "user-read-email",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-library-read",
    "user-library-modify",
]

SPOTIFY_URL = "https://accounts.spotify.com"
SPOTIFY_AUTH_URL = f"{SPOTIFY_URL}/authorize"
SPOTIFY_TOKEN_URL = f"{SPOTIFY_URL}/api/token"

STORAGE_PATH = Path("./.tmp/storage.pkl")
