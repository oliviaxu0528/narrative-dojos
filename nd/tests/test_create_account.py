from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepository, AccountIn, AccountOutWithPassword
import random
import string

client = TestClient(app)


def generate_random_username(length=10):
    return ''.join(random.choices(string.ascii_letters, k=length))


def test_create_account():
    # Arrange
    username = generate_random_username()
    repository = AccountRepository()
    account_in = AccountIn(username=username, password="testpassword")
    account_out = AccountOutWithPassword(
        accountID=1, username=username, hashed_password="")
    hashed_password = "hashed_password"

    # Act
    created_account = repository.create(account_in, hashed_password)

    # Assert
    assert created_account.username == account_out.username
    assert created_account.accountID is not None
    assert created_account.hashed_password == hashed_password

# Assert


def test_init():
    assert 1 == 1
