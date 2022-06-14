"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getPost = exports.updatePost = exports.deletePost = exports.createPost = void 0;
var badRequestError_1 = __importDefault(require("../errors/badRequestError"));
var notFoundError_1 = __importDefault(require("../errors/notFoundError"));
var postModel_1 = require("../models/postModel");
var commentModel_1 = require("../models/commentModel");
var createPost = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, textContent, media, author, post, post, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.body, textContent = _a.textContent, media = _a.media;
                    author = req.user._id;
                    if (!textContent) {
                        next(new badRequestError_1["default"]('Please provide text-content for the post!'));
                    }
                    if (!media) return [3 /*break*/, 2];
                    return [4 /*yield*/, postModel_1.Post.create({ textContent: textContent, media: media, author: author })];
                case 1:
                    post = _b.sent();
                    res.status(200).json(post);
                    next();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, postModel_1.Post.create({ textContent: textContent, author: author })];
                case 3:
                    post = _b.sent();
                    res.status(200).json(post);
                    next();
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    next(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.createPost = createPost;
var deletePost = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var postID, author, post, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    postID = req.params.postID;
                    author = req.user._id;
                    return [4 /*yield*/, postModel_1.Post.findOneAndRemove({ _id: postID, author: author })];
                case 1:
                    post = _a.sent();
                    if (!post) {
                        next(new notFoundError_1["default"]('Post not found!'));
                    }
                    else {
                        res.status(200).json(postID);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.deletePost = deletePost;
var updatePost = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var postID, _a, textContent, media, post, post, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    postID = req.params.postID;
                    _a = req.body, textContent = _a.textContent, media = _a.media;
                    if (!textContent) {
                        next(new badRequestError_1["default"]('Please provide text-content to be updated'));
                    }
                    if (!media) return [3 /*break*/, 2];
                    return [4 /*yield*/, postModel_1.Post.findOneAndUpdate({ _id: postID }, { textContent: textContent, media: media }, { "new": true })];
                case 1:
                    post = _b.sent();
                    if (!post) {
                        next(new notFoundError_1["default"]('No post found with that id'));
                    }
                    else {
                        res.status(200).json(post);
                    }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, postModel_1.Post.findOneAndUpdate({ _id: postID }, { textContent: textContent }, { "new": true })];
                case 3:
                    post = _b.sent();
                    if (!post) {
                        next(new notFoundError_1["default"]('No post found with that id'));
                    }
                    else {
                        res.status(200).json(post);
                    }
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_3 = _b.sent();
                    next(error_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.updatePost = updatePost;
var getPost = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var postID, post, comments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postID = req.params.postID;
                    if (!!postID) return [3 /*break*/, 1];
                    next(new badRequestError_1["default"]('please provide post id!'));
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, postModel_1.Post.findById(postID)];
                case 2:
                    post = _a.sent();
                    if (!!post) return [3 /*break*/, 3];
                    next(new notFoundError_1["default"]("post with the id of  ".concat(postID, " not found!")));
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, commentModel_1.Comment.find({ postID: postID })];
                case 4:
                    comments = _a.sent();
                    res.status(200).json({ post: post, comments: comments, commentsCount: comments.length });
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.getPost = getPost;
