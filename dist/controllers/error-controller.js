"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.globalErrorMiddleware = void 0;
const CustomError_1 = require("../features/CustomError");
const notFound = function (req, res, next) {
    return next(new CustomError_1.CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
};
exports.notFound = notFound;
const handleCastErrorDB = function (err) {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new CustomError_1.CustomError(message, 400);
};
const handleDuplicateFieldsDB = function (err) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new CustomError_1.CustomError(message, 400);
};
const handleValidationErrorDB = function (err) {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new CustomError_1.CustomError(message, 400);
};
const sendError = function (err, res) {
    const { status = "fail", statusCode = 500, message, stack } = err;
    res.status(statusCode).send({
        status,
        message,
        stack,
    });
};
const globalErrorMiddleware = function (err, req, res, next) {
    let error = Object.assign({}, err);
    let isChangedError = false;
    if (err.name === "CastError") {
        isChangedError = true;
        error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
        isChangedError = true;
        error = handleDuplicateFieldsDB(error);
    }
    if (err.name === "ValidationError") {
        isChangedError = true;
        error = handleValidationErrorDB(error);
    }
    sendError(isChangedError ? error : err, res);
};
exports.globalErrorMiddleware = globalErrorMiddleware;
//# sourceMappingURL=error-controller.js.map