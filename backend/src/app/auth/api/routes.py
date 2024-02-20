from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import RedirectResponse

from app.auth.api.schemas import NewTokenResponse, ExistingTokenResponse, SpotifyAuthQueryParams
from app.auth.consts import CLIENT_ID, CLIENT_SECRET, SCOPE, REDIRECT_URI, SPOTIFY_AUTH_URL, SPOTIFY_TOKEN_URL
from app.auth.dependencies import check_spotify_api_keys
from app.auth.storage import storage
from app.auth.utils import (
    SafeString, 
    generate_random_string, 
    post_request, 
    get_current_time_in_s, 
    wrap_error_response as w,
)


auth_router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    dependencies=[Depends(check_spotify_api_keys)],
)


@auth_router.get(
    "/login",
    response_class=RedirectResponse, 
    status_code=301,
)
async def login():
    state = generate_random_string(length=16)

    auth_query_parameters = SpotifyAuthQueryParams(
        response_type="code",
        client_id=CLIENT_ID,
        scope=" ".join(SCOPE),
        redirect_uri=REDIRECT_URI,
        state=state,
    )

    storage["state"] = state

    return f"{SPOTIFY_AUTH_URL}?{auth_query_parameters.urlencode()}"


@auth_router.get(
    "/callback",
    response_model=NewTokenResponse,
    status_code=201,
    responses={500: w({"description": "State mismatch"})},
)
async def callback(code: str, state: SafeString):
    if state != storage["state"]:
        raise HTTPException(status_code=500, detail="State mismatch")
    
    url = SPOTIFY_TOKEN_URL
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }
    
    response = await post_request(url=url, data=data)

    expires_at = get_current_time_in_s() + response["expires_in"] - 10

    storage["access_token"] = response["access_token"]
    storage["expires_at"] = expires_at
    storage["refresh_token"] = response["refresh_token"]

    return NewTokenResponse(
        **response,
        expires_at=expires_at,
    )
    

@auth_router.get(
    "/token",
    response_model=ExistingTokenResponse,
    status_code=200,
    responses={
        404: w({"description": "Access token not found"}),
        403: w({"description": "Access token has been expired"}),
    },
)
async def get_token():
    if not storage["access_token"]:
        raise HTTPException(status_code=404, detail="Access token not found")
    
    if storage["expires_at"] < get_current_time_in_s():
        raise HTTPException(status_code=403, detail="Access token has been expired")
    
    return ExistingTokenResponse(
        access_token=storage["access_token"],
        expires_at=storage["expires_at"]   
    )


@auth_router.get(
    "/refresh",
    response_model=NewTokenResponse,
    status_code=201,
    responses={
        404: w({"description": "Refresh token not found"}),
        403: w({"description": "Access token is still valid"}),
        500: w({"description": "Some error occured"}),
    },
)
async def refresh_token():
    if not storage["refresh_token"]:
        raise HTTPException(status_code=404, detail="Refresh token not found")
    
    if storage["expires_at"] > get_current_time_in_s():
        raise HTTPException(status_code=403, detail="Access token is still valid")

    url = SPOTIFY_TOKEN_URL
    data = {
        "grant_type": "refresh_token",
        "refresh_token": storage["refresh_token"],
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }

    response = await post_request(url=url, data=data)

    if "error" in response and response.get("error_description") == "Refresh token revoked":
        return RedirectResponse(url="/auth/login")
    
    if "error" in response:
        raise HTTPException(status_code=500, detail=response.get("error_description"))

    expires_at = get_current_time_in_s() + response.get("expires_in", 0) - 10

    storage["access_token"] = response.get("access_token", None)
    storage["expires_at"] = expires_at
    response["refresh_token"] = storage["refresh_token"]

    return NewTokenResponse(
        **response,
        expires_at=expires_at,
    )
