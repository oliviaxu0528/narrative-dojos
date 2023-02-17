from pydantic import BaseModel
from typing import Union
from datetime import date
from queries.pool import pool
from fastapi import APIRouter
router = APIRouter()

class Error(BaseModel):
    message: str

class BookIn(BaseModel):
    title: str
    author: str
    image_url: str
    created_on: str

class BookOut(BaseModel):
    id:str
    title: str
    author: str
    image_url: str
    created_on: date

class BookRepository:
    def update(self,book_id:int, book:BookIn) ->Union[BookOut,Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE books
                        SET title = %s
                            , author = %s
                            , image_url = %s
                            , created_on = %s
                        WHERE id = %s

                        """,
                        [book.title, book.author, book.image_url,book.created_on, book.id]
                    )
                    return self.book_in_to_out(book_id,book)

        except Exception as e:
            return {"message: " "Could not update that book!"}


    def book_in_to_out(self, id:int, book: BookIn):
        old_data = book.dict()
        return BookOut(id=id, **old_data)