from pydantic import BaseModel
from typing import List, Union, Optional
from datetime import date
from queries.pool import pool


class CoverIn(BaseModel):
    title: str
    author: str
    cover_image_url: str
    created_on: date


class Error(BaseModel):
    message: str


class CoverOut(BaseModel):
    ID: int
    title: str
    author: str
    cover_image_url: str
    created_on: date


class CoverRepository:
    def create(self, cover: CoverIn) -> CoverOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO cover
                            (title, author, cover_image_url, created_on)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING ID;
                        """,
                        [
                            cover.title,
                            cover.author,
                            cover.cover_image_url,
                            cover.created_on
                        ]
                    )
                    ID = result.fetchone()[0]
                    return self.cover_in_to_out(ID,cover)
        except Exception:
            return {"message": "Could not create"}

    def get_all(self) -> Union[Error, List[CoverOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT ID,title,author,cover_image_url,created_on
                        FROM cover
                        ORDER BY title;
                        """
                    )
                    result = []
                    for record in cur:
                        cover = CoverOut(
                            ID=record[0],
                            title=record[1],
                            author=record[2],
                            cover_image_url=record[3],
                            created_on=record[4]
                        )
                        result.append(cover)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all covers"}

    def get_one(self,ID:int) -> Optional[CoverOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT ID,title,author,cover_image_url,created_on
                        FROM cover
                        WHERE ID = %s
                        """,
                        [ID]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_cover_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get cover"}

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

    def update(self, ID:int, cover:CoverIn) -> Union[CoverOut,Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE cover
                        SET title = %s,
                            author = %s,
                            cover_image_url = %s,
                            created_on = %s
                        WHERE ID = %s
                        """,
                        [
                            cover.title,
                            cover.author,
                            cover.cover_image_url,
                            cover.created_on,
                            ID
                        ]
                    )
                    return self.cover_in_to_out(ID,cover)
        except Exception as e:
            return {"message": "Could not update"}

    def cover_in_to_out(self, ID: int, cover: CoverIn):
        old_data = cover.dict()
        return CoverOut(ID=ID, **old_data)

    def record_to_cover_out(self, record):
        return CoverOut(
            ID=record[0],
            title=record[1],
            author=record[2],
            cover_image_url=record[3],
            created_on=record[4]
        )
