import {Request, Response, NextFunction} from 'express';
import BadRequestError from '../errors/badRequestError';
import { Comment } from '../models/commentModel';
import NotFoundError from '../errors/notFoundError';
import { Post } from '../models/postModel';
import { RequestWithUserID } from '../models/userModel';

export const createComment = async function (req: RequestWithUserID, res: Response, next: NextFunction) {
    const postID = req.params.postID;
    
    const author = req.user._id;        

    const {textContent} = req.body;

    if (!postID) {
        next (new BadRequestError('Please provide a post id'))
    }

    if (!textContent) {
        next (new BadRequestError('Please provide text-content to be updated'))
    }
    else {
        const post = await Post.findById(postID)
        if (!post) {
            next(new NotFoundError('No post found with that id'))
        }
        else {
            const comments = await Comment.create({textContent, author : author, postID : postID})
            res.status(200).json(comments)
            next()
        }
    }
}

export const getComment = async function (req: Request, res: Response, next: NextFunction) {
    const postID = req.params.postID
    const commentID = req.params.commentID;
    console.log(commentID);
    

    if (!postID) {
        next (new BadRequestError('Please provide post id'))
    }

    const comment = await Comment.findById(commentID)

    if (!comment) {
        next (new NotFoundError('Comment not found!'))
    }
    else {
        res.status(200).json(comment)
    }
}

export const delteComment = async function (req: Request, res: Response, next: NextFunction) {
    const postID = req.params.postID;
    const commentID = req.params.commentID;

    if (!postID) {
        next (new BadRequestError('Please provide post id'))
    }

    const post = await Post.findById(postID)

    if (!post) {
        next (new NotFoundError(`Post with the id of ${postID} not found!`))
    }

    const comment = await Comment.findOneAndRemove({_id : commentID})

    if (!comment) {
        next (new NotFoundError('Comment not found!'))
    }
    else {
        res.status(200).json(commentID)

    }

}