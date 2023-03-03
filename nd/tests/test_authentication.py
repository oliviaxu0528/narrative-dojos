from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepository
from routers.accounts import get_authenticator
from jwtdown_fastapi.authentication import Token


client = TestClient(app)

# expected_post_response = {
#     "id": "1",
#     "username": "test",
# }

# expected_get_response = {
#     "id": 1,
#     "username": "test",
#     "hashed_password": "test",
# }

# expected_create_response = {
#     "access_token": "asfivuabwoiurbaw3iruabwvknsd",
#     "token_type": "Bearer",
#     "account": {"id": "1", "username": "test"},
# }

# class MockAccountQueries:
#     def get(self, username):
#         pass

#     def create(self, new_account, new_pass):
#         return expected_post_response

#     def get_all(self):
#         return [expected_post_response]



# class MockAuthenticator:
#     def hash_password(self, password):
#         return "jaosifpa8u3aw-98fawf"

#     async def login(self, response, request, form, repo):
#         return Token(access_token="asfivuabwoiurbaw3iruabwvknsd")


# def mock_get_authenticator():
#     return MockAuthenticator()


# def test_get_accounts():

#     req_body = {
#         "username": "test",
#         "password": "test",
#     }

#     # Arrange
#     app.dependency_overrides[AccountRepository] = MockAccountQueries

#     # Act
#     response = client.get("/accounts", json=req_body)
#     print(response)
#     actual = response.json()

#     # Assert
#     assert response.status_code == 200
#     assert actual == [expected_post_response]

#     # cleanup
#     app.dependency_overrides = {}

# def test_create_accounts():

#     req_body = {
#         "username": "test",
#         "password": "test",
#         "user_type": "individual",
#     }

#     # Arrange
#     app.dependency_overrides[AccountRepository] = MockAccountQueries
#     app.dependency_overrides[get_authenticator] = mock_get_authenticator

#     # Act
#     response = client.post("/accounts", json=req_body)
#     actual = response.json()

#     # Assert
#     assert response.status_code == 200
#     assert actual == expected_create_response

#     # cleanup
#     app.dependency_overrides = {}





def test_login(client, test_user):
    response = client.post("/login",test_user)
    assert response.status_code == 200
    token = response.json()["access_token"]
    assert token is not None
    return token
