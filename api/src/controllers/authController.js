const jwt = require('jsonwebtoken');
const AppError = require('../errors/appError');
const catchAsync = require('../errors/catchAsync');
const user = require('../model/user');

module.exports.signJwt = (req, res, next) => {
    const token = jwt.sign({ id: req.user.id });
};
