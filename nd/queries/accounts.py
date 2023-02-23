from pydantic import BaseModel
from .pool import pool
from typing import List

class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountRepository:
    def get(self, username: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, username, hashed_password
                        FROM accounts
                        WHERE username = %s
                        """,
                        [username]
                    )
                    record = cur.fetchone()

                    if record is not None:
                        return AccountOutWithPassword(
                            id = record[0],
                            username=record[1],
                            hashed_password=record[2]
                        )
                    else:
                        print("Invalid Username")
        except Exception:
            return {"message": "Could not get account"}

    def get_by_id(self, id: int) -> AccountOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, username, hashed_password
                        FROM accounts
                        WHERE id = %s
                        """,
                        [id]
                    )
                    record = cur.fetchone()
                    if record is not None:
                        return AccountOut(
                            id=record[0],
                            username=record[1],
                            hashed_password=record[2]
                        )
                    else:
                        print("Unable to locate ID")
        except Exception:
            return {"message": "Could not get by ID"}

    def create(self, account: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO accounts (
                            username,
                            hashed_password
                        )
                        VALUES (%s, %s)
                        RETURNING id;
                        """,
                        [account.username, hashed_password]
                    )
                    id = result.fetchone()[0]
                    old_data = account.dict()
                    return AccountOutWithPassword(id=id,hashed_password=hashed_password, **old_data)
        except Exception:
            return {"message": "Could not create account"}

    def get_all(self) -> List[AccountOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id, username
                        FROM accounts
                        ORDER BY id
                        """
                    )
                    results = []
                    for record in cur:
                        account = AccountOut(
                            id=record[0], username=record[1]
                        )
                        results.append(account)
                    return results
        except Exception:
            return {"message": "Could not get all accounts"}
