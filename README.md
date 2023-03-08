# Module3 Project Gamma

## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

* Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
* Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

* [ ] Wire-frame diagrams
* [ ] API documentation
* [ ] Project is deployed to Render.com/GitLab-pages
* [ ] GitLab issue board is setup and in use
* [ ] Journals

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `sample_service`, are
sample services, that you can start building off of or use
as a reference point.

Inside of `ghi` is a minimal React app that has an "under
construction" page. It is setup similarly to all of the
other React projects that you have worked on.

Inside of `sample_service` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `sample_service` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The sample Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

* `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
* `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to Render.com. We will learn much more about this file.
* `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

* make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
* remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

* add these GitLab CI/CD variables:
  * PUBLIC_URL : this is your gitlab pages URL
  * SAMPLE_SERVICE_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Create render.com account and application

* create account on render.com
* one person create a group and invite all other members
* create a new "Web Service"
  * authenticate with GitLab and choose your project
  * Enter fields:
    * Name: name of your service
    * Root Directory: the directory of your service in your git repo.
      For this example use "sample_service".
    * Environment: Docker
    * Plan Type: Free
  * click the "Create Web Service" button to create it
  * the build will succeed and it will look like the server is running,
    most likely, in 6-10 minutes, it will fail.
  * click "Manual Deploy" -> "Deploy latest commit" and the service
    should deploy successfully.

### Update GitLab CI/CD variables

Copy the service URL for your new render.com service and then paste
that into the value for the SAMPLE_SERVICE_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.


# CarCar

Team:

* James Yi - Sales
* Chris Lee - Service

# Homepage
![Homepage](/images/Homepage.png)

# UI
CarCar is a website used to manage the CarCar Dealership. From CarCar's website Employees can register themselves as a new Salesperson or new Service Technician. Salespeople have the ability to create new sales, view all previous sales. Technicians have the ability to view all appointments coming up as well as view service history of a specific vehicle by its vin. All CarCar employees have the ability to go and create new vehicles and add them to the dealership inventory.

#### Navigating
* From the navigation bar you will find all of the associated links to navigate you the various components of our website mentioned above.

# Website Functionality
CarCar is comprised of 3 microservices: Inventory-API, Sales-API and Service-API. The Inventory-API is responsible for managing vehicle information(which includes, manufacturer, model and vehicle description) as well as managing the RESTful-APIs needed to create and update vehicle information.

#### How to run
* Clone the repo: `https://gitlab.com/chris_lee253/project-beta.git`
* Open Docker Desktop
* Within your terminal, run the following:
* docker volume create beta-data
* docker-compose build
* docker-compose up

#### Components
* Front-end: React
* Back-end: Django
* Database: PostgreSQL

#### Sales microservice:
The Sales Microservice allows a user to:
* Create a new salesperson by providing the name and employee number of the salesperson.
* Create a new customer by providing the name, address, and phone number of the customer.
* Create a new sale by providing selecting the automobile, salesperson, and customer from a drop down menu. Then provide a price for the sale.
* View a list of sales which provides the name of the salesperson, the salesperson's employee number, customer name, VIN of automobile, and price of the automobile.
* View a history of sales by salesperson, which provides everything a list of sales would provide sorted by the salesperson.

#### Service Microservice:
The Service Microservice allows a user to:
* Create a technician by providing the technicians name and employee number (Which the user will manually input).
* Create an appointment, which requires a user to provide a VIN number, desired date for service, technician, and reason for service appointment.
* View a list of appointments and establish when a appointment is cancelled or finished. If the user purchased their vehicle from the dealership, it will also indicate that they have VIP status.
* Users can view service history for a specific car by searching the VIN of the vehicle.




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
|List of automobiles|http://localhost:3000/automobile|
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
```
#### POST request to api/manufacturers/

Request body:
```sh
{
    "name": "BMW"
}
```
Returns:
```sh
{
    "href": "/api/manufacturers/5/",
    "id": 5,
    "name": "BMW"
}
```
#### GET request to api/models/

```sh
{
    "models": [
	    {
	    	"href": "/api/models/1/",
	    	"id": 1,
	    	"name": "A8",
	    	"picture_url": "https://pictures.dealer.com/b/bernardiaudiaoa/0743/bab41a0972960f05ca972fd6b19d1454x.jpg",
	    	"manufacturer": {
        		"href": "/api/manufacturers/1/",
	    		"id": 1,
	    		"name": "Audi"
	    	}
	    }
    ]
}
```
#### POST request to api/models/

Request body:
```sh
{
    "name": "M3",
    "picture_url": "https://d2ivfcfbdvj3sm.cloudfront.net/7fc965ab77efe6e0fa62e4ca1ea7673bb25f43560e1e3d8e88cb10/stills_0640_png/MY2022/15275/15275_st0640_116.png",
    "manufacturer_id": 5
}
```
Returns:
```sh
{
    "href": "/api/models/2/",
    "id": 2,
    "name": "M3",
    "picture_url": "https://d2ivfcfbdvj3sm.cloudfront.net/7fc965ab77efe6e0fa62e4ca1ea7673bb25f43560e1e3d8e88cb10/stills_0640_png/MY2022/15275/15275_st0640_116.png",
    "manufacturer": {
    	"href": "/api/manufacturers/5/",
    	"id": 5,
    	"name": "BMW"
    }
}
```
#### GET request to api/automobiles/

```sh
{
    "autos": [
    	{
    		"href": "/api/automobiles/2FAFP71W9YX180793/",
    		"id": 1,
    		"color": "Black",
    		"year": 2023,
    		"vin": "2FAFP71W9YX180793",
    		"model": {
    			"href": "/api/models/1/",
    			"id": 1,
    			"name": "A8",
    			"picture_url": "https://pictures.dealer.com/b/bernardiaudiaoa/0743/bab41a0972960f05ca972fd6b19d1454x.jpg",
    			"manufacturer": {
    				"href": "/api/manufacturers/1/",
    				"id": 1,
    				"name": "Audi"
    			}
    		}
    	},
    	{
    		"href": "/api/automobiles/BMW123C3BM231285/",
    		"id": 2,
    		"color": "Black",
    		"year": 2022,
    		"vin": "BMW123C3BM231285",
    		"model": {
    			"href": "/api/models/2/",
    			"id": 2,
    			"name": "M3",
    			"picture_url": "https://d2ivfcfbdvj3sm.cloudfront.net/7fc965ab77efe6e0fa62e4ca1ea7673bb25f43560e1e3d8e88cb10/stills_0640_png/MY2022/15275/15275_st0640_116.png",
    			"manufacturer": {
    				"href": "/api/manufacturers/5/",
    				"id": 5,
    				"name": "BMW"
    			}
    		}
    	}
    ]
}
```

#### Context Map
![Context Map](/images/Excalidraw.png)


