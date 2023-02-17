from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.books import BookIn, BookRepository, BookOut, Error

router = APIRouter()


@router.post("/books", response_model=Union[BookOut, Error])
def create_book(
    book: BookIn,
    repo: BookRepository = Depends()
):
    return repo.create(book)


@router.get("/books", response_model=Union[List[BookOut], Error])
def get_books(
    repo: BookRepository = Depends()
):
    return repo.get_all()

@router.get("/books/{book_id}", response_model=Union[BookOut, Error])
def get_book(
    book_id: int,
    response: Response,
    repo: BookRepository = Depends()
    ) -> BookOut:
    book = repo.get_one(book_id)
    if book is None:
        response.status_code = 404
    return book

@router.delete("/books/{book_id}", response_model=bool)
def delete_book(
    book_id: int,
    repo: BookRepository = Depends()
) -> bool:
    return repo.delete(book_id)

@router.put("/books/{book_id}", response_model=Union[BookOut, Error])
def update_book(
    book_id: int,
    book: BookIn,
    repo: BookRepository = Depends()
) -> Union[BookOut,Error]:
    return repo.update(book_id, book)
