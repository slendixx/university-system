const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const course = require('../model/course');

module.exports.getAll = catchAsync(async (req, res, next) => {
    const result = await course.select({
        id: Number(req.params.courseId),
        getCoursesFor: 'user',
        parentId: Number(req.params.userId),
        getActivities: true,
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

module.exports.getById = catchAsync(async (req, res, next) => {
    const activityId = Number(req.params.activityId);
    const result = await course.select({
        id: Number(req.params.courseId),
        getCoursesFor: 'user',
        parentId: Number(req.params.userId),
        getActivities: true,
    });

    if (result.rows.length === 0)
        return next(new AppError(result.message, 404));

    const selectedActivity = result.rows[0].activities.find((activity) => {
        return activity['id actividad'] === activityId;
    });

    if (!selectedActivity)
        return next(new AppError('No activity found for the given id', 404));

    if (selectedActivity)
        res.status(200).json({
            ok: true,
            data: {
                results: selectedActivity,
            },
        });
});

module.exports.create = catchAsync(async (req, res, next) => {
    console.log(req.body);
});

module.exports.update = catchAsync(async (req, res, next) => {
    console.log({ activityId: req.params.activityId });
    console.log(req.body);
});
