<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Web Engineering Midterm (Read Carefully)

## Stack Used
* PostgreSQL
* Nest
* Docker

## Steps to Get It Running

1. Clone the repo

2. Duplicate the __.env.template__ file and rename the copy to __.env__

3. Fill in the environment variables defined in the __.env__

4. Start the Docker container

```
docker compose --env-file .env up --build -d
```
5. Rebuild the database with the seed
```
http://localhost:<port>/seed 
```
6. See documentation
```
http://localhost:<port>/api 
```
7. Postman requests
```
https://documenter.getpostman.com/view/34387005/2sAXqp7iM8
```