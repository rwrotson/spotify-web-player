from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class Playback(BaseModel):
    is_playing: str
    track_id: str
    title: str
    artists: str
    album_title: str
    artwork_url: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name = True,
        from_attributes=True,
    )


class OKResponse(BaseModel):
    ok: bool = True
