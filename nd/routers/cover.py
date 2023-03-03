from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.cover import CoverIn, CoverOut, CoverRepository, Error

router = APIRouter()


@router.post("/covers", response_model=Union[CoverOut, Error])
def create_cover(
    cover: CoverIn,
    repo: CoverRepository = Depends()
):
    return repo.create(cover)


@router.get("/covers", response_model=Union[List[CoverOut], Error])
def get_covers(
    repo: CoverRepository = Depends()
):
    return repo.get_all()

@router.get("/covers/{ID}", response_model=Union[CoverOut, Error])
def get_cover(
    ID: int,
    response: Response,
    repo: CoverRepository = Depends()
    ) -> CoverOut:
    cover = repo.get_one(ID)
    if cover is None:
        response.status_code = 404
    return cover

@router.delete("/covers/{ID}", response_model=bool)
def delete_cover(
    ID: int,
    repo: CoverRepository = Depends()
) -> bool:
    return repo.delete(ID)

@router.put("/covers/{ID}", response_model=Union[CoverOut, Error])
def update_cover(
    ID: int,
    cover: CoverIn,
    repo: CoverRepository = Depends()
) -> Union[CoverOut,Error]:
    return repo.update(ID, cover)

@router.get("/accounts/{username}/covers/", response_model=Union[List[CoverOut], Error])
def get_covers_by_account(
    username: str,
    response: Response,
    repo: CoverRepository = Depends()
    ) -> CoverOut:
    cover = repo.get_covers_by_account(username)
    if cover is None:
        response.status_code = 404
    return cover
