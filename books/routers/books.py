# from fastapi import APIRouter, Depends, Response
# from typing import Union, List,Optional
# from queries.books import BookIn, BookRepository, BookOut, Error
from fastapi import APIRouter, Depends
# from queries.books import BookRepository


router = APIRouter()



@router.post("/books")
def create_book():
    pass

# @router.get("/books")

# @router.put("/books/{book_id}")

@router.delete("/books/{book_id}", response_model=bool)
def delete_book():
    pass
#     book_id: int,
#     repo: BookRepository = Depends(),
# ) -> bool:
#     return repo.delete(book_id)


# @router.get("/books/{book_id}")
