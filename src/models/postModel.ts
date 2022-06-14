import mongoose, { Date, ObjectId } from "mongoose";

export interface PostInterface {
    textContent: string,
    media : string,
    author : ObjectId,
    createdAt : object,
    updatedAt : object
}

const PostSchema = new mongoose.Schema<PostInterface>({
    author : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    textContent : {
        type : String
    },
    media : {
        type : String
    },
    updatedAt : {
        type : Date
    }
}, {timestamps: true})

export const Post = mongoose.model<PostInterface>('Post', PostSchema)
