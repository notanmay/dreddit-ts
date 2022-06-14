import CustomError from "./customError";
import {StatusCodes} from 'http-status-codes'


class NotFoundError extends CustomError {
    public message: string;
    constructor(message :string) {
        super(StatusCodes.NOT_FOUND, message)
        this.message = message;
    }
}
export default NotFoundError