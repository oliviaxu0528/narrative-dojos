from fastapi import APIRouter, Depends, Response
from typing import Union, List,Optional
from queries.books import BookIn, BookRepository, BookOut, Error


router = APIRouter()


@router.post("/books")

@router.get("/books")

@router.put("/books/{book_id}")

@router.delete("/books/{book_id}", response_model=bool)
# def delete_book():
#     book_id: int,
#     repo: BooksRepository = Depends(),
# ) -> bool:
#     return repo.delete(books_id)

@router.get("/books/{book_id}")
