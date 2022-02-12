const express = require('express');
const appError = require('./errors/appError');
const errorController = require('./errors/errorController');
const courseRouter = require('./routes/courseRoutes');
const userRouter = require('./routes/userRoutes');
const careerRouter = require('./routes/careerRoutes');
const apikeyRouter = require('./routes/apikeyRoutes');

const app = express();

//set up middleware stack
app.use(express.json()); //json request body parser
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//set up routing
app.route('/api/v1/').get((_, res, next) => {
    //api health check route
    res.status(200).json({
        ok: true,
        message: 'API ready to go!',
    });
});
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/careers', careerRouter);
app.use('/api/v1/apikeys', apikeyRouter);

//handle 404 errors: unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//set up global error handler
app.use(errorController.globalErrorHandler);

module.exports = app;
