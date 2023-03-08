# Narrative Dojo

## Team:
* James Yi
* Olivia Xu
* Floyd Ngov
* Lynn Lyu

# Homepage
![Home](/images/Home.png)

# Website Summary
Narrative Dojo is a website to create **children's book** leveraging the **Dalle-2 AI image generator**. Our goal is that customer can easily made creative children's book so the customer can decide what their children would read. Through a short text prompt, for cover and every page, our AI image API would generate pictures so that the customer can chose from there. Once finished and published, the user can manage the books.

#### How to run
* Clone the repo: `https://gitlab.com/narrative-ninjas/module3-project-gamma.git`
* Open Docker Desktop
* Within your terminal, run the following:
* docker volume create postgres-data
* docker volume create pg-admin
* docker volume create jwtdown-db-data
* docker-compose build (If Apple Silicon Chip: MDOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build)
* docker-compose up

#### Signup/Login/Logout
* create an user account
* log in to user account
* log out of user account

#### Main Page (before signup or login)
* review all books as listed
* sort books by Alphabet, Oldest to Newest, or Newest to Oldest
* review detail for each book
* read all the books created by certain author
* link to write a new book

#### Mybook Page (After login)
* create new book through Dalle-2 AI image generator
* review all book created by the user.
* sort mybooks by Alphabet, Oldest to Newest, or Newest to Oldest
* delete any of my book

#### Back-end Components:

## Models

**Accounts**

- accountID: Provides the id that can be used to reference a specific account.
- username: Provides the username that can be used to log in.
- hashed_password: Provides the password that can be used to log in.

**Cover**

- ID: Provides the id that can be used to reference a specific cover.
- username: Provides the username that is associated with a specific cover, specified as the author of a cover.
- title: Provides the title of the cover.
- cover_image_url: The user will have the option to either provde the url to the image or use the image generated through dall-e-2 that will be used as the cover image.
- created_on: Provides the date that the cover was created on.

**Page**

- pageID: Provides the id that can be used to reference a specific page.
- coverID: Used to interact with the cover model. The ID in the cover model would be matched with the coverID in the page model to combine both models into a book.
- page_image_url: The user will have the option to either provde the url to the image or use the image generated through dall-e-2 that will be used as the page image.
- text: Provides the text or the story of a page.

**Book**

*Not a typical model like cover or page, rather a SQL SELECT statement to join cover and page on cover.ID = page.coverID*

> SELECT ID, username, title, cover_image_url, created_on, pageID, page_image_url, text FROM cover
>
> INNER JOIN page
>
> ON cover.ID = page.coverID

| Feature          | URL          |
|:-----------------|:-------------|
|Create an account|http://localhost:8000/account|
|Login|http://localhost:8000/token|
|View a list of books|http://localhost:8000/books|
|View a specific book|http://localhost:8000/book/ID|
|Delete a book|http://localhost:8000/book/ID|
|Update a book|http://localhost:8000/book/ID|
|Create a cover|http://localhost:8000/covers|
|View a list of covers|http://localhost:8000/covers|
|View a specific cover|http://localhost:8000/cover/ID|
|Delete a cover|http://localhost:8000/cover/ID|
|Update a cover|http://localhost:8000/cover/ID|
|View covers by username|http://localhost:8000/accounts/username/covers|
|Create a page|http://localhost:3000/pages|
|View a list of pages|http://localhost:3000/pages|
|View a specific page|http://localhost:8000/page/pageID|
|Delete a page|http://localhost:8000/page/pageID|
|Update a page|http://localhost:8000/page/pageID|



## Requests

**POST request to /account
```sh
[
	{
		"username": "string",
		"password": "string"
	}
	{
		"access_token": "string",
		"token_type": "Bearer",
		"account": {
		"accountID": "string",
		"username": "string"
		}

	}
]
```

**GET request to /books

```sh
[
	{
		"ID": 2,
		"username": "james",
		"title": "Dogs",
		"cover_image_url": "example_url",
		"created_on": "1111-11-11",
		"pageID": 1,
		"page_image_url": "example_url",
		"text": "dogs text"
	},
	{
		"ID": 3,
		"username": "james",
		"title": "cats",
		"cover_image_url": "example_url",
		"created_on": "2222-11-11",
		"pageID": 2,
		"page_image_url": "example_url",
		"text": "cats text"
	}
]
```
