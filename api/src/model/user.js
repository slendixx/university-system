const bcrypt = require('bcrypt');
const calculateIdealHashCost = require('../security/calculateIdealHashCost');
const generateDatetime = require('../utils/generateMysqlDatetime');
const db = require('./dbConnection');

module.exports.insert = async (data) => {
    //complete user data
    const userData = { ...data }; //make a carbon copy of the provided user data to avoid modifying the function argument
    userData.birthDate = generateDatetime(userData.birthDate.toISOString());
    userData.creationDate = generateDatetime(new Date().toISOString());

    const connection = db.getConnection();
    const sql = "SELECT `id` FROM `rol_usuario` WHERE `rol` = 'alumno';";
    const result = await db.queryAsync(connection, sql);
    console.log(result);

    //TODO validate user data
    const hashCost = await calculateIdealHashCost();
    const hashedPassword = await bcrypt.hash(userData.password, hashCost);
    userData.password = hashedPassword;
};
