const mysql = require('mysql');
const { create } = require('../auth/apikeys');
const errorController = require('../errors/errorController');

var connection;

const createConnection = function (username = 'root', password = '') {
    connection = mysql.createConnection({
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
