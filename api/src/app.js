const express = require('express');
//require the custom error class
//require the globar error handler to be used as middleware
//require routers

const app = express();

//set up middleware stack
app.use(express.json()); //json request body parser
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//set up routing

//handle 404 errors: unhandled routes

//set up global error handler

module.exports = app;

let globalVariable = require('../server');

globalVariable = 321;
