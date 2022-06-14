import CustomError from "../errors/customError";
import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = function (err: CustomError, req: Request , res: Response,  next: NextFunction) {
    console.log('reached error handler middleware');
    
    const statusCode = err.statusCode || 500;
    let error = err.message;
    if (error.startsWith('Cast') && error.includes("User")) {
        error = 'User with that id not found!'
    }
    else if (error.startsWith('Cast') && error.includes("Post")) {
        error = 'Post with that id not found!'
    }
    else if (error.startsWith('Cast') && error.includes("Comment")) {
        error = 'Comment with that id not found!'
    }
    
    res.status(statusCode).json({error})
}