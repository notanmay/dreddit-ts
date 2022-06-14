"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Post = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var PostSchema = new mongoose_1["default"].Schema({
    author: {
        type: mongoose_1["default"].Types.ObjectId,
        ref: "User"
    },
    textContent: {
        type: String
    },
    media: {
        type: String
    },
    updatedAt: {
        type: Date
    }
}, { timestamps: true });
exports.Post = mongoose_1["default"].model('Post', PostSchema);
