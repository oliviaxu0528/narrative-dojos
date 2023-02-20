from pydantic import BaseModel
# from typing import Optional, List, Union
from datetime import date
from queries.pool import pool

class BookIn(BaseModel):
    title:str
    author:str
    image_url:str
    create_on: date
class
class BookRepository(BaseModel):
    def create(self,book:BookIn)-> BookOut:
        with pool.connection() as connnection:
            with conn.cursor() as cur:
                result = cur.execute(
                """
                insert into books
                    (title author image_url created_on)
                values
                    (%s,%s,%s,%s);
                returning id;
                """,
                [
                    book.title,
                    book.author,
                    book.image_url,
                    book.created_on
                ]
            )
                print(result)