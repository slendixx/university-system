//require db, env variables & app modules
const readFyleSync = require('fs').readFileSync;
const dotenv = require('dotenv');
const errorController = require('./src/errors/errorController');
const db = require('./src/model/db');
const app = require('./src/app');

//start listening for synchronous exceptions
process.on('uncaughtException', errorController.handleUncaughtException);

//read env variables
dotenv.config({ path: './config.env' });

//read db connection credentials from safe file
const [username, password] = readFyleSync('./credentials.txt', 'utf-8')
    .split('\n')
    .map((line) => {
        return line.trim();
    });

//attempt connection with db
db.setup({ username, password });
db.connect();

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
