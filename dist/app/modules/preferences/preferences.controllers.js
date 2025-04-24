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
exports.dietaryPreferenceControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const preferences_services_1 = require("./preferences.services");
const getAllDietaryPreferences = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield preferences_services_1.dietaryPreferenceServices.getAllDietaryPreferencesFromDb();
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Dietary preference created success full !" });
    }
}));
const getMyDietaryPreferences = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield preferences_services_1.dietaryPreferenceServices.getMyDietaryPreferencesFromDb(req.user.userId);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Dietary preference are retrived success full !" });
    }
}));
const createMyDietaryPreference = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield preferences_services_1.dietaryPreferenceServices.createDietaryPreferenceIntoDb(req.user.userId, req.body);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Dietary preference created success full !" });
    }
}));
const updateMyDietaryPreference = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield preferences_services_1.dietaryPreferenceServices.updateDietaryPreferenceIntoDb(req.user.userId, req.body);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Dietary preference updated success full !" });
    }
}));
exports.dietaryPreferenceControllers = {
    getMyDietaryPreferences,
    getAllDietaryPreferences,
    createMyDietaryPreference,
    updateMyDietaryPreference,
};
