const db = require('./dbConnection');
const mysqlDates = require('../utils/mysqlDates');

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
    const activityData = { ...data };
    const result = {
        ok: false,
    };
    //refactor user validation to avoid repetition on the insert and update methods
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
        return result;
    }
    if (!activityData.maxGrade && activityData.maxGrade !== null) {
        result.message = 'No max grade was provided';
        return result;
    }
    if (!activityData.limitDate && activityData.limitDate !== null) {
        result.message = 'No limit date was provided';
        return result;
    }
    if (activityData.limitDate !== null && !activityData.limitDate.limitDay) {
        result.message = 'No limit date day was provided';
        return result;
    }
    if (activityData.limitDate !== null && !activityData.limitDate.limitMonth) {
        result.message = 'No limit date month was provided';
        return result;
    }
    if (activityData.limitDate !== null && !activityData.limitDate.limitYear) {
        result.message = 'No limit date year was provided';
        return result;
    }
    if (
        activityData.limitDate !== null &&
        !activityData.limitDate.limitHours &&
        activityData.limitDate.limitMinutes !== 0
    ) {
        result.message = 'No limit date hours were provided';
        return result;
    }
    if (
        activityData.limitDate !== null &&
        !activityData.limitDate.limitMinutes &&
        activityData.limitDate.limitMinutes !== 0
    ) {
        result.message = 'No limit date minutes were provided';
        return result;
    }

    //complete data
    activityData.creationDate = mysqlDates.generateDatetime(new Date());
    if (activityData.limitDate !== null) {
        const { limitDay, limitMonth, limitYear, limitHours, limitMinutes } =
            activityData.limitDate;
        activityData.limitDate = mysqlDates.generateDatetime(
            new Date(limitDay, limitMonth, limitYear, limitHours, limitMinutes)
        );
    }
    activityData.paragraphs = activityData.paragraphs.join('{br}');
    const sql =
        'INSERT INTO actividad (id_asignatura,titulo,contenido,fecha_publicacion,fecha_limite,calificacion_maxima) VALUES (?,?,?,?,?,?);';
    const values = [
        parentId,
        activityData.title,
        activityData.paragraphs,
        activityData.creationDate,
        activityData.limitDate,
        activityData.maxGrade,
    ];
    try {
        result.rows = await db.queryAsync(db.getConnection(), sql, values);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    return result;
};

module.exports.update = async ({ parentId, data, id }) => {
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
        return result;
    }
    if (!activityData.maxGrade && activityData.maxGrade !== null) {
        result.message = 'No max grade was provided';
        return result;
    }
    if (!activityData.limitDate && activityData.limitDate !== null) {
        result.message = 'No limit date was provided';
        return result;
    }
    if (activityData.limitDate !== null && !activityData.limitDate.limitDay) {
        result.message = 'No limit date day was provided';
        return result;
    }
    if (activityData.limitDate !== null && !activityData.limitDate.limitMonth) {
        result.message = 'No limit date month was provided';
        return result;
    }
    if (activityData.limitDate !== null && !activityData.limitDate.limitYear) {
        result.message = 'No limit date year was provided';
        return result;
    }
    if (
        activityData.limitDate !== null &&
        !activityData.limitDate.limitHours &&
        activityData.limitDate.limitHours !== 0
    ) {
        result.message = 'No limit date hours were provided';
        return result;
    }
    if (
        activityData.limitDate !== null &&
        !activityData.limitDate.limitMinutes &&
        activityData.limitDate.limitMinutes !== 0
    ) {
        result.message = 'No limit date minutes were provided';
        return result;
    }

    //complete data
    activityData.creationDate = mysqlDates.generateDatetime(new Date());
    if (activityData.limitDate !== null) {
        const { limitDay, limitMonth, limitYear, limitHours, limitMinutes } =
            activityData.limitDate;
        activityData.limitDate = mysqlDates.generateDatetime(
            new Date(limitDay, limitMonth, limitYear, limitHours, limitMinutes)
        );
    }
    activityData.paragraphs = activityData.paragraphs.join('{br}');
    const sql =
        'UPDATE actividad SET id_asignatura = ?, titulo = ?, contenido = ?, fecha_publicacion = ?, fecha_limite = ?, calificacion_maxima = ? WHERE id = ?';
    const values = [
        parentId,
        activityData.title,
        activityData.paragraphs,
        activityData.creationDate,
        activityData.limitDate,
        activityData.maxGrade,
        id,
    ];
    try {
        result.rows = await db.queryAsync(db.getConnection(), sql, values);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    return result;
};

module.exports.delete = async ({ id }) => {
    const sql = 'DELETE FROM actividad WHERE id = ?';
    const result = {
        ok: false,
    };


    try {
        result.rows = await db.queryAsync(db.getConnection(), sql, id);
        result.ok = true;
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    return result;
};
