const bcrypt = require('bcrypt');
const calculateIdealHashCost = require('../security/calculateIdealHashCost');
const db = require('../model/dbConnection');
const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');

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

    const result = {};
    try {
        await db.queryAsync(connection, sql, values);
        result.apikey = apikey;
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};

module.exports.select = async (id = null) => {
    let sql = 'SELECT * FROM api_key';
    if (id) sql += ' WHERE id = ?;';
    const values = [];
    if (id) values.push(id);
    const result = {};
    try {
        result.rows = await db.queryAsync(db.getConnection(), sql, values);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};
/**
 * Middleware to authenticate apikeys
 */
module.exports.authenticate = catchAsync(async (req, res, next) => {
    if (!req.headers.apikey)
        return next(new AppError('No API key was provided', 401));
    const apikey = req.headers.apikey;

    let keyFound = false;
    const hashedKeysDataPackets = await module.exports.select();
    const hashedKeys = hashedKeysDataPackets.rows;

    for (let i = 0; i < hashedKeys.length; i++) {
        const rowDataPacket = hashedKeys[i];
        keyFound = await bcrypt.compare(apikey, rowDataPacket.value);
    }

    if (!keyFound) return next(new AppError('Invalid API key', 401));

    next();
});
