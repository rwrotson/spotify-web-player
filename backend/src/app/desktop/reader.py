import glob
from dataclasses import dataclass
from pathlib import Path

from pydantic.alias_generators import to_snake


type ApplescriptCode = str


@dataclass(frozen=True, slots=True)
class ApplescriptCodebase:
    open_spotify: ApplescriptCode
    get_playback: ApplescriptCode
    pause_playback: ApplescriptCode
    play_playback: ApplescriptCode
    to_next_track: ApplescriptCode
    to_previous_track: ApplescriptCode


def initialize_codebase(directory_path: Path) -> ApplescriptCodebase:
    all_script_file_paths = glob.glob(f'{directory_path}/*.scpt')

    code_mappings = {}
    for script in all_script_file_paths:
        with open(script) as file:
            code = file.read()
            name = to_snake(Path(script).stem)
            code_mappings[name] = code

    # code snippet to validate that Spotify Desktop is installed and running
    check_client_code = code_mappings.pop("check_client")
    open_spotify_code = code_mappings.pop("open_spotify")

    for name in code_mappings.keys():
        code_mappings[name] = "\n".join([check_client_code, code_mappings[name]])

    code_mappings["open_spotify"] = open_spotify_code

    return ApplescriptCodebase(**code_mappings)
