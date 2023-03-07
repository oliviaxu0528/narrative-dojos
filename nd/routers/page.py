from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.page import PageIn, PageOut, PageRepository, Error

router = APIRouter()


@router.post("/pages", response_model=Union[PageOut, Error])
def create_page(
    page: PageIn,
    repo: PageRepository = Depends()
):
    return repo.create(page)


@router.get("/pages", response_model=Union[List[PageOut], Error])
def get_pages(
    repo: PageRepository = Depends()
):
    return repo.get_all()


@router.get("/pages/{pageID}", response_model=Union[PageOut, Error])
def get_page(
    pageID: int,
    response: Response,
    repo: PageRepository = Depends()
) -> PageOut:
    page = repo.get_one(pageID)
    if page is None:
        response.status_code = 404
    return page


@router.delete("/pages/{pageID}", response_model=bool)
def delete_page(
    pageID: int,
    repo: PageRepository = Depends()
) -> bool:
    return repo.delete(pageID)


@router.put("/pages/{pageID}", response_model=Union[PageOut, Error])
def update_page(
    pageID: int,
    page: PageIn,
    repo: PageRepository = Depends()
) -> Union[PageOut, Error]:
    return repo.update(pageID, page)
