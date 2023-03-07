from pydantic import BaseModel
from typing import List, Union, Optional
from queries.pool import pool


class PageIn(BaseModel):
    coverID: int
    page_image_url: str
    text: str


class Error(BaseModel):
    message: str


class PageOut(BaseModel):
    pageID: int
    coverID: int
    page_image_url: str
    text: str


class PageRepository:
    def create(self, page: PageIn) -> PageOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO page
                            (coverID, page_image_url, text)
                        VALUES
                            (%s, %s, %s)
                        RETURNING pageID;
                        """,
                        [
                            page.coverID,
                            page.page_image_url,
                            page.text
                        ]
                    )
                    pageID = result.fetchone()[0]
                    return self.page_in_to_out(pageID, page)
        except Exception:
            return {"message": "Could not create"}

    def get_all(self) -> Union[Error, List[PageOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT pageID,coverID,page_image_url,text
                        FROM page
                        ORDER BY pageID;
                        """
                    )
                    result = []
                    for record in cur:
                        page = PageOut(
                            pageID=record[0],
                            coverID=record[1],
                            page_image_url=record[2],
                            text=record[3]
                        )
                        result.append(page)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all pages"}

    def get_one(self, pageID: int) -> Optional[PageOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT pageID,coverID,page_image_url,text
                        FROM page
                        WHERE pageID = %s
                        """,
                        [pageID]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_page_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get page"}

    def delete(self, pageID: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM page
                        WHERE pageID = %s
                        """,
                        [pageID]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, pageID: int, page: PageIn) -> Union[PageOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE pages
                        SET coverID = %s,
                            page_image_url = %s,
                            text = %s,
                        WHERE pageID = %s
                        """,
                        [
                            page.coverID,
                            page.page_image_url,
                            page.text,
                            pageID
                        ]
                    )
                    return self.page_in_to_out(pageID, page)
        except Exception as e:
            return {"message": "Could not update"}

    def page_in_to_out(self, pageID: int, page: PageIn):
        old_data = page.dict()
        return PageOut(pageID=pageID, **old_data)

    def record_to_page_out(self, record):
        return PageOut(
            pageID=record[0],
            coverID=record[1],
            page_image_url=record[2],
            text=record[3]
        )
