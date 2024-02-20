import subprocess

from app.desktop.exceptions import (
    SpotifyDesktopException,
    SpotifyDesktopNotInstalledException,
    SpotifyDesktopNotRunningException,
)


type ApplescriptCode = str


def run_applescript(script_code: ApplescriptCode) -> str | None:
    process = subprocess.Popen(
        ['osascript', '-e', script_code], 
        stdout=subprocess.PIPE, 
        stderr=subprocess.PIPE, 
        universal_newlines=True
    )

    output, error = process.communicate()

    error_code = None
    if error:
        error_code = error.split()[-1][1:-1]

    if error_code == "-1002":
        raise SpotifyDesktopNotInstalledException()
    if error_code == "-1001":
        raise SpotifyDesktopNotRunningException()
    if error:
        raise SpotifyDesktopException()

    if output:
        return output.strip()
