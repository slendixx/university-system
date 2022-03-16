const db = require('./dbConnection');
const groupBy = require('../utils/groupBy');

module.exports.select = async ({ userId, id, getGrades }) => {
    const result = {
        ok: false,
    };
    const userCoursesSql =
        'SELECT `id asignatura` AS id_asignatura FROM user_courses WHERE `id usuario` = ?';
    let studentGradesSql = 'SELECT * FROM user_grades WHERE id_asignatura IN ';
    let studentGrades;

    const connection = db.getConnection();
    try {
        const userCourses = await db.queryAsync(
            connection,
            userCoursesSql,
            userId
        );
        const courseIds = userCourses.map((course) => {
            return course.id_asignatura;
        });
        //format sql query
        studentGradesSql += `(${courseIds
            .map(() => {
                return '?,';
            })
            .join('')})`;
        studentGradesSql = studentGradesSql.replace('?,)', '?)');

        studentGrades = await db.queryAsync(
            connection,
            studentGradesSql,
            courseIds
        );
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    result.rows = await formatStudentGradesData(studentGrades);

    /*
    desired response format
    [
        {
            asignatura,
            id_asignatura,
            actividades: [
                {
                    id_actividad,
                    titulo,
                    calificacion_maxima,
                    calificaciones: [
                        {
                            id_alumno,
                            calificacion,
                        },
                        ...
                    ]
                }, 
                ...
            ]
         },
         ...
    ]
     
     */

    result.ok = true;
    return result;
};

function formatStudentGradesData(data) {
    return new Promise((resolve, reject) => {
        const dataByCourse = groupBy(data, 'id_asignatura');

        const result = dataByCourse.map((courses) => {
            const dataByActivity = groupBy(courses, 'id_actividad');
            return {
                id_asignatura: courses[0].id_asignatura,
                asignatura: courses[0].asignatura,
                actividades: courses.map((course) => {
                    return {
                        id_actividad: course.id_actividad,
                        titulo: course.titulo,
                        calificacion_maxima: course.calificacion_maxima,
                        calificaciones: dataByActivity
                            .flat()
                            .filter((grade) => {
                                return (
                                    grade.id_actividad === course.id_actividad
                                );
                            })
                            .map((grade) => {
                                return {
                                    id_alumno: grade.id_alumno,
                                    calificacion: grade.calificacion,
                                };
                            }),
                    };
                }),
            };
        });
        resolve(result);
    });
}
