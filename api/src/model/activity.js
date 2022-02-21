const db = require('./dbConnection');

module.exports.select = async (id, parentId) => {
    const values = [];
    values.push(parentId);
    let sql =
        'SELECT `id` AS `id actividad`, `titulo`, `contenido`, `fecha_publicacion`, `fecha_limite`, `calificacion_maxima` FROM actividad WHERE `id_asignatura` = ? ';
    if (id) {
        sql += 'AND `id actividad` = ?;';
        sql += values.push(id);
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
