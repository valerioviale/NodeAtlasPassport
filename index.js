//This is a Node.js file that creates an API server using the Express framework. 
//Here is a brief overview of what the code does:
//Imports the required dependencies: dotenv for loading environment variables, 
require('dotenv').config();
//Express for creating the server, path for handling file paths, body-parser for parsing request bodies, 
//(declaring const express, path)
const express = require('express');
const path = require('path');
const app = express();

//bcrypt for hashing passwords, and Mongoose for connecting to a MongoDB database.
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./user');
const port = process.env.PORT || 8080;

//Configures the app to use JSON and urlencoded middleware to parse incoming requests and...
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//...serve static files from the public directory.
app.use(express.static(path.join(__dirname, 'public')));
//Connects to the MongoDB database specified in the environment variable using Mongoose.
const mongo_uri = process.env.mongo_uri;

mongoose.connect(mongo_uri, function (err) {
    if (err) {
        throw err;
    } else {
        console.log(`successfully connected to ${mongo_uri}`);
    }
});

// Defines two API endpoints: /register for registering a new user and /authenticate 
// for authenticating an existing user. 
// Both endpoints expect a request body in JSON format and respond with JSON data.
app.post('/register', function (req, res) {
    const { firstName, lastName, username, password } = req.body;

const user = new User({ firstName, lastName, username, password });

user.save(err => {
        if (err) {
            res.status(500).send('error for user registration');
        } else {
            res.status(200).send('registration completed');
        }
    });
});

app.post('/authenticate', function (req, res) {
  const { username, password } = req.body;

  User.findOne({ username })
      .then((user) => {
          if (!user) {
              return Promise.reject(new Error('The user does not exist'));
          }
          if (!bcrypt.compareSync(password, user.password)) {
              return Promise.reject(new Error('Wrong password'));
          }
          return res.status(200).send('authenticated successfully');
      })
      .catch((err) => {
          res.status(500).send(err.message);
      });
});

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});
module.exports = app;

