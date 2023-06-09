from fastapi.testclient import TestClient
from main import app
from queries.cover import CoverRepository


client = TestClient(app)


class EmptyCoversQueries:
    def get_all(self):
        return []


def test_pages():

    app.dependency_overrides[CoverRepository] = EmptyCoversQueries
    response = client.get("/covers")

    assert response.status_code == 200
    assert response.json() == []
    app.dependency_overrides = {}


def test_init():
    assert 1 == 1
