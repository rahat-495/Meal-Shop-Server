"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const auth_utils_1 = require("./auth.utils");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_validations_1 = require("../user/user.validations");
const router = (0, express_1.Router)();
router.post("/login", (0, validateRequest_1.default)(user_validations_1.userValidations.loginUserValidationSchema), auth_controllers_1.authControllers.loginUser);
router.post("/register", sendImageToCloudinary_1.upload.single("file"), auth_utils_1.parseTextDataToJsonData, (0, validateRequest_1.default)(user_validations_1.userValidations.registerUserValidationSchema), auth_controllers_1.authControllers.registerUser);
exports.authRoutes = router;
