const db = require('./dbConnection');
const generateSQLFieldPlaceholders = require('../utils/generateSqlFieldPlaceholders');

module.exports.select = async ({ userId, id }) => {
    //TODO implement a version for a specific id
    //TODO refactor the parameter userID into parentId
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

module.exports.insert = async ({ data: newGrades }) => {
    const result = {
        ok: false,
    };
    const connection = db.getConnection();
    //validate input
    if (newGrades.length === 0) {
        result.message = 'No new values were provided';
    }
    //TODO Modify the stored procedure activity_student_exist to give a propper output for gradeValue validation
    const activityStudentExistSql =
        'CALL activity_student_exist(?,?,?,@activityExists,@studentExists); SELECT @activityExists, @studentExists;';

    const validationPromises = newGrades.map((grade) => {
        return db.queryAsync(connection, activityStudentExistSql, [
            grade.activityId,
            grade.userId,
            grade.gradeValue,
        ]);
    });

    let validationResponse;
    try {
        validationResponse = await Promise.all(validationPromises);
    } catch (error) {
        console.log(error);
    }
    const validationIsCorrect = validationResponse.every((check, index) => {
        const [validationResults] = check[1];
        const activityExists = validationResults['@activityExists'] === 1;
        const studentExists = validationResults['@studentExists'] === 1;
        if (!activityExists)
            result.message =
                'No activity found for the id: ' + newGrades[index].activityId;
        if (!studentExists)
            result.message =
                'No student found for the id: ' + newGrades[index].userId;
        return activityExists && studentExists;
    });

    if (!validationIsCorrect) {
        return result;
    }

    //perform insert
    const insertGradesSql =
        'INSERT INTO calificacion_alumno (id_actividad, id_alumno, valor) VALUES ?';
    const values = formatValues(newGrades);
    try {
        result.rows = await db.queryAsync(connection, insertGradesSql, [
            values,
        ]);
        result.ok = true;
    } catch (error) {
        result.message = error;
    }

    return result;
};

const formatValues = (data) => {
    return Object.values(data).map((item) => {
        return [item.activityId, item.userId, item.gradeValue];
    });
};

module.exports.update = async ({ data: updatedGrades }) => {
    const result = {
        ok: false,
    };

    //validate input
    if (updatedGrades.length === 0) {
        result.message = 'No new values were provided';
    }
    const connection = db.getConnection();
    const gradeIsValidSql =
        'CALL gradeIsValid(?,?,?,@gradeExists,@gradeValueIsValid); SELECT @gradeExists, @gradeValueIsValid;';
    const validationPromises = updatedGrades.map((grade) => {
        return db.queryAsync(connection, gradeIsValidSql, [
            grade.activityId,
            grade.userId,
            grade.gradeValue,
        ]);
    });
    let validationResponse;
    try {
        validationResponse = await Promise.all(validationPromises);
    } catch (error) {
        console.log(error);
    }

    const validationIsCorrect = validationResponse.every((check, index) => {
        const [validationResults] = check[1];
        const gradeExists = validationResults['@gradeExists'] === 1;
        const gradeValueIsValid = validationResults['@gradeValueIsValid'] === 1;
        if (!gradeExists)
            result.message =
                'No grade found for the id: ' + updatedGrades[index].activityId;
        if (!gradeValueIsValid)
            result.message =
                'Grade value: ' +
                updatedGrades[index].userId +
                ' is not valid.';
        return gradeExists && gradeValueIsValid;
    });
    if (!validationIsCorrect) return result;

    //perform update
    const updateGradesSql =
        'UPDATE calificacion_alumno SET valor = ? WHERE id_actividad = ? AND id_alumno = ?';

    const updatePromises = updatedGrades.map((grade) => {
        return db.queryAsync(connection, updateGradesSql, [
            grade.gradeValue,
            grade.activityId,
            grade.userId,
        ]);
    });
    try {
        result.rows = await Promise.all(updatePromises);
        result.ok = true;
    } catch (error) {
        result.message = error;
    }

    return result;
};
