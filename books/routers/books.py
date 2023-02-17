# from fastapi import APIRouter, Depends, Response
# from typing import Union, List,Optional
from queries.books import BookIn
# @router.post("/books")
# @router.get("/books")
# @router.put("/books/{book_id}")
# @router.delete("/books/{book_id}")
# @router.get("/books/{book_id}")
from fastapi import APIRouter

router= APIRouter()

@router.post("/books")
def create_book(book:BookIn):
    print('book_title',book.title)
    return book

@router.get("/books")
def get_book():
    pass
