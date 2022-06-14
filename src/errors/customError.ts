class CustomError extends Error{
    public statusCode : number; 
    public message : string;
    // public name : string;
    constructor(statusCode: number, message: string) {
        super()
        this.statusCode = statusCode;
        this.message = message;
        // this.name = name
    }
}

export default CustomError;