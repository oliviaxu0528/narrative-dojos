from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.books import BookIn, BookRepository, BookOut, Error



router = APIRouter()
# @router.post("/books")
# def create_book():
#     pass

@router.put("/books/{book_id}", response_model=Union[BookOut,Error])
def update_book(
    book_id: int,
    book: BookIn,
    repo: BookRepository = Depends(),
) -> Union[BookOut, Error]:
    return repo.update(book_id,book)