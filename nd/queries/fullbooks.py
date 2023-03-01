from pydantic import BaseModel
from typing import List, Union, Optional
from datetime import date
from queries.pool import pool


class FullBookIn(BaseModel):
    title: str
    author: str
    book_url: str
    created_on: date
    page_url: str
    page_text: str

class Error(BaseModel):
    message: str


class FullBookOut(BaseModel):
    bookID: int
    title: str
    author: str
    book_url: str
    created_on: date
    pageID: list[int]
    page_url: str
    page_text: str


class FullBookRepository:
    def get_all(self) -> Union[Error, List[FullBookOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT bookID, title, author, book_url, created_on, pageID, page_url, page_text
                        FROM books
                        INNER JOIN pages
                        ON books.bookID = pages.bookID
                        """
                    )
                    result = []
                    for record in cur:
                        fullbook = FullBookOut(
                            bookID=record[0],
                            title=record[1],
                            author=record[2],
                            book_url=record[3],
                            created_on=record[4],
                            pageID=record[5],
                            page_url=record[6],
                            page_text=record[7]
                        )
                        result.append(fullbook)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all books"}

    def get_one(self,bookID:int) -> Optional[FullBookOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT bookID, title, author, book_url, created_on, pageID, page_url, page_text
                        FROM books
                        INNER JOIN pages
                        ON books.bookID = pages.bookID
                        WHERE bookID = %s
                        """,
                        [bookID]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_book_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get book"}

    def delete(self,bookID:int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM books
                        WHERE bookID = %s
                        """,
                        [bookID]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def record_to_book_out(self, record):
        return FullBookOut(
            bookID=record[0],
            title=record[1],
            author=record[2],
            book_url=record[3],
            created_on=record[4],
            pageID=record[5],
            page_url=record[6],
            page_text=record[7]
        )
