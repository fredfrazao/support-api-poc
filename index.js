const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./database')
const port = 3000

//Swagger
const Swagger = require("express"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    swagger: "2.0",
    info: {
      title: "POC REST API with Node.js, Express, and PostgreSQL for manage user in table with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./index.js"],
};

/**
* @swagger
* /users:
*   get:
*     summary: Retrieve a list of JSONPlaceholder users
 *     responses:
 *       200:
 *         description: Create a user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
*                     email:
*                       type: string
*                       description: The user's email.
*                     role:
*                       type: string
*                       description: The user's role.
*   post:
*     summary: Create a User
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 description: The user's name.
*                 example: Leanne
*               email:
*                 type: string
*                 description: The user's email.
*                 example: Leanne@example.com
*               role:
*                 type: string
*                 description: The user's role.
*                 example: member
*   delete:
*     summary: Delete a users based on the id
*/
const specs = swaggerJsdoc(options);

app.use(
  "/Swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.get('/', (request, response) => {
    response.json({
        info: 'Support API'
    })
})
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})