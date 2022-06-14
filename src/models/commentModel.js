"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Comment = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var CommentSchema = new mongoose_1["default"].Schema({
    postID: {
        type: mongoose_1["default"].Types.ObjectId,
        ref: 'Post'
    },
    author: {
        type: mongoose_1["default"].Types.ObjectId,
        ref: "User"
    },
    textContent: {
        type: String
    },
    updatedAt: {
        type: Date
    }
}, { timestamps: true });
exports.Comment = mongoose_1["default"].model('Comment', CommentSchema);
