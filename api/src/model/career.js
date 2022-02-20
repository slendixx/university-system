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
    const coursesQuerySql =
        'SELECT `id asignatura`, `asignatura`, `distribución anual`, `nivel` FROM career_courses WHERE `id carrera` = ?';

    const careersWithCourses = {};
    careersWithCourses.rows = result.rows.map(async (rowData) => {
        const career = { ...rowData };
        career.courses = db.queryAsync(
            db.getConnection(),
            coursesQuerySql,
            career.id
        );

        return career;
    });
    const careersWithCoursesData = await Promise.all(careersWithCourses.rows);
    console.log(careersWithCoursesData);
    // TODO research Promise.all() a method to resolve several promises
    return careersWithCoursesData;
};
