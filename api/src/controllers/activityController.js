const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const course = require('../model/course');
const activity = require('../model/activity');

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
    const courseId = req.params.courseId;
    const activityData = {
        title: req.body.title,
        paragraphs: req.body.paragraphs,
        maxGrade: req.body.maxGrade,
        limitDate: req.body.limitDate,
    };
    const result = await activity.insert({
        parentId: courseId,
        data: activityData,
    });
    if (!result.ok) return next(new AppError(result.message, 400));

    res.status(200).json({
        ok: true,
        data: {
            status: result.message,
        },
    });
});

module.exports.update = catchAsync(async (req, res, next) => {
    const { courseId, activityId } = req.params;
    const activityData = {
        title: req.body.title,
        paragraphs: req.body.paragraphs,
        maxGrade: req.body.maxGrade,
        limitDate: req.body.limitDate,
    };
    const result = await activity.update({
        parentId: courseId,
        data: activityData,
        id: activityId,
    });
    if (result.rows.length === 0) {
        return next(new AppError(result.message, 404));
    }

    if (!result.ok)
        return next(new AppError('No activity found for the given id', 400));

    res.status(200).json({
        ok: true,
        data: {
            status: result.message,
        },
    });
});
module.exports.delete = catchAsync(async (req, res, next) => {
    const { courseId, activityId } = req.params;
    const result = await activity.delete({
        parentId: courseId,
        id: activityId,
    });

    if (!result.ok) return next(new AppError(error.message, 500));

    res.status(200).json({
        ok: true,
        data: {
            status: 'Activity deleted successfully',
        },
    });
});
