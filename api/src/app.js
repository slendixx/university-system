const express = require('express');
const cors = require('cors');
const passport = require('passport');
const AppError = require('./errors/appError');
const errorController = require('./errors/errorController');
const userRouter = require('./routes/userRoutes');
const careerRouter = require('./routes/careerRoutes');
const apikeyRouter = require('./routes/apikeyRoutes');
const authRouter = require('./routes/authRoutes');
const courseRouter = require('./routes/courseRoutes');
const authenticateApikey = require('./auth/apikeys').authenticate;

const app = express();

app.use(cors());
//set up middleware stack
app.use(express.json()); //json request body parser
app.use((req, res, next) => {
    console.log('request to: ' + req.originalUrl);
    console.log('method: ' + req.method);

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
//TODO api keys will be disabled during development
//app.use(authenticateApikey); //all requests must provide the header 'apikey' bearing a nonhashed apikey

require('./auth/passportConfig');
app.use(passport.initialize());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/careers', careerRouter);
app.use('/api/v1/apikeys', apikeyRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courses', courseRouter);

//handle 404 errors: unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//set up global error handler
app.use(errorController.globalErrorHandler);

module.exports = app;
