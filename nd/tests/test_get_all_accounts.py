from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepository

client = TestClient(app)


class EmptyAccountsQueries:
    def get_all(self):
        return []


def test_get_all_accounts():

    app.dependency_overrides[AccountRepository] = EmptyAccountsQueries
    response = client.get("/accounts")


    assert response.status_code == 200
    assert response.json() == []
    app.dependency_overrides = {}


def test_init():
    assert 1 == 1
