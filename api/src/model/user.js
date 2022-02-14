const bcrypt = require('bcrypt');
const calculateIdealHashCost = require('../security/calculateIdealHashCost');
const mysqlDates = require('../utils/mysqlDates');
const db = require('./dbConnection');

module.exports.insert = async (data) => {
    //TODO validate user data

    //complete user data
    const userData = { ...data }; //make a carbon copy of the provided user data to avoid modifying the function argument
    userData.birthDate = mysqlDates.generateDate(
        new Date(userData.birthYear, userData.birthMonth, userData.birthDay)
    );
    userData.creationDate = mysqlDates.generateDatetime(new Date());

    //get id associated with the default user role
    const connection = db.getConnection();
    const userRoleIdQuerySql =
        "SELECT `id` FROM `rol_usuario` WHERE `rol` = 'alumno';";
    const roleIdQueryResult = await db.queryAsync(
        connection,
        userRoleIdQuerySql
    );
    const roleId = roleIdQueryResult[0].id;
    userData.userRole = roleId;
    //hash user password
    const hashCost = await calculateIdealHashCost();
    const hashedPassword = await bcrypt.hash(userData.password, hashCost);
    userData.password = hashedPassword;
    //
    const sql =
        'INSERT INTO usuario (nombre,apellido,email,password,id_rol_usuario,fecha_nacimiento,fecha_creacion_cuenta,genero) VALUES (?,?,?,?,?,?,?,?);';
    const values = [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
        userData.userRole,
        userData.birthDate,
        userData.creationDate,
        userData.gender,
    ];

    console.log(userData);
    const result = {};
    try {
        await db.queryAsync(connection, sql, values);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};
