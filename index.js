//declaring const express, path, bodyParser, app
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./user');
const port = process.env.PORT || 8080;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

const mongo_uri = 'mongodb+srv://mongo:carnival@cluster0.2kd43gq.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongo_uri, function (err) {
    if (err) {
        throw err;
    } else {
        console.log(`successfully connected to ${mongo_uri}`);
    }
});


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

