const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const process = require('./config/env_variables.js');
const app = express();
const passport = require('passport');
const websiteRoute = require('./routes/website');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Body parser middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set static path
app.use(express.static(path.join(__dirname, 'client')));

//DB Config
const db = process.env.mongoURI;

//Connect to MongoDB
const initMongo = async _ => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    //   useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('Connection with Mongo established.');
  } catch (err) {
    console.error('Error connecting mongoose', err);
  }
}

initMongo();
// Passport middleware
app.use(passport.initialize());



// Maintain Version
let version = 'v1';

// Routes which should handle requests
 app.use(`/api/${version}/website`, websiteRoute);

//serving static files
app.use("/uploads", express.static(__dirname + "/uploads"));

// Error Hanlding
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message });
});

app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, '../index.html'));
});



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));