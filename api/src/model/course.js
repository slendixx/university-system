const db = require('./dbConnection');

module.exports.select = async (id, getCoursesFor, parentId) => {
    let sql;
    const values = [];
    values.push(parentId);
    if (getCoursesFor === 'career')
        sql =
            'SELECT `id carrera`, `id asignatura`, `asignatura`, `distribución anual`, `nivel` FROM career_courses WHERE `id carrera` = ? ';
    if (getCoursesFor === 'user')
        sql =
            'SELECT `id usuario`, `id asignatura`, `asignatura` FROM user_courses WHERE `id usuario` = ? ';
    if (id) {
        sql += 'AND `id asignatura = ?`';
        values.push(id);
    }

    const result = {};
    try {
        result.rows = await db.queryAsync(db.getConnection(), sql, values);
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    return result;
};
