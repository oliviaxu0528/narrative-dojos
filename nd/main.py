from fastapi import FastAPI
from routers import book, accounts, page, cover
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(book.router)
app.include_router(cover.router)
app.include_router(page.router)

origins = [
    "https://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
