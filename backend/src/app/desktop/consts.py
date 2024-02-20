import os

from app.desktop.reader import initialize_codebase


APPLESCRIPTS_DIRECTORY_PATH = os.getcwd() + "/src/app/desktop/applescripts"
APPLESCRIPT_CODEBASE = initialize_codebase(APPLESCRIPTS_DIRECTORY_PATH)
