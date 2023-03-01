from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.fullbooks import FullBookRepository, FullBookOut, Error

router = APIRouter()


@router.get("/fullbooks", response_model=Union[List[FullBookOut], Error])
def get_fullbooks(
    repo: FullBookRepository = Depends()
):
    return repo.get_all()

@router.get("/fullbooks/{book_id}", response_model=Union[FullBookOut, Error])
def get_fullbook(
    book_id: int,
    response: Response,
    repo: FullBookRepository = Depends()
    ) -> FullBookOut:
    fullbook = repo.get_one(book_id)
    if fullbook is None:
        response.status_code = 404
    return fullbook

@router.delete("/fullbooks/{book_id}", response_model=bool)
def delete_fullbook(
    book_id: int,
    repo: FullBookRepository = Depends()
) -> bool:
    return repo.delete(book_id)
