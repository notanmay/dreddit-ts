import CustomError from "./customError";
import { StatusCodes } from "http-status-codes";

class UnauhtenticatedError extends CustomError {
    public message: string;
    constructor(message : string) {
        super(StatusCodes.UNAUTHORIZED , message)
        this.message = message
    }
}
export default UnauhtenticatedError