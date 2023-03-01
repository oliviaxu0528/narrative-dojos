from pydantic import BaseModel
from typing import List, Union, Optional
from datetime import date
from queries.pool import pool


class BookIn(BaseModel):
    title: str
    author: str
    image_url: str
    created_on: date


class Error(BaseModel):
    message: str


class BookOut(BaseModel):
    bookID: int
    title: str
    author: str
    image_url: str
    created_on: date


class BookRepository:
    def create(self, book: BookIn) -> BookOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO books
                            (title, author, image_url, created_on)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING bookID;
                        """,
                        [
                            book.title,
                            book.author,
                            book.image_url,
                            book.created_on
                        ]
                    )
                    bookID = result.fetchone()[0]
                    return self.book_in_to_out(bookID,book)
        except Exception:
            return {"message": "Could not create"}

    def get_all(self) -> Union[Error, List[BookOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT bookID,title,author,image_url,created_on
                        FROM books
                        ORDER BY title;
                        """
                    )
                    result = []
                    for record in cur:
                        book = BookOut(
                            bookID=record[0],
                            title=record[1],
                            author=record[2],
                            image_url=record[3],
                            created_on=record[4]
                        )
                        result.append(book)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all books"}

    def get_one(self,book_id:int) -> Optional[BookOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT bookID,title,author,image_url,created_on
                        FROM books
                        WHERE bookID = %s
                        """,
                        [book_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_book_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get book"}

    def delete(self,book_id:int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM books
                        WHERE bookID = %s
                        """,
                        [book_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, book_id:int, book:BookIn) -> Union[BookOut,Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE books
                        SET title = %s,
                            author = %s,
                            image_url = %s,
                            created_on = %s
                        WHERE bookID = %s
                        """,
                        [
                            book.title,
                            book.author,
                            book.image_url,
                            book.created_on,
                            book_id
                        ]
                    )
                    return self.book_in_to_out(book_id,book)
        except Exception as e:
            return {"message": "Could not update"}

    def book_in_to_out(self, id: int, book: BookIn):
        old_data = book.dict()
        return BookOut(id=id, **old_data)

    def record_to_book_out(self, record):
        return BookOut(
            bookID=record[0],
            title=record[1],
            author=record[2],
            image_url=record[3],
            created_on=record[4]
        )
