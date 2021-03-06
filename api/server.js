//require db, env variables & app modules
const dotenv = require('dotenv');
//read env variables
dotenv.config({ path: './config.env' });
const errorController = require('./src/errors/errorController');
const app = require('./src/app');
const db = require('./src/model/dbConnection');

//start listening for synchronous exceptions
process.on('uncaughtException', errorController.handleUncaughtException);

//connect to db
db.initConnection();

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
