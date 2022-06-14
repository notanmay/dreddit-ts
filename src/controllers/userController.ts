import {  User } from "../models/userModel";
import  {NextFunction, Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes';
import UnauhtenticatedError from "../errors/unauthenticatedError";
import NotFoundError from "../errors/notFoundError";
import BadRequestError from "../errors/badRequestError";
import { Post } from "../models/postModel";


export const register = async (req:Request, res: Response, next : NextFunction) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            next(new BadRequestError('Please provide email and password'))
    }
        const alreadyUser = await User.findOne({email : req.body.email})
        if(alreadyUser) {
            next (new BadRequestError('User Already Exists'))
        }
        else {
            const user = await User.create({...req.body});
            const token = user.createJWT({email: user.email, pass: user.password});
            res.status(StatusCodes.OK).json({message : user, token : token})
        }
    } catch (error) {
        next(error)       
    }
}

export const login =async (req:Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    if (!email || !password) {
        next(new BadRequestError('Please provide email and password'))
    }
    else {
        try {
            const user = await User.findOne({email : email})
            if (!user) {
                next(new NotFoundError('User Not Found!'))
            }
            else {
                const isMatch = await user!.comparePassword(password)
                if(!isMatch) {
                    next(new UnauhtenticatedError('Invlaid Credentials!'))
                }
                else {
                    const token = await user!.createJWT();
                    res.status(StatusCodes.OK).json({data : user, token : token})
                }
            }
        }
        catch(error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        }
    }
   
}

export const getUserInfo = async function (req: Request, res : Response, next : NextFunction) {
    const userID = req.params.userID;

    if (!userID) {
        next (new BadRequestError('please provide a user id'))
    }
    else {
        const user  = await User.findById(userID)!
        const posts = await Post.find({author : userID})
        // console.log(posts);
        
        
        if (!user) {
            next (new NotFoundError('User Not Found!'))
        }
        else {
            res.status(200).json({user, posts, postsCount : posts.length})
        }
    }
}


