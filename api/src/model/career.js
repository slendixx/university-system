const db = require('./dbConnection');
const course = require('./course');

module.exports.select = async ({ id, getCourses, filter }) => {
    let sql = 'SELECT * FROM career_full';
    if (id) sql += ' WHERE id = ?';
    const values = [];
    if (id) values.push(id);
    if (filter === 'topCareers') sql += ' LIMIT 3;';
    if (filter === 'remote')
        sql += ' WHERE `modalidad de cursado` LIKE "a distancia"';

    const result = {};
    try {
        result.rows = await db.queryAsync(db.getConnection(), sql, values);
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    if (!getCourses) return result;

    //if we are getting the courses from a career, a careerId will always be provided

    const courses = await course.select({
        id: null,
        getCoursesFor: 'career',
        parentId: id,
    });
    result.rows[0].courses = courses.rows;

    return result;
    /*
    // THIS CODE SEPPARATES THE COURSES FOR EACH CAREER USED FOR
    // GETTING ALL CAREERS WITH THEIR RESPECTIVE COURSES AT ONCE.
    // IT SHOULD REPLACE WHAT IS RIGHT ABOVE THIS.

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
*/
};
