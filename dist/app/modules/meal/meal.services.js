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
exports.mealServices = void 0;
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const preferences_model_1 = require("../preferences/preferences.model");
const meal_model_1 = require("./meal.model");
const createMealIntoDb = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.mealsModel.create(Object.assign(Object.assign({}, payload), { createdBy: userId }));
    return result;
});
const updateMealIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isMealExist = yield meal_model_1.mealsModel.findById(id);
    if (!isMealExist) {
        throw new AppErrors_1.default(404, "Meal not found !");
    }
    const result = yield meal_model_1.mealsModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteMealFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isMealExist = yield meal_model_1.mealsModel.findById(id);
    if (!isMealExist) {
        throw new AppErrors_1.default(404, "Meal not found !");
    }
    const result = yield meal_model_1.mealsModel.findByIdAndDelete(id);
    return result;
});
const getAllMealsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (query.availability === "Available") {
        filter.available = true;
    }
    else if (query.availability === "Unavailable") {
        filter.available = false;
    }
    if (query.minPrice && query.maxPrice) {
        filter.price = {
            $gte: Number(query.minPrice),
            $lte: Number(query.maxPrice),
        };
    }
    else if (query.minPrice) {
        filter.price = { $gte: Number(query.minPrice) };
    }
    else if (query.maxPrice) {
        filter.price = { $lte: Number(query.maxPrice) };
    }
    const total = yield meal_model_1.mealsModel.find(filter).estimatedDocumentCount();
    const result = yield meal_model_1.mealsModel.find(filter).skip(skip).limit(limit);
    const totalPage = Math.ceil(result.length / limit);
    return { result, meta: { limit, page, total, totalPage } };
});
const getAllMealsForPreferencesFromDb = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(query === null || query === void 0 ? void 0 : query.page) || 1;
    const limit = Number(query === null || query === void 0 ? void 0 : query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = {};
    if (userId) {
        const userDietary = yield preferences_model_1.dietaryPreferencesModel.findOne({ userId });
        filter.dietary = userDietary === null || userDietary === void 0 ? void 0 : userDietary.dietary;
    }
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
    if (query.availability === "Available") {
        filter.available = true;
    }
    else if (query.availability === "Unavailable") {
        filter.available = false;
    }
    if (query.minPrice && query.maxPrice) {
        filter.price = {
            $gte: Number(query.minPrice),
            $lte: Number(query.maxPrice),
        };
    }
    else if (query.minPrice) {
        filter.price = { $gte: Number(query.minPrice) };
    }
    else if (query.maxPrice) {
        filter.price = { $lte: Number(query.maxPrice) };
    }
    const total = yield meal_model_1.mealsModel.find(filter).estimatedDocumentCount();
    const result = yield meal_model_1.mealsModel.find(filter).skip(skip).limit(limit);
    const totalPage = Math.ceil(result.length / limit);
    return { result, meta: { limit, page, total, totalPage } };
});
const getSingleMealFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.mealsModel.findById(id);
    return result;
});
exports.mealServices = {
    createMealIntoDb,
    updateMealIntoDb,
    deleteMealFromDb,
    getAllMealsFromDb,
    getSingleMealFromDb,
    getAllMealsForPreferencesFromDb,
};
