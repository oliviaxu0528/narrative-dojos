from fastapi.testclient import TestClient
from main import app
from db import Queries

client=TestClient(app)

class EmptyBookQueries:
    def get_books(self):
        return []

def test_get_all_books():
    #Arrange
    app.dependency_overrides[BookQueries] = EmptyBookQueries
    
    response = client
    
    #Act
    app.dependency_overrides ={}
    
    #Assert
    

