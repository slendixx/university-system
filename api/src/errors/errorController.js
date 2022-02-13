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
    console.log(error.stack);

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(error, res);
    }
    let operationalError = { ...error };

    //TODO transform operationalError depending on what error details we want to display to prod
};

module.exports.handleDBConnectionError = (error) => {
    console.error('error connecting to db: ' + error.stack);
    process.exit(1);
};
