const mysql = require('mysql');
const { create } = require('../auth/apikeys');
const errorController = require('../errors/errorController');
const parseCredentials = require('../utils/parseCredentials');

var connection;

const createConnection = function () {
    //read db connection credentials from safe file
    const [username, password] = parseCredentials();

    return mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: username,
        password: password,
        database: process.env.DB_DBNAME,
        insecureAuth: process.env.DB_INSECURE_AUTH,
    });
};

module.exports.getConnection = function () {
    if (!connection) connection = createConnection();

    return connection;
};
