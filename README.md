# BOILERPLATE DIRECTIONS

-   clone with command `npx degit githubusername/githubreponame#branchname projectName`
-   cd into new project folder
-   run `npm install` to install dependencies
-   rename template.env to .env
-   make sure to replace MONGODB_URL with a working Mongo URL
-   enjoy!

to kill server on port: sudo kill -9 $(sudo lsof -t -i:3000)

#### see Ira Herman's simple [example repo](https://github.com/iscott/fruits-express-mongo-project-starter)

###### for templates on controllers, models and views (for edit.ejs, index.ejs, new.ejs and show.ejs)

# RESTful Routes to CRUD Mapping

Example resource: **fruits**
In **I.N.D.U.C.E.S.** route order:
| **URL** | **HTTP Verb** | **Action**| **Notes**|
|------------|-------------|------------|----------
| /fruits/ | GET | index | INDEX when a user types `localhost:3000/fruits` in browser this route shows a `list` or `index` of all fruits
| /fruits/new | GET | new | NEW when a user types `localhost:3000/fruits/new` in browser this route shows the user a form to create a `NEW` fruit
| /fruits/:id | DELETE | destroy | DELETE initiates a delete request through a form submission with `action = http://localhost:3000/fruits/:idOfFruit` and allows the application the ability to `delete` a fruit
| /fruits/:id | PUT | update | UPDATE initiates a put request through a form submission with `action = http://localhost:3000/fruits/:idOfFruit` and allows the application the ability to `Update` data about a fruit
| /fruits | POST | create | CREATE initiates a post request through a form submission with `action = http://localhost:3000/fruits/` and allows the application the ability to `Create` a fruit  
| /fruits/:id/edit | GET | edit | EDIT when a user types `localhost:3000/fruit/:idOfFruit/edit` in browser shows the user a form to `edit` a fruit
| /fruits/:id | GET | show | SHOW when a user types `localhost:3000/fruit/:idOfFruit` shows the user an `Individual` fruit in the browser

# Additional example resource: **posts**

| HTTP Method<br>(Verb) | URI (endpoint) | CRUD Operation          | Typical<br>Controller Action | Has Data<br>Payload |
| --------------------- | -------------- | ----------------------- | :--------------------------: | :-----------------: |
| GET                   | /posts         | Read all _posts_        |            index             |         No          |
| GET                   | /posts/:id     | Read a specific _post_  |             show             |         No          |
| POST                  | /posts         | Create a new _post_     |            create            |         Yes         |
| PUT/PATCH             | /posts/:id     | Update specified _post_ |            update            |         Yes         |
| DELETE                | /posts/:id     | Delete specified _post_ |            delete            |         No          |

Additional Common CRUD-less Routes (views with forms to perform create and update actions)
HTTP Method<br>(Verb) | URI (endpoint) | Purpose | Typical<br>Controller Action |Has Data<br>Payload
-----------|------------------|------------------|:---:|:---:
GET | /posts/new | Return view (form) to add a new _post_. Form submit hits `CREATE` route | new | No
GET | /posts/:id/edit | Return view (form) to edit a _post_. Form submit hits `UPDATE` route| edit | No

# Routing for Nested Resources (One:Many & Many:Many Relationships)

| HTTP Method<br>(Verb) | URI (endpoint)          | CRUD Operation<br>or Purpose     |                                 Note                                 |
| --------------------- | ----------------------- | -------------------------------- | :------------------------------------------------------------------: |
| GET                   | /posts/:id/comments     | Read all _comments_ for a _post_ |                              No payload                              |
| GET                   | /comments/:id           | Read one _comment_ for a _post_  |                     "Shallow" route / No payload                     |
| GET                   | /posts/:id/comments/new | n/a (Non-RESTful)                | OPTIONALLY display a dedicated form used to create a nested resource |
| POST                  | /posts/:id/comments     | Create a _comment_ for a _post_  |                            Needs Payload                             |
| PUT/PATCH             | /comments/:id           | Update specified _comment_       |                   "Shallow" route / Needs payload                    |
| DELETE                | /comments/:id           | Delete specified _comment_       |                     "Shallow" route / No payload                     |

"Shallow routes are for CRUD operations where the parent's `id` is not needed. For example,
you do not need the `id` of the _post_ route to delete a specific _comment_ - you only
need that particular _comment's_ `id`.
