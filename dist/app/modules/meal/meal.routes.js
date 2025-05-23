"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const meal_controllers_1 = require("./meal.controllers");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const meal_validations_1 = require("./meal.validations");
const router = (0, express_1.Router)();
router.get("/", meal_controllers_1.mealControllers.getAllMeals);
router.get("/my-preferences-meals", (0, auth_1.default)(user_constants_1.userRole.user, user_constants_1.userRole.admin), meal_controllers_1.mealControllers.getAllMealsForPreferences);
router.get("/:id", meal_controllers_1.mealControllers.getSingleMeal);
router.delete("/:id", (0, auth_1.default)(user_constants_1.userRole.admin), meal_controllers_1.mealControllers.deleteMeal);
router.post("/create-meal", (0, auth_1.default)(user_constants_1.userRole.admin), (0, validateRequest_1.default)(meal_validations_1.mealValidations.createMealValidationSchema), meal_controllers_1.mealControllers.createMeal);
router.patch("/update-meal/:id", (0, auth_1.default)(user_constants_1.userRole.admin), (0, validateRequest_1.default)(meal_validations_1.mealValidations.updateMealValidationSchema), meal_controllers_1.mealControllers.updateMeal);
exports.mealRoutes = router;
