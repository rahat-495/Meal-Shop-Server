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
exports.dietaryPreferenceServices = void 0;
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const preferences_model_1 = require("./preferences.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createDietaryPreferenceIntoDb = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAlreadyHaveDietaryPreference = yield preferences_model_1.dietaryPreferencesModel.findOne({ userId });
    if (isUserAlreadyHaveDietaryPreference) {
        throw new AppErrors_1.default(http_status_codes_1.default.BAD_REQUEST, "User already have dietary preference !");
    }
    const result = yield preferences_model_1.dietaryPreferencesModel.create(Object.assign(Object.assign({}, payload), { userId }));
    return result;
});
const updateDietaryPreferenceIntoDb = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAlreadyHaveDietaryPreference = yield preferences_model_1.dietaryPreferencesModel.findOne({ userId });
    if (!isUserAlreadyHaveDietaryPreference) {
        throw new AppErrors_1.default(http_status_codes_1.default.NOT_FOUND, "User have not any dietary preference !");
    }
    const result = yield preferences_model_1.dietaryPreferencesModel.findOneAndUpdate({ userId }, Object.assign({}, payload), { new: true });
    return result;
});
exports.dietaryPreferenceServices = {
    createDietaryPreferenceIntoDb,
    updateDietaryPreferenceIntoDb,
};
