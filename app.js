//------------IMPORTS-----------
//imports express to the project
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//assigns all express methods to the app variable starts the server.
const app = express();

//------------------MIDDLE WARE-------------------------
//.use is the middleware method for express
//makes middleware available to app. Morgan allows for the usage of
//reading the response.body which displays in the terminal
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Custom middleware
//Middleware has access to the req & res objects. It also has next which will call the next function to persist.
//when .use is used and the next is an argument express knows this is a middleware function.
app.use((req, res, next) => {
	console.log('Hello from the middleware ♥♥♥', req.body);
	req.requestTime = new Date().toISOString();
	//Middle ware needs the request response cycle to persist so you have to use the next function for it to work.
	next();
});

//------------------------ROUTERS---------------------------------
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Exporting app for use with server.js
module.exports = app;
