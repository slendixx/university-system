const mysqlDates = require('../utils/mysqlDates');
const db = require('./dbConnection');

module.exports.select = async (id, getCourses) => {
    let sql = 'SELECT * FROM career_full';
    if (id) sql += ' WHERE id = ?;';
    const values = [];
    if (id) values.push(id);
    const result = {};
    try {
        result.rows = await db.queryAsync(db.getConnection(), sql, values);
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    if (!getCourses) return result;

    let coursesQuerySql =
        'SELECT `id carrera`, `id asignatura`, `asignatura`, `distribución anual`, `nivel` FROM career_courses WHERE `id carrera` ';
    if (id) coursesQuerySql += '= ?';
    else {
        coursesQuerySql += 'IN ($)';
        const idSet = result.rows.map((rowData) => rowData.id).join(',');
        coursesQuerySql = coursesQuerySql.replace('$', idSet);
    }

    let careerCourses;
    if (id) {
        careerCourses = await db.queryAsync(
            db.getConnection(),
            coursesQuerySql,
            id
        );
    } else {
        careerCourses = await db.queryAsync(
            db.getConnection(),
            coursesQuerySql
        );
    }

    result.rows.forEach((career) => {
        career.courses = careerCourses.filter(
            (course) => course['id carrera'] === career.id
        );
    });

    return result;
};
