const db = require('./dbConnection');
const activity = require('./activity');
const generateSqlFieldPlaceholders = require('../utils/generateSqlFieldPlaceholders');

module.exports.select = async ({
    id,
    getCoursesFor,
    parentId,
    getActivities,
    getGrades,
}) => {
    let sql;
    const values = [];

    values.push(parentId);
    if (getCoursesFor === 'career')
        sql =
            'SELECT `id carrera`, `id asignatura`, `asignatura`, `distribución anual`, `nivel` FROM career_courses WHERE `id carrera` = ? ';
    if (getCoursesFor === 'user')
        sql =
            'SELECT `id usuario`, `id asignatura`, `asignatura` FROM user_courses WHERE `id usuario` = ? ';
    if (getGrades)
        sql =
            'SELECT `id_actividad`, `titulo`, `calificacion`, `calificacion_maxima`,`asignatura`, `id_asignatura` FROM user_grades WHERE `id_alumno` = ? ';
    if (id) {
        sql += 'AND `id asignatura` = ?;';
        values.push(id);
    }

    const result = {};
    try {
        result.rows = await db.queryAsync(db.getConnection(), sql, values);
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    if (!getActivities) return result;

    const activities = await activity.select(null, id);

    result.rows[0].activities = activities.rows;

    return result;
};

module.exports.insertUserCourse = async ({ id, courseId }) => {
    let sql = 'CALL user_course_exists(?,?);';
    let userCourseExistsResult;
    const connection = db.getConnection();
    const result = {};

    try {
        userCourseExistsResult = await db.queryAsync(connection, sql, [
            id,
            courseId,
        ]);
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    if (userCourseExistsResult[0][0].exists) {
        result.ok = true;
        result.message = 'user is already subscribed';
        return result;
    }

    sql =
        'INSERT INTO asignatura_usuario (id_usuario, id_asignatura) VALUES (?,?);';
    try {
        result.rows = await db.queryAsync(connection, sql, [id, courseId]);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};

module.exports.deleteUserCourse = async ({ id: userId, courseId }) => {
    const sql =
        'DELETE FROM asignatura_usuario WHERE id_usuario = ? AND id_asignatura = ?;';
    const connection = db.getConnection();
    const result = {};

    try {
        result.rows = await db.queryAsync(connection, sql, [userId, courseId]);
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    //Delete all matching grades for the user on the activities of the unsubscribed course

    const unsubActivityIdsSql =
        'SELECT id FROM actividad WHERE id_asignatura = ?;';
    let unsubActivityIds = [];
    try {
        unsubActivityIds = await db.queryAsync(
            connection,
            unsubActivityIdsSql,
            courseId
        );
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    if (unsubActivityIds.length === 0) return result;
    //TODO finish the grade deletion on course unsubscription
    let unsubFromActivitiesSql =
        'DELETE FROM calificacion_alumno WHERE id_alumno = ? AND id_actividad IN ';
    unsubFromActivitiesSql += generateSqlFieldPlaceholders(unsubActivityIds);

    try {
        await db.queryAsync(connection, unsubFromActivitiesSql, [
            userId,
            ...unsubActivityIds,
        ]);
    } catch (error) {
        result.message = error;
        result.ok = false;
    }
    return result;
};
