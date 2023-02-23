# NodeAtlasPassport

API Server with Express and MongoDB
This is a Node.js file that creates an API server using the Express framework and connects to a MongoDB database using Mongoose. 
The API server has two endpoints: /register and /authenticate. The /register endpoint is used to register a new user, 
and the /authenticate endpoint is used to authenticate an existing user.

Prerequisites
Before running this code, you will need to install the following dependencies:

dotenv
express
path
body-parser
bcrypt
mongoose
Getting started
Clone this repository.
Install the dependencies using the following command:
bash
Copy code
npm install
Create a .env file in the root directory of the project and set the following environment variables:
bash
Copy code
PORT=8080
MONGO_URI=mongodb://localhost:27017/mydatabase
Start the server using the following command:
bash
Copy code
npm start
You can now make requests to the API endpoints at http://localhost:8080/register and http://localhost:8080/authenticate.
API endpoints
POST /register
This endpoint is used to register a new user.

Request body:

json
Copy code
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "password": "mypassword"
}
Response:

200 OK if the registration was successful.
500 Internal Server Error if there was an error while registering the user.
POST /authenticate
This endpoint is used to authenticate an existing user.

Request body:

json
Copy code
{
  "username": "johndoe",
  "password": "mypassword"
}
Response:

200 OK if the user was authenticated successfully.
500 Internal Server Error if there was an error while authenticating the user.
404 Not Found if the user does not exist.
401 Unauthorized if the password is incorrect.
