# Scope

Demo REST API with Node.js, Express, and PostgreSQL for manage user in table

## Database

1- Spin up psql container

```
  docker run -d -p 5555:5432 --name postgress -e POSTGRES_PASSWORD=postgres postgres
```

2- connect to psql
```
   psql -h localhost -p 5555 -U postgres
```

3- Create role 
```
    CREATE ROLE support WITH LOGIN PASSWORD 'example1234';
    ALTER ROLE support CREATEDB;
```

4- connect to psql with support user
```
    psql -h localhost -p 5555 -U support -d postgres
```

5- Create database
```
     CREATE DATABASE support;
```

6- switch database
```
     \c support;
```


7- Create Table
```
  CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  role VARCHAR(30)
);

```


8- Inset dummy data 
```
INSERT INTO users (name, email, role)
   VALUES ('joao', 'joao@example.com', 'member'), ('mario', 'mario@example.com', 'member'), ('nuno', 'nuno@example.com', 'owner ');

```

9- validate data
```
 SELECT * FROM users;
```


## Operations 

### deps
npm i express pg

### Start API
```
node index.js
```

#### Get Users
```
curl -X GET http://localhost:3000/users
```

#### DELETE Users by id

```
curl -X "DELETE" http://localhost:3000/users/5

```

#### ADD user 

```
 curl --data "name=Alexis&email=Alexis@example.com&role=member" http://localhost:3000/users
```


#### update userID 5 

```
curl -X PUT -d "name=Fred" -d "email=fred@example.com" d "role=member" http://localhost:3000/users/5
```