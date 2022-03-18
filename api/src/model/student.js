const db = require('./dbConnection');

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
    result.rows = await formatStudentGradesDataV2(studentGrades);
    //TODO look into how to implement the experimental groupBy method
    //https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
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
    console.log(result.rows);
    result.ok = true;
    return result;
};

function formatStudentGradesData(data) {
    return new Promise((resolve, reject) => {
        const dataByCourse = groupBy(data, 'id_asignatura');

        const result = dataByCourse.map((courses) => {
            const dataByActivity = groupBy(courses, 'id_actividad');
            console.log(dataByActivity);
            return {
                id_asignatura: courses[0].id_asignatura,
                asignatura: courses[0].asignatura,
                actividades: courses.map((course) => {
                    /*
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
                    */ return {
                        id_actividad: course.id_actividad,
                        titulo: course.titulo,
                        calificacion_maxima: course.calificacion_maxima,
                        calificaciones: dataByActivity
                            .flat()
                            .filter((grade) => {
                                return (
                                    grade.id_actividad === course.id_actividad
                                );
                            }),
                    };
                }),
            };
        });
        resolve(result);
    });
}

function formatStudentGradesDataV2(data) {
    return new Promise((resolve, reject) => {
        let result = groupByAndMap(
            data,
            (gradeData) => gradeData.id_asignatura
        );
        result = result
            .forEach((gradeData) => {
                return;
            })
            /*
        const resultKeys = Object.keys(byCourse);
        const result = resultKeys.map((key) => {
            return byCourse[key];
        });
        */
            .resolve(result);
    });
}

/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
//export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
//    const map = new Map<K, Array<V>>();
function groupByAndMap(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}
var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
// GOT IT! This is the solution to nested groupBys:
// source
// https://stackoverflow.com/questions/53929908/nested-array-group-by-with-lodash
const formatCourseGrades = (input) => {
    return input.reduce((result, item) => {
        // get course object for corresponding to current item or insert if not present
        var course = (result[item.idAsig] = result[item.idAsig] || {});

        // Get activity array corresponding to current item from course object (or insert if not present)
        var activ = (course[item.idAct] = course[item.idAct] || []);

        // Add current item to current activities array
        activ.push(item);

        // Return the result object for this iteration
        return result;
    }, {});
};
