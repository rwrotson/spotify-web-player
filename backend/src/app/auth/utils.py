import datetime
import string
from random import randint

import aiohttp
from pydantic import AnyUrl


SAFE_CHARS = list(string.ascii_letters + string.digits)


type SafeString = str


def generate_random_string(*, length: int = 16) -> SafeString:
    if length < 1:
        raise ValueError("Length must be positive")
    
    chars_sequence = [SAFE_CHARS[randint(0, len(SAFE_CHARS) - 1)] for _ in range(length)]

    return "".join(chars_sequence)


async def post_request(url: AnyUrl, data: dict) -> dict:
    connector = aiohttp.TCPConnector(ssl=True)

    async with aiohttp.ClientSession(connector=connector) as session:
        async with session.post(url, data=data) as response:
            
            return await response.json()


def get_current_time_in_s() -> int:
    return int(datetime.datetime.now().timestamp())


ERROR_EXAMPLE = {
    "content": {
        "application/json": {
            "example": {
                "detail": "error description",
            },
        },
    },
}


def wrap_error_response(response_description: dict) -> dict:
    return response_description | ERROR_EXAMPLE
