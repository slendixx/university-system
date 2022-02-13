//require db, env variables & app modules
const dotenv = require('dotenv');
const errorController = require('./src/errors/errorController');
const app = require('./src/app');

//start listening for synchronous exceptions
process.on('uncaughtException', errorController.handleUncaughtException);

//read env variables
dotenv.config({ path: './config.env' });

//start listening for requests
const port = Number(process.env.SV_PORT) || 3000;
const server = app.listen(port, () => {
    console.log('Server started. Listening for requests on port: ' + port);
});

//start listening for unhandled rejections on the global asynchronous exception system
process.on(
    'unhandledRejection',
    errorController.handleUnhandledRejection(server)
);
