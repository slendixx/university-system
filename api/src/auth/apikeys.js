const bcrypt = require('bcrypt');
const calculateIdealHashCost = require('../security/calculateIdealHashCost');
const db = require('../model/dbConnection');

const API_KEY_LENGHT = 30;
const API_KEY_BASE = 36;

const generateApikey = ({ length, base }) => {
    return [...Array(length)]
        .map(() => {
            return ((Math.random() * base) | 0).toString(base);
        })
        .join('');
};
/*
module.exports.create = async ({ host, alias }) => {
    const apikey = generateApikey({
        length: API_KEY_LENGHT,
        base: API_KEY_BASE,
    });
    const hashCost = await calculateIdealHashCost();
    const hashedKey = await bcrypt.hash(apikey, hashCost);
    const sql =
        'INSERT INTO `api_key` (`value`, `host`, `alias`) VALUES (?, ?, ?);';
    const connection = db.getConnection();
    connection.connect();
    connection.query(sql, [hashedKey, host, alias], (error, result) => {
        if (error) {
            throw error;
        }
        console.log(result);
    });
    connection.end();
};
*/
module.exports.insert = async ({ host, alias }) => {
    const apikey = generateApikey({
        length: API_KEY_LENGHT,
        base: API_KEY_BASE,
    });
    const hashCost = await calculateIdealHashCost();
    const hashedKey = await bcrypt.hash(apikey, hashCost);
    const sql =
        'INSERT INTO `api_key` (`value`, `host`, `alias`) VALUES (?, ?, ?);';
    const values = [hashedKey, host, alias];
    const connection = db.getConnection();

    const results = {};
    try {
        await db.queryAsync(connection, sql, values);
        results.apikey = apikey;
        results.ok = true;
    } catch (error) {
        results.message = error;
        results.ok = false;
    }
    return results;
};

module.exports.select = async (id = null) => {
    let sql = 'SELECT * FROM api_key';
    if (id) sql += ' WHERE id = ?;';
    const values = [];
    if (id) values.push(id);
    const results = {};
    try {
        results.rows = await db.queryAsync(db.getConnection(), sql, values);
        results.ok = true;
    } catch (error) {
        results.message = error;
        results.ok = false;
    }
    return results;
};
