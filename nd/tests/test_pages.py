
from fastapi.testclient import TestClient
from main import app
from queries.page import PageRepository


client = TestClient(app)
class EmptyPagesQueries:
    def get_all(self):
        return []
def test_pages():
    #Arrange
    app.dependency_overrides[PageRepository] = EmptyPagesQueries
    response = client.get("/pages")

    #Act
    assert response.status_code == 200
    assert response.json() == []
    app.dependency_overrides= {}


#Assert
def test_init():
    assert 1==1
