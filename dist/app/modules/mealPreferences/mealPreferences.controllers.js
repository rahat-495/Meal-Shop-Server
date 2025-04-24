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
exports.mealPreferenceControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const mealPreferences_services_1 = require("./mealPreferences.services");
const getAllMealPreferences = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mealPreferences_services_1.mealPreferenceServices.getAllMealPreferencesFromDb(req.query);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Meal preferences are retrived success full !" });
    }
}));
const getSingleMealPreference = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mealPreferences_services_1.mealPreferenceServices.getSingleMealPreferenceFromDb(req.params.id);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Meal preference are retrived success full !" });
    }
}));
const createMealPreference = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mealPreferences_services_1.mealPreferenceServices.createMealPreferenceIntoDb(req.user.userId, req.body);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Meal preference created success full !" });
    }
}));
const updateMealPreference = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mealPreferences_services_1.mealPreferenceServices.updateMealPreferenceIntoDb(req.params.id, req.body);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Meal preference updated success full !" });
    }
}));
const deleteMealPreference = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mealPreferences_services_1.mealPreferenceServices.deleteMealPreferenceFromDb(req.params.id);
    if (result) {
        (0, sendResponse_1.default)(res, { data: result, statusCode: 200, success: true, message: "Meal preference deleted success full !" });
    }
}));
exports.mealPreferenceControllers = {
    createMealPreference,
    updateMealPreference,
    deleteMealPreference,
    getAllMealPreferences,
    getSingleMealPreference,
};
