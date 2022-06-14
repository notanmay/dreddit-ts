import CustomError from "./customError";
import {StatusCodes} from 'http-status-codes'


class BadRequestError extends CustomError {
    public message: string;
    constructor(message : string) {
        super(StatusCodes.BAD_REQUEST, message)
        this.message = this.message
    }
}

export default BadRequestError;