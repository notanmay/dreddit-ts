"use strict";
exports.__esModule = true;
exports.errorHandlerMiddleware = void 0;
var errorHandlerMiddleware = function (err, req, res, next) {
    console.log('reached error handler middleware');
    var statusCode = err.statusCode || 500;
    var error = err.message;
    if (error.startsWith('Cast') && error.includes("User")) {
        error = 'User with that id not found!';
    }
    else if (error.startsWith('Cast') && error.includes("Post")) {
        error = 'Post with that id not found!';
    }
    else if (error.startsWith('Cast') && error.includes("Comment")) {
        error = 'Comment with that id not found!';
    }
    res.status(statusCode).json({ error: error });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
