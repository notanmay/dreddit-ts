import mongoose, { ObjectId } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv'
dotenv.config()
import {Request} from 'express';

interface UserInterface {
    name: string,
    userID : ObjectId,
    email : string,
    _id : ObjectId,
    password: string,
    posts : [ObjectId],
    comparePassword: Function,
    createJWT : Function,
    verifyJWT : Function
}

export interface RequestWithUserID extends Request  {
    user : UserInterface,

}

const UserSchema = new mongoose.Schema<UserInterface> ({
    name : {
        type: String,
        required : [true, 'Name is a required field!'],
        minlength : 5,
        maxlength : 50,
    },
    email : {
        type: String,
        required :[true, 'Email is a required field!'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'],
        unique: true
    },
    password: {
        type: String,
        required : [true, 'Password is a required field!'],
        minlength: [5, 'Minimum 5 characters are required in a password'],
        maxlength : [20, 'Maximum 20 characters are required in a password'],
        match : [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Please provide a password that contains 8 characters minimum, 1 special character, 1 Uppercase letter and a Lowercase letter']
    },
    posts : [{
        type : mongoose.Types.ObjectId,
        ref : 'Post'
    }]
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (this: UserInterface, candidatePassword:string) {
    const isCorrectPassword =  await bcrypt.compare(candidatePassword , this.password)
    return isCorrectPassword;
}

UserSchema.methods.createJWT = function () {
    const token = jwt.sign({userID: this._id, name: this.name}, process.env.JWT_SECRET!, {expiresIn : 300000})
    return token;
    
}


export const User = mongoose.model<UserInterface>('User', UserSchema)



