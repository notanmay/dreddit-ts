import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/badRequestError";
import NotFoundError from "../errors/notFoundError";
import { RequestWithUserID } from "../models/userModel";
import { Post } from "../models/postModel";
import { Comment } from "../models/commentModel";
import { PostInterface } from "../models/postModel";

export const createPost = async function (req: RequestWithUserID, res: Response, next: NextFunction) {
    try {
        const {textContent, media} = req.body;
        const author = req.user._id;        
        if (!textContent) {
            next (new BadRequestError('Please provide text-content for the post!'))
        }
        if (media) {
            const post = await Post.create({textContent, media, author: author})

            res.status(200).json(post)
            next()
        }
        else {
            const post = await Post.create({textContent, author : author})
            res.status(200).json(post)
            next()
        }
    } catch (error) {
        next(error)
    }   
}

export const deletePost = async function (req: RequestWithUserID, res : Response , next : NextFunction) {
    try {
        const postID = req.params.postID;
        const author = req.user._id
        const post = await Post.findOneAndRemove({_id : postID, author: author})

        if (!post) {
            next (new NotFoundError('Post not found!'))
        }
        else {
            res.status(200).json(postID)
        }
    } catch (error) {
        next(error)
    }
}

export const updatePost = async function(req:RequestWithUserID, res: Response, next : NextFunction) {
    try {
    const postID = req.params.postID;
    
    const {textContent, media} = req.body
    if (!textContent) {
        next (new BadRequestError('Please provide text-content to be updated'))
    }
    if (media) {
        const post = await Post.findOneAndUpdate({_id : postID}, {textContent, media}, {new : true})
        if (!post) {
            next(new NotFoundError('No post found with that id'))
        }
        else {
            res.status(200).json(post)
        }
    }
    else {
        const post = await Post.findOneAndUpdate({_id : postID}, {textContent}, {new : true})
        if (!post) {
            next(new NotFoundError('No post found with that id'))
        }
        else {
            res.status(200).json(post)
        }
    }
    // const author = req.user._id    
    } catch (error) {
        next(error)
    }
    
}

export const getPost = async function (req: Request, res: Response, next : NextFunction) {
    const postID = req.params.postID;
    
    if (!postID) {
        next (new BadRequestError('please provide post id!'))
    }
    else {
        const post = await Post.findById(postID)
        if (!post) {
            next (new NotFoundError(`post with the id of  ${postID} not found!`))
        }
        else {
            const comments = await Comment.find({postID : postID})
            res.status(200).json({post, comments, commentsCount : comments.length})
        }
    }
}

