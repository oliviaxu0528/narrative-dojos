from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool

class Error(BaseModel):
    message: str

class BookIn(BaseModel):
    title:str
    author:str
    image_url:str
    created_on: date

class BookOut(BaseModel):
    id: int
    title:str
    author:str
    image_url:str
    created_on: date

class BookRepository(BaseModel):
    def get_one(self, book_id:int) -> Optional[BookOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                    """
                    SELECT id,title,author,image_url,created_on
                    FROM books
                    where id = %s
                    """,
                    [book_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_book_out(record)
        except Exception as e:
            print(e)
            return False

    def delete(self, book_id:int)-> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                    """
                    Delete from books
                    where id = %s
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
                        WHERE id = %s
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
            print(e)
            return {"message": "Could not update"}

    def get_all(self) -> Union[Error, List[BookOut]]:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as cur:
                        result = cur.execute(
                            """
                            SELECT id,title,author,image_url,created_on
                            FROM books
                            ORDER BY title;
                            """
                        )

                        return [ self.record_to_book_out(record)
                                for record in result
                            ]
            except Exception as e:
                print(e)
                return {"message": "Could not get all books"}

    def create(self,book:BookIn)-> BookOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                    """
                    INSERT INTO books
                        (title, author, image_url, created_on)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,

                    [
                        book.title,
                        book.author,
                        book.image_url,
                        book.created_ona
                    ]
                )
                    id = result.fetchone()[0]
                    return self.book_in_to_out(id,book)
        except Exception:
            return {"message":"Could not create"}

    def book_in_to_out(self, id:int, book:BookIn):
        old_data = book.dict()
        return BookOut(id=id,**old_data)

    def record_to_book_out(self, record):
        return BookOut(
            id=record[0],
            title=record[1],
            author=record[2],
            image_url=record[3],
            created_on=record[4],
        )
