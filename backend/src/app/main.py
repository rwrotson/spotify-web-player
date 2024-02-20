import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth.api.routes import auth_router
from app.consts import BACKEND_HOST, BACKEND_PORT, FRONTEND_URL
from app.desktop.api.routes import desktop_router
from app.exception_handlers import register_exception_handlers


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(desktop_router)

register_exception_handlers(app)


def start():
    uvicorn.run(
        "app.main:app", 
        host=BACKEND_HOST, 
        port=int(BACKEND_PORT), 
        reload=True
    )


if __name__ == "__main__":
    start()
