from typing import Literal

from pydantic import BaseModel, AnyUrl, PositiveInt

from app.auth.utils import SafeString


class QueryParams(BaseModel):
    def urlencode(self) -> str:
        return "&".join([f"{key}={value}" for key, value in self.model_dump().items()])
    

class SpotifyAuthQueryParams(QueryParams):
    response_type: Literal["code"]
    client_id: str
    scope: str 
    redirect_uri: AnyUrl 
    state: SafeString 


class NewTokenResponse(BaseModel):
    access_token: str
    token_type: Literal["Bearer"]
    expires_at: PositiveInt
    scope: str
    refresh_token: str


class ExistingTokenResponse(BaseModel):
    access_token: str
    expires_at: PositiveInt
