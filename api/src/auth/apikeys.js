const bcrypt = require('bcrypt');
const calculateIdealHashCost = require('../security/calculateIdealHashCost');
const db = require('../model/dbConnection');
const AppError = require('../errors/appError');

const API_KEY_LENGHT = 30;
const API_KEY_BASE = 36;

const generateApikey = ({ length, base }) => {
    return [...Array(length)]
        .map(() => {
            return ((Math.random() * base) | 0).toString(base);
        })
        .join('');
};

module.exports.create = async ({ host, alias }) => {
    const apikey = generateApikey({
        length: API_KEY_LENGHT,
        base: API_KEY_BASE,
    });
    const hashCost = await calculateIdealHashCost();
    const hashedKey = await bcrypt.hash(apikey, hashCost);
    const sql =
        'INSERT INTO `api_key` (`value`, `host`, `alias`) VALUES (?, ?, ?);';
    db.query(sql, [hashedKey, host, alias]);
};
