# from fastapi import APIRouter, Depends, Response
from typing import Union, List,Optional
from queries.books import BookIn, BookRepository, BookOut, Error
# @router.get("/books")
# @router.delete("/books/{book_id}")
# @router.get("/books/{book_id}")
from fastapi import APIRouter, Depends, Response

router= APIRouter()

@router.post("/books", response_model = Union[BookOut,Error])
def create_book(
    book:BookIn,
    repo:BookRepository = Depends()
    ):
    return repo.create(book)

@router.get("/books",response_model=Union[list[BookOut],Error])
def get_books(
    repo: BookRepository = Depends()
):
    return repo.get_all()

@router.put("/books/{book_id}",response_model=Union[BookOut,Error])
def update_book(
    book_id: int,
    book: BookIn,
    repo: BookRepository = Depends()
) -> Union[BookOut,Error]:
    return repo.update(book_id, book)

@router.get("/books/{book_id}", response_model=Union[BookOut, Error])
def get_one_book(
    book_id:int,
    response: Response,
    repo: BookRepository = Depends(),
) -> BookOut:
    book = repo.get_one(book_id)
    if book is None:
        response.status_code = 404
    return book

@router.delete("/books/{book_id}", response_model=bool)
def delete_book(
    book_id:int,

    repo: BookRepository = Depends(),
) -> bool:
    return repo.delete(book_id)
