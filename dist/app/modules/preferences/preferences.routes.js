"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferenceRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const preferences_controllers_1 = require("./preferences.controllers");
const preferences_validations_1 = require("./preferences.validations");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(user_constants_1.userRole.admin), preferences_controllers_1.dietaryPreferenceControllers.getAllDietaryPreferences);
router.get("/my-dietary-preferences", (0, auth_1.default)(user_constants_1.userRole.admin, user_constants_1.userRole.user), preferences_controllers_1.dietaryPreferenceControllers.getMyDietaryPreferences);
router.post("/create-dietary-preference", (0, auth_1.default)(user_constants_1.userRole.user), (0, validateRequest_1.default)(preferences_validations_1.dietaryPreferenceValidations.dietaryPreferenceValidationSchema), preferences_controllers_1.dietaryPreferenceControllers.createMyDietaryPreference);
router.patch("/update-dietary-preference", (0, auth_1.default)(user_constants_1.userRole.user), (0, validateRequest_1.default)(preferences_validations_1.dietaryPreferenceValidations.dietaryPreferenceValidationSchema), preferences_controllers_1.dietaryPreferenceControllers.updateMyDietaryPreference);
exports.preferenceRoutes = router;
