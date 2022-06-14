import mongoose, { ObjectId } from "mongoose";
import { PostInterface } from "./postModel";

export interface CommentInterface extends PostInterface{
    postID : ObjectId,
    commentID : object,
}

const CommentSchema = new mongoose.Schema<CommentInterface> ({
    postID : {
        type : mongoose.Types.ObjectId,
        ref: 'Post'
    },
    author : {
        type : mongoose.Types.ObjectId,
        ref : "User"  
    },
    textContent : {
        type : String
    },
    updatedAt : {
        type : Date
    }
}, {timestamps: true})

export const Comment = mongoose.model<CommentInterface>('Comment', CommentSchema);