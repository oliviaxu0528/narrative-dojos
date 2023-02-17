from pydantic import BaseModel
# from typing import Optional, List, Union
# from datetime import date
# from queries.pool import pool

class BookIn(BaseModel):
    title:str
    author:str
    image:str
