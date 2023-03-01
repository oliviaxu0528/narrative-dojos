from pydantic import BaseModel
from typing import List, Union, Optional
from queries.pool import pool


class PageIn(BaseModel):
    image_url: str
    page_text: str


class Error(BaseModel):
    message: str


class PageOut(BaseModel):
    pageID: int
    image_url: str
    page_text: str


class PageRepository:
    def create(self, page: PageIn) -> PageOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO pages
                            (image_url, page_text)
                        VALUES
                            (%s, %s)
                        RETURNING pageID;
                        """,
                        [
                            page.image_url,
                            page.page_text
                        ]
                    )
                    pageID = result.fetchone()[0]
                    return self.page_in_to_out(pageID,page)
        except Exception:
            return {"message": "Could not create"}

    def get_all(self) -> Union[Error, List[PageOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT pageID,image_url,page_text
                        FROM pages
                        ORDER BY pageID;
                        """
                    )
                    result = []
                    for record in cur:
                        page = PageOut(
                            pageID=record[0],
                            image_url=record[1],
                            page_text=record[2]
                        )
                        result.append(page)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all pages"}

    def get_one(self,pageID:int) -> Optional[PageOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT pageID,image_url,page_text
                        FROM pages
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

    def delete(self,pageID:int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM pages
                        WHERE pageID = %s
                        """,
                        [pageID]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, pageID:int, page:PageIn) -> Union[PageOut,Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE pages
                        SET image_url = %s,
                            page_text = %s,
                        WHERE pageID = %s
                        """,
                        [
                            page.image_url,
                            page.page_text,
                            pageID
                        ]
                    )
                    return self.page_in_to_out(pageID,page)
        except Exception as e:
            return {"message": "Could not update"}

    def page_in_to_out(self, pageID: int, page: PageIn):
        old_data = page.dict()
        return PageOut(pageID=pageID, **old_data)

    def record_to_page_out(self, record):
        return PageOut(
            pageID=record[0],
            image_url=record[1],
            page_text=record[2]
        )
