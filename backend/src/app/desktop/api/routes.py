from fastapi import APIRouter, Depends

from app.desktop.api.schemas import Playback, OKResponse
from app.desktop.consts import APPLESCRIPT_CODEBASE
from app.desktop.dependencies import check_spotify_desktop_enabled
from app.desktop.executor import run_applescript


desktop_router = APIRouter(
    prefix="/desktop",
    tags=["desktop"],
    dependencies=[Depends(check_spotify_desktop_enabled)],
)


@desktop_router.post("/open_spotify", response_model=OKResponse, status_code=200)
async def open_spotify():
    run_applescript(APPLESCRIPT_CODEBASE.open_spotify)
    return OKResponse()


@desktop_router.get("/playback", response_model=Playback, status_code=200)
async def get_playback():
    data = run_applescript(APPLESCRIPT_CODEBASE.get_playback)
    return Playback.model_validate_json(data)


@desktop_router.post("/play", response_model=OKResponse, status_code=201)
async def play():
    run_applescript(APPLESCRIPT_CODEBASE.play_playback)
    return OKResponse()


@desktop_router.post("/pause", response_model=OKResponse, status_code=201)
async def pause():
    run_applescript(APPLESCRIPT_CODEBASE.pause_playback)
    return OKResponse()


@desktop_router.post("/previous", response_model=OKResponse, status_code=201)
async def previous():
    run_applescript(APPLESCRIPT_CODEBASE.to_previous_track)
    return OKResponse()


@desktop_router.post("/next", response_model=OKResponse, status_code=201)
async def next():
    run_applescript(APPLESCRIPT_CODEBASE.to_next_track)
    return OKResponse()
