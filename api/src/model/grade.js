const db = require('./dbConnection');

module.exports.select = async ({ userId, id }) => {
    //TODO implement a version for a specific id
    const result = {
        ok: false,
    };
    const userCoursesSql =
        'SELECT `id asignatura` AS id_asignatura FROM user_courses WHERE `id usuario` = ?';
    let studentGradesSql = 'SELECT * FROM user_grades WHERE id_asignatura IN ';
    let studentGrades;
    let allStudentActivities;

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
        studentGradesSql += generateSQLFieldPlaceholders(courseIds);

        studentGrades = await db.queryAsync(
            connection,
            studentGradesSql,
            courseIds
        );
        allStudentActivities = await db.queryAsync(
            connection,
            'SELECT id_alumno, apellido, nombre, id_asignatura, asignatura, id_actividad, titulo, calificacion_maxima FROM user_graded_activities WHERE id_asignatura IN ' +
                generateSQLFieldPlaceholders(courseIds),
            courseIds
        );
    } catch (error) {
        result.message = error;
        result.ok = false;
    }

    const nonGradedStudents = await filterNonGradedStudents(
        allStudentActivities,
        studentGrades
    );
    const studentData = [...studentGrades, ...nonGradedStudents];

    result.rows = await formatStudentGradesV2(studentData);

    result.ok = true;
    return result;
};

// GOT IT! This is the solution to nested groupBys:
// source
// https://stackoverflow.com/questions/53929908/nested-array-group-by-with-lodash
/*
const formatStudentGrades = (input) => {
    return input.reduce((result, item) => {
        // get course object for corresponding to current item or insert if not present
        var course = (result[item.id_asignatura] =
            result[item.id_asignatura] || {});

        // Get activity array corresponding to current item from course object (or insert if not present)
        var activ = (course[item.id_actividad] =
            course[item.id_actividad] || []);

        // Add current item to current activities array
        activ.push(item);

        // Return the result object for this iteration
        return result;
    }, {});
};
*/
const filterNonGradedStudents = (
    allStudentActivities,
    gradedStudentActivities
) => {
    return new Promise((resolve, reject) => {
        const resolveValue = allStudentActivities.reduce((result, item) => {
            const found = gradedStudentActivities.find((grade) => {
                return (
                    grade.id_actividad === item.id_actividad &&
                    grade.id_alumno === item.id_alumno
                );
            });
            if (!found) result.push(item);

            return result;
        }, []);
        resolve(resolveValue);
    });
};
const formatStudentGradesV2 = (input) => {
    return new Promise((resolve, reject) => {
        let result = input.reduce((result, item) => {
            // get course object for corresponding to current item or insert if not present
            var course = (result[item.id_asignatura] = result[
                item.id_asignatura
            ] || {
                id_asignatura: item.id_asignatura,
                asignatura: item.asignatura,
            });

            // Get activity array corresponding to current item from course object (or insert if not present)
            var activ = (course[item.id_actividad] =
                course[item.id_actividad] || []);

            // Add current item to current activities array
            activ.push({
                id_actividad: item.id_actividad,
                calificacion_maxima: item.calificacion_maxima,
                id_alumno: item.id_alumno,
                calificacion: item.calificacion,
                titulo: item.titulo,
                apellido: item.apellido,
                nombre: item.nombre,
            });

            // Return the result object for this iteration
            return result;
        }, {});

        //put courses on an array
        const keys = Object.keys(result);
        result = keys.map((key) => {
            return result[key];
        });

        //put activities on arrays
        result.forEach((course) => {
            //get keys that aren't id_asignatura & asignatura
            const activityKeys = Object.keys(course).filter((key) => {
                return key !== 'id_asignatura' && key !== 'id_asignatura';
            });
            //put every key-pair that hasn't one of the aforementioned key in an array
            course.actividades = activityKeys.map((key) => {
                return course[key];
            });
        });

        result = result.map((course) => {
            //the filter method is there because for some reason a value that was simply a String appeared on the activities array
            return {
                id_asignatura: course.id_asignatura,
                asignatura: course.asignatura,
                actividades: course.actividades
                    .filter((activity) => {
                        return typeof activity === 'object';
                    })
                    .map((activity) => {
                        return {
                            id_actividad: activity[0].id_actividad,
                            titulo: activity[0].titulo,
                            calificacion_maxima:
                                activity[0].calificacion_maxima,
                            calificaciones: activity.map((grade) => {
                                return {
                                    id_alumno: grade.id_alumno,
                                    calificacion: grade.calificacion || null,
                                    apellido: grade.apellido,
                                    nombre: grade.nombre,
                                };
                            }),
                        };
                    }),
            };
        });
        resolve(result);
    });
};

const generateSQLFieldPlaceholders = (list) => {
    let result =
        '(' +
        list
            .map(() => {
                return '?,';
            })
            .join('') +
        ')';
    result = result.replace('?,)', '?)');
    return result;
};

module.exports.insert = () => {};

module.exports.update = () => {};
