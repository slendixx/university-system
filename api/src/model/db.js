const mysql = require('mysql');
const errorController = require('../errors/errorController');

let connection;

module.exports.setup = ({ username = 'root', password = '' }) => {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: username,
        password: password,
        database: process.env.DB_DBNAME,
        insecureAuth: process.env.DB_INSECURE_AUTH,
    });
};

module.exports.connect = () => {
    connection.connect(function (err) {
        if (err) {
            errorController.handleDBConnectionError(err);
        }

        console.log('connected to db as id ' + connection.threadId);
    });
};

module.exports.connection = connection;
