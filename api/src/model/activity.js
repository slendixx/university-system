const db = require('./dbConnection');

module.exports.select = async (id, parentId) => {
    const values = [];
    values.push(parentId);
    let sql =
        'SELECT `id` AS `id_actividad`, `titulo`, `contenido`, `fecha_publicacion`, `fecha_limite`, `calificacion_maxima` FROM actividad WHERE `id_asignatura` = ? ';
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

module.exports.insert = async ({ parentId, data }) => {
    //TODO validate activity input data
    const activityData = { ...data };

    const sql =
        'INSERT INTO actividad (id_asignatura,titulo,contenido,fecha_publicacion,fecha_limite,calificacion_maxima) VALUES (?,?,?,?,?,?);';
    const result = {};
    const values = [];
    try {
        result.rows = await db.queryAsync(db.getConnection(), sql, values);
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    return result;
};
