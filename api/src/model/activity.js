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
    //TODO validate activity input data and put it on the values array
    const activityData = { ...data };
    const result = {
        ok: false,
    };
    //validate user data
    if (!activityData.title) {
        result.message = 'No activity title was provided';
        return result;
    }
    if (!activityData.paragraphs) {
        result.message = 'No paragraphs were provided';
        return result;
    }
    if (activityData.paragraphs.length === 0) {
        result.message = 'No paragraphs were provided';
    }
    //TODO finish data validation
    const sql =
        'INSERT INTO actividad (id_asignatura,titulo,contenido,fecha_publicacion,fecha_limite,calificacion_maxima) VALUES (?,?,?,?,?,?);';
    const values = [];
    try {
        result.rows = await db.queryAsync(db.getConnection(), sql, values);
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    return result;
};

module.exports.update = async ({ parentId, data, id }) => {
    //TODO validate activity input data and put it on the values array
    const activityData = { ...data };
    const sql =
        'UPDATE actividad SET id_asignatura = ?, titulo = ?, contenido = ?, fecha_publicacion = ?, fecha_limite = ?, calificacion_maxima = ?';
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
