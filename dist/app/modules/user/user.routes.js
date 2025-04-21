"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_constants_1 = require("./user.constants");
const user_controllers_1 = require("./user.controllers");
const router = (0, express_1.Router)();
router.get("/get-my-data", (0, auth_1.default)(user_constants_1.userRole.user, user_constants_1.userRole.admin), user_controllers_1.userControllers.getMyData);
exports.userRoutes = router;
