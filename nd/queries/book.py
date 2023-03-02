from pydantic import BaseModel
from typing import List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


class BookOut(BaseModel):
    ID: int
    username: str
    title: str
    cover_image_url: str
    created_on: date
    pageID: int
    page_image_url: str
    text: str


class BookRepository:
    def get_all(self) -> Union[List[BookOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT ID, username, title, cover_image_url, created_on, pageID, page_image_url, text
                        FROM cover
                        INNER JOIN page
                        ON cover.ID = page.coverID
                        """
                    )
                    return [self.record_to_cover_out(record) for record in result]
        except Exception as e:
            print(e)
            return {"message": "Could not get all book"}

    def get_one(self,ID:int) -> Union[List[BookOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT ID, username, title, cover_image_url, created_on, pageID, page_image_url, text
                        FROM cover
                        INNER JOIN page
                        ON cover.ID = page.coverID
                        WHERE cover.ID = %s
                        """,
                        [ID]
                    )
                    return [self.record_to_cover_out(record) for record in result]
        except Exception as e:
            print(e)
            return {"message": "Could not get all book"}

    def delete(self,ID:int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM cover
                        WHERE ID = %s
                        """,
                        [ID]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def record_to_cover_out(self, record):
        return BookOut(
            ID=record[0],
            username=record[1],
            title=record[2],
            cover_image_url=record[3],
            created_on=record[4],
            pageID=record[5],
            page_image_url=record[6],
            text=record[7]
        )
