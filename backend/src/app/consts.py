import os
from dotenv import load_dotenv


load_dotenv()


BACKEND_HOST = os.environ.get("BACKEND_HOST", "0.0.0.0")
BACKEND_PORT = os.environ.get("BACKEND_PORT", 8000)
BACKEND_URL = f"http://{BACKEND_HOST}:{BACKEND_PORT}"

FRONTEND_HOST = os.environ.get("FRONTEND_HOST", "0.0.0.0")
FRONTEND_PORT = os.environ.get("FRONTEND_PORT", 3000)
FRONTEND_URL = f"http://{FRONTEND_HOST}:{FRONTEND_PORT}"
