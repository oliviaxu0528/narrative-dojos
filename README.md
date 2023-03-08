# Narrative Dojo

Team:

* James Yi 
* Olivia Xu
* Floyd Ngov
* Lynn Lyu

# Homepage
![Homepage](/images/Homepage.png)

# Website Summary
Narrative Dojo is a website to create children's book leveraging the Dalle-2 AI image generator. Our goal is that customer can easily made creative children's book so the customer can decide what their children would read. Through a short text prompt, for cover and every page, our AI image API would generate pictures so that the customer can chose from there. Once finished and published, the user can manage the books.
 
#### How to run
* Clone the repo: `https://gitlab.com/narrative-ninjas/module3-project-gamma.git`
* Open Docker Desktop
* Within your terminal, run the following:
* docker volume create postgres-data
* docker volume create pg-admin
* docker volume create jwtdown-db-data
* docker-compose build (If Apple Silicon Chip: MDOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build)
* docker-compose up

#### Components
* Front-end: React
* Back-end: FastAPI
* Database: PostgreSQL

# Functionality：

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

