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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const getMyDataFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.usersModel.findById(id).select("-password -__v");
    return result;
});
const updateProfileIntoDb = (id, paylaod) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.usersModel.findByIdAndUpdate(id, paylaod, { new: true }).select("-password -__v");
    return result;
});
exports.userServices = {
    getMyDataFromDb,
    updateProfileIntoDb,
};
