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
exports.authServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAlreadyExist = yield user_model_1.usersModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email, phoneNumber: payload === null || payload === void 0 ? void 0 : payload.phoneNumber });
    if (isUserAlreadyExist) {
        throw new AppErrors_1.default(400, "User already exist !");
    }
    const result = yield user_model_1.usersModel.create(payload);
    if (!result) {
        throw new AppErrors_1.default(400, "User creation failed !");
    }
    const jwtPayload = { email: result === null || result === void 0 ? void 0 : result.email, role: result === null || result === void 0 ? void 0 : result.role, userId: result === null || result === void 0 ? void 0 : result._id, phoneNumber: result === null || result === void 0 ? void 0 : result.phoneNumber };
    const accessToken = yield jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwtAccessSecret, { expiresIn: "1d" });
    const refreshToken = yield jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwtRefreshSecret, { expiresIn: "365d" });
    return { accessToken, refreshToken };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.usersModel.findOne({ $or: [{ email: payload === null || payload === void 0 ? void 0 : payload.loginCredentials }, { phoneNumber: payload === null || payload === void 0 ? void 0 : payload.loginCredentials }] }).select("+password");
    if (!isUserExist) {
        throw new AppErrors_1.default(http_status_codes_1.default.NOT_FOUND, "User not found !");
    }
    if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isblocked) {
        throw new AppErrors_1.default(http_status_codes_1.default.FORBIDDEN, "User is blocked !");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new AppErrors_1.default(http_status_codes_1.default.UNAUTHORIZED, "Password did not match !");
    }
    const jwtPayload = { email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email, role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role, userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id, phoneNumber: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.phoneNumber };
    const accessToken = yield jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwtAccessSecret, { expiresIn: "1d" });
    const refreshToken = yield jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwtRefreshSecret, { expiresIn: "365d" });
    return { accessToken, refreshToken };
});
exports.authServices = {
    loginUser,
    createUserIntoDb,
};
