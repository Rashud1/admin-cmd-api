# admin-cmd-api

# Ecommerce admin api

This project is fro the admin panel of the ecommerce website.

## How to run

- Clone the project
- Run `npm install`

workflow

create user router

<!-- ecommerce admin api -->

this backend api project is created fro the ecommerce admin cms panel

### Api end points

All the api endpoint will be followed by `${rootUrl}/api/v1`

### User API endpoints

Alluser api endpoint will be followed by `${rootUrl}/api/v1/user`

| #   | API | Method | DESCRIPTION                 |
| --- | --- | ------ | --------------------------- |
| 1.  | `/` | GET    | Get all users               |
| 2.  | `/` | POST   | Create new user in database |

### Catalog API endpoints

All catalog api endpoint will be followed by `${rootUrl}/api/v1/category`

| #   | API      | Method | DESCRIPTION                                                                  |
| --- | -------- | ------ | ---------------------------------------------------------------------------- |
| 1.  | `/:_id?` | GET    | Get all Category if `_id`id is provided, otherwise return all the categories |
| 2.  | `/`      | POST   | Create new catalog in database                                               |
| 2.  | `/`      | PATCH  | Update catalog in database                                                   |
| 2.  | `/:_id`  | DELETE | Delete catalog in database                                                   |
