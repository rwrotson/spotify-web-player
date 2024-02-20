from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.auth.exceptions import APIKeysNotSetException
from app.desktop.exceptions import (
    SpotifyDesktopException, 
    SpotifyDesktopNotInstalledException, 
    SpotifyDesktopNotRunningException,
    SpotifyDesktopDisabledException
)


def register_exception_handlers(app: FastAPI):
    @app.exception_handler(APIKeysNotSetException)
    async def api_keys_exception_handler(request: Request, exc: APIKeysNotSetException):
        return JSONResponse(
            status_code=500,
            content={"message": "Keys for SpotifyAPI not set, you can't use this endpoint without them."},
        )

    @app.exception_handler(SpotifyDesktopException)
    async def spotify_exception_handler(request: Request, exc: SpotifyDesktopException):
        return JSONResponse(
            status_code=500,
            content={"message": "Some error with Spotify Desktop"},
        )

    @app.exception_handler(SpotifyDesktopNotInstalledException)
    async def not_installed_exception_handler(request: Request, exc: SpotifyDesktopNotInstalledException):
        return JSONResponse(
            status_code=404,
            content={"message": "Spotify Desktop is not installed or not found."},
        )

    @app.exception_handler(SpotifyDesktopNotRunningException)
    async def not_running_exception_handler(request: Request, exc: SpotifyDesktopNotRunningException):
        return JSONResponse(
            status_code=403,
            content={"message": "Spotify Desktop is not running, please open it."},
        )
    
    @app.exception_handler(SpotifyDesktopDisabledException)
    async def desktop_disabled_exception_handler(request: Request, exc: SpotifyDesktopNotRunningException):
        return JSONResponse(
            status_code=403,
            content={"message": "Spotify Desktop is disabled due to docker-compose envs configuration."},
        )
