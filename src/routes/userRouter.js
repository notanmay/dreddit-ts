"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
var userController_1 = require("../controllers/userController");
router.post('/register', userController_1.register);
router.post('/login', userController_1.login);
router.get('/:userID', userController_1.getUserInfo);
exports["default"] = router;
