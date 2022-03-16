const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const career = require('../model/career');
const user = require('../model/user');
const course = require('../model/course');

module.exports.getAll = catchAsync(async (req, res, next) => {
    let result;
    const getCoursesFor = req.body.getCoursesFor;
    const getGrades = req.query.grades !== undefined;

    if (getCoursesFor === 'career')
        result = await career.select({
            id: Number(req.params.careerId),
            getCourses: true,
            filter: null,
            getGrades,
        });

    if (getCoursesFor === 'user')
        result = await user.select({
            id: Number(req.params.userId),
            getCourses: true,
            getGrades,
        });

    if (result.rows.length === 0)
        return next(new AppError(result.message, 404));

    res.status(200).json({
        ok: true,
        data: {
            results: result.rows,
        },
    });
});

const getStudentGrades = catchAsync(async (req, res, next) => {});

module.exports.getById = catchAsync(async (req, res, next) => {
    const courseId = Number(req.params.courseId);
    let result;
    const getCoursesFor = req.body.getCoursesFor;
    if (getCoursesFor === 'career')
        result = await career.select({
            id: Number(req.params.careerId),
            getCourses: true,
            filter: null,
        });

    if (getCoursesFor === 'user')
        result = await user.select({
            id: Number(req.params.userId),
            getCourses: true,
        });

    if (result.rows.length === 0)
        return next(new AppError(result.message, 404));

    const selectedCourse = result.rows[0].courses.find((course) => {
        return course['id asignatura'] === courseId;
    });

    if (!selectedCourse)
        return next(new AppError('No course found for the given id', 404));

    if (selectedCourse)
        res.status(200).json({
            ok: true,
            data: {
                results: selectedCourse,
            },
        });
});
module.exports.add = catchAsync(async (req, res, next) => {
    //TODO check if the request comes from the user resource, otherwise this is semantically incorrect
    const id = Number(req.params.userId);
    const inputData = {
        id,
        courseId: req.body.courseId,
    };
    const result = await course.insertUserCourse(inputData);
    if (!result.ok) return next(new AppError(result.message, 400));

    const status =
        result.message !== undefined
            ? result.message
            : 'user subscribed to course successfully';

    res.status(201).json({
        ok: true,
        data: {
            status,
        },
    });
});

module.exports.delete = catchAsync(async (req, res, next) => {
    const id = Number(req.params.userId);
    const courseId = Number(req.params.courseId);
    const inputData = {
        id,
        courseId,
    };

    const result = await course.deleteUserCourse(inputData);
    if (!result.ok) return next(new AppError(result.message, 400));

    res.status(204).json({
        ok: true,
        data: {
            status: 'user unsubscribed from course successfully',
        },
    });
});
