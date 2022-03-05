const AppError = require('./appError');

module.exports.handleUncaughtException = (error) => {
    console.error('*** Unhandled exception ***');
    console.log(error);

    process.exit(1);
};

module.exports.handleUnhandledRejection = (server) => {
    // use the closure to be able to user server object inside the returned function
    return (error) => {
        console.error('*** Unhandled Rejection ***');
        console.log(error);

        server.close(() => {
            process.exit(1);
        });
    };
};

module.exports.handleUnhandledRoutes = (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
};

const sendErrorDev = (error, res) => {
    // console.log(error);
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error,
    });
};

const sendErrorProd = (error, res) => {
    if (error.isOperational) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
    console.log('UNKNOWN ERROR:', error);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
    });
};

module.exports.globalErrorHandler = (error, req, res, next) => {
    console.log('Global Error Handler');
    // console.log({ NODE_ENV: process.env.NODE_ENV });
    console.log(error.stack);

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'dev') return sendErrorDev(error, res);
    if (error.message.includes('ER_DUP_ENTRY'))
        error.message = 'The specified email is already in use.';
    return sendErrorProd(error, res);
};

module.exports.handleDBConnectionError = (error) => {
    console.error('error connecting to db: ' + error.stack);
    process.exit(1);
};
