const mysql = require('mysql');
const parseCredentials = require('../utils/parseCredentials');

var connection;
/*
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
*/
module.exports.getConnection = () => {
    return connection;
};

module.exports.queryAsync = (connection, sql, values) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
};

function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on('error', function (error) {
            if (error instanceof Error) {
                if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error(error.stack);
                    console.log('Lost connection. Reconnecting...');

                    initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    connection = mysql.createConnection(config);

    // Add handlers.
    addDisconnectHandler(connection);

    connection.connect();
    return connection;
}

module.exports.initConnection = () => {
    const [username, password] = parseCredentials('./credentials.txt');
    connection = initializeConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: username,
        password: password,
        database: process.env.DB_DBNAME,
        insecureAuth: process.env.DB_INSECURE_AUTH,
    });
};
