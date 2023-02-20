# from fastapi import APIRouter, Depends, Response
# from typing import Union, List,Optional
from queries.books import BookIn, BookRepository
# @router.post("/books")
# @router.get("/books")
# @router.put("/books/{book_id}")
# @router.delete("/books/{book_id}")
# @router.get("/books/{book_id}")
from fastapi import APIRouter, Depends

router= APIRouter()

@router.post("/books")
def create_book(
    book:BookIn,
    repo:BookRepository = Depends()
    ):
    print(repo)
    return book

@router.get("/books")
def get_book():
    pass
