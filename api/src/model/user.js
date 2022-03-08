const bcrypt = require('bcrypt');
const isEmail = require('validator').isEmail;
const calculateIdealHashCost = require('../security/calculateIdealHashCost');
const mysqlDates = require('../utils/mysqlDates');
const db = require('./dbConnection');
const course = require('./course');

module.exports.insert = async (data) => {
    const userData = { ...data }; //make a carbon copy of the provided user data to avoid modifying the function argument
    const result = {
        ok: false,
    };

    //validate user data
    if (!userData.firstName) {
        result.message = 'No first name was provided';
        return result;
    }
    if (!userData.lastName) {
        result.message = 'No last name was provided';
        return result;
    }
    if (!userData.email) {
        result.message = 'No email was provided';
        return result;
    }
    if (!isEmail(userData.email)) {
        result.message = 'Invalid email';
        return result;
    }
    if (userData.email > 100) {
        result.message = 'Email must be less than 100 characters long';
        return result;
    }
    if (!userData.password) {
        result.message = 'No password was provided';
        return result;
    }
    if (userData.password.length < 8 || userData.password.length > 30) {
        result.message = 'Password must be 8 to 30 characters long';
        return result;
    }
    if (!userData.gender) {
        result.message = 'No gender was provided';
        return result;
    }
    if (!['m', 'f'].includes(userData.gender)) {
        result.message = 'Invalid gender';
        return result;
    }
    if (!userData.birthYear) {
        result.message = 'No birth year was provided';
        return result;
    }
    if (!userData.birthMonth && userData.birthMonth !== 0) {
        result.message = 'No birth month was provided';
        return result;
    }
    if (!userData.birthDay) {
        result.message = 'No birth day was provided';
        return result;
    }
    if (!userData.career) {
        result.message = 'No career was specified';
        return result;
    }
    //verify if input careerId exists
    const verifyCareerId = 'CALL career_exists(?)';
    let careerExistsResult;
    try {
        careerExistsResult = await db.queryAsync(
            db.getConnection(),
            verifyCareerId,
            userData.career
        );
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    if (!careerExistsResult[0][0].exists) {
        result.message = 'The specified career does not exist';
        return result;
    }

    //complete user data
    userData.firstName = userData.firstName.toLowerCase();
    userData.lastName = userData.lastName.toLowerCase();
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
    const sql =
        'INSERT INTO usuario (nombre,apellido,email,password,id_rol_usuario,fecha_nacimiento,fecha_creacion_cuenta,genero) VALUES (?,?,?,?,?,?,?,?);'; //TODO not setting the value of career on user creation
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

    try {
        await db.queryAsync(connection, sql, values);
        result.message = 'User created.';
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};

module.exports.select = async (id, getCourses) => {
    //TODO do not return sensitive data. wtf was I thinking
    let sql = 'SELECT * FROM user_full';
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

    if (result.rows.length === 0) {
        result.message = 'No user found for the given id'; //TODO add 404 checks to other models, espcially careers
        result.ok = false;
        return result;
    }

    if (!getCourses) return result;

    const courses = await course.select({
        id: null,
        getCoursesFor: 'user',
        parentId: id,
    });
    result.rows[0].courses = courses.rows;

    return result;
};

module.exports.findOne = async (email) => {
    const sql = 'SELECT * FROM user_full WHERE email = ?;';
    const connection = db.getConnection();
    const result = {};
    try {
        result.rows = await db.queryAsync(connection, sql, [email]);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};
