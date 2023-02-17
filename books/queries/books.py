from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool

class Error(BaseModel):
    message: str


class BookIn(BaseModel):
    author: str
    title: str
    image_url: str
    created_on: str

class BookOut(BaseModel):
    id: int
    author: str
    title: str
    image_url: str
    created_on: str

class BookRepository:
    def delete(self, book_id: int) -> bool:
        try:
            with pool.connection() as db:
                db.execute(
                    """
                    DELETE FROM books
                    WHERE id = %s
                    """,
                    [book_id]
                )
                return True
        except Exception as e:
            print(e)
            return False
