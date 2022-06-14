"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
var postController_1 = require("../controllers/postController");
var commentController_1 = require("../controllers/commentController");
router.post('/', postController_1.createPost);
router["delete"]('/:postID', postController_1.deletePost);
router.patch('/:postID', postController_1.updatePost);
router.get('/:postID', postController_1.getPost);
router.post('/:postID/comments', commentController_1.createComment);
router.get('/:postID/comments/:commentID', commentController_1.getComment);
router["delete"]('/:postID/comments/:commentID', commentController_1.delteComment);
exports["default"] = router;
