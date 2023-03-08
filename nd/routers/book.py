from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.book import BookRepository, BookIn, BookOut, Error

router = APIRouter()


@router.get("/books", response_model=Union[List[BookOut], Error])
def get_books(
    repo: BookRepository = Depends()
):
    return repo.get_all()


@router.get("/book/{ID}", response_model=Union[BookOut, Error])
def get_book(
    ID: int,
    response: Response,
    repo: BookRepository = Depends()
):
    book = repo.get_one(ID)
    if book is None:
        response.status_code = 404
    return book


@router.delete("/book", response_model=bool)
def delete_book(
    ID: int,
    repo: BookRepository = Depends()
) -> bool:
    return repo.delete(ID)


@router.put("/book/{ID}", response_model=Union[BookOut, Error])
def update_book(
    ID: int,
    book: BookIn,
    repo: BookRepository = Depends()
) -> Union[BookOut, Error]:
    return repo.update(ID, book)
