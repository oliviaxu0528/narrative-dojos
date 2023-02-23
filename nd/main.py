from fastapi import FastAPI
from routers import books, accounts
from authenticator import authenticator

app = FastAPI()
app.include_router(books.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
