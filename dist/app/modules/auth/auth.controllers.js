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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_services_1 = require("./auth.services");
const config_1 = __importDefault(require("../../config"));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.loginUser(req.body);
    res.cookie("refreshToken", result.refreshToken, { secure: config_1.default.nodeEnv === "production", httpOnly: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 365 });
    if (result) {
        (0, sendResponse_1.default)(res, { data: { accessToken: result === null || result === void 0 ? void 0 : result.accessToken }, statusCode: 200, success: true, message: "User login success full !" });
    }
}));
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.authServices.createUserIntoDb(req.body);
    res.cookie("refreshToken", result.refreshToken, { secure: config_1.default.nodeEnv === "production", httpOnly: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 365 });
    if (result) {
        (0, sendResponse_1.default)(res, { data: { accessToken: result === null || result === void 0 ? void 0 : result.accessToken }, statusCode: 200, success: true, message: "User register success full !" });
    }
}));
exports.authControllers = {
    loginUser,
    registerUser,
};
