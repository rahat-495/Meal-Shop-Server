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
exports.mealPreferenceServices = void 0;
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const mealPreferences_model_1 = require("./mealPreferences.model");
const createMealPreferenceIntoDb = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mealPreferences_model_1.mealPreferencesModel.create(Object.assign(Object.assign({}, payload), { createdBy: userId }));
    return result;
});
const updateMealPreferenceIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mealPreferences_model_1.mealPreferencesModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const getAllMealPreferencesFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(query === null || query === void 0 ? void 0 : query.page) || 1;
    const limit = Number(query === null || query === void 0 ? void 0 : query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = {};
    if (query.searchTerm) {
        filter.$or = [
            { title: { $regex: query.searchTerm, $options: "i" } },
            { description: { $regex: query.searchTerm, $options: "i" } },
            { dietary: { $regex: query.searchTerm, $options: "i" } },
        ];
    }
    if (query.dietary) {
        filter.dietary = query.dietary;
    }
    const total = yield mealPreferences_model_1.mealPreferencesModel.find(filter).estimatedDocumentCount();
    const result = yield mealPreferences_model_1.mealPreferencesModel.find(filter).skip(skip).limit(limit);
    const totalPage = Math.ceil(total / limit);
    return { result, meta: { limit, page, total, totalPage } };
});
const getSingleMealPreferenceFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mealPreferences_model_1.mealPreferencesModel.findById(id);
    if (!result) {
        throw new AppErrors_1.default(404, "Meal preference not found !");
    }
    return result;
});
const deleteMealPreferenceFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isMealPreferenceExist = yield mealPreferences_model_1.mealPreferencesModel.findById(id);
    if (!isMealPreferenceExist) {
        throw new AppErrors_1.default(404, "Meal preference not found !");
    }
    yield mealPreferences_model_1.mealPreferencesModel.findByIdAndDelete(id);
    return {};
});
exports.mealPreferenceServices = {
    createMealPreferenceIntoDb,
    updateMealPreferenceIntoDb,
    deleteMealPreferenceFromDb,
    getAllMealPreferencesFromDb,
    getSingleMealPreferenceFromDb,
};
