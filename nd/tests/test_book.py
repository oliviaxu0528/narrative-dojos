from fastapi.testclient import TestClient
from main import app
from queries.book import BookRepository

client = TestClient(app)

class EmptyBookQueries:
    def get_all(self):
        return []


def test_books():
    # Arrange
    app.dependency_overrides[BookRepository] = EmptyBookQueries
    response = client.get("/books")

    # Act
    assert response.status_code == 200
    assert response.json() == []
    app.dependency_overrides = {}


# Assert
def test_init():
    assert 1 == 1
