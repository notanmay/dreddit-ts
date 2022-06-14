import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import BadRequestError from '../errors/badRequestError';
import { User } from "../models/userModel";
import UnauhtenticatedError from '../errors/unauthenticatedError';
import * as dotenv from 'dotenv';
dotenv.config()
import { RequestWithUserID } from '../models/userModel';

export const authMiddleware = async function (req: RequestWithUserID, res: Response, next: NextFunction) {
    const authorizationHeader =  req.headers.authorization;

    if(authorizationHeader && authorizationHeader.startsWith('Bearer')) {
        const token =  authorizationHeader!.split(' ')[1]
        try {
            const payload : any =  jwt.verify(token, process.env.JWT_SECRET!)
            const userID = await payload.userID        
            const user = await User.findById(userID)
            if (user) {
                req.user = user
                next()
            }
            else {
                next(new UnauhtenticatedError('Invalid Request!'))
            }
        } catch (error) {
            next(new UnauhtenticatedError('Invalid Request!'))
        }
    }
    else {
        next (new BadRequestError('Token not Found!'))
    }   
}
