"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getUserInfo = exports.login = exports.register = void 0;
var userModel_1 = require("../models/userModel");
var http_status_codes_1 = require("http-status-codes");
var unauthenticatedError_1 = __importDefault(require("../errors/unauthenticatedError"));
var notFoundError_1 = __importDefault(require("../errors/notFoundError"));
var badRequestError_1 = __importDefault(require("../errors/badRequestError"));
var postModel_1 = require("../models/postModel");
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, alreadyUser, user, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    next(new badRequestError_1["default"]('Please provide email and password'));
                }
                return [4 /*yield*/, userModel_1.User.findOne({ email: req.body.email })];
            case 1:
                alreadyUser = _b.sent();
                if (!alreadyUser) return [3 /*break*/, 2];
                next(new badRequestError_1["default"]('User Already Exists'));
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, userModel_1.User.create(__assign({}, req.body))];
            case 3:
                user = _b.sent();
                token = user.createJWT({ email: user.email, pass: user.password });
                res.status(http_status_codes_1.StatusCodes.OK).json({ message: user, token: token });
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!(!email || !password)) return [3 /*break*/, 1];
                next(new badRequestError_1["default"]('Please provide email and password'));
                return [3 /*break*/, 9];
            case 1:
                _b.trys.push([1, 8, , 9]);
                return [4 /*yield*/, userModel_1.User.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 3];
                next(new notFoundError_1["default"]('User Not Found!'));
                return [3 /*break*/, 7];
            case 3: return [4 /*yield*/, user.comparePassword(password)];
            case 4:
                isMatch = _b.sent();
                if (!!isMatch) return [3 /*break*/, 5];
                next(new unauthenticatedError_1["default"]('Invlaid Credentials!'));
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, user.createJWT()];
            case 6:
                token = _b.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({ data: user, token: token });
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_2 = _b.sent();
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error_2);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var getUserInfo = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userID, user, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userID = req.params.userID;
                    if (!!userID) return [3 /*break*/, 1];
                    next(new badRequestError_1["default"]('please provide a user id'));
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, userModel_1.User.findById(userID)];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, postModel_1.Post.find({ author: userID })
                        // console.log(posts);
                    ];
                case 3:
                    posts = _a.sent();
                    // console.log(posts);
                    if (!user) {
                        next(new notFoundError_1["default"]('User Not Found!'));
                    }
                    else {
                        res.status(200).json({ user: user, posts: posts, postsCount: posts.length });
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getUserInfo = getUserInfo;
