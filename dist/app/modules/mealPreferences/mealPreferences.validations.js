"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealPreferenceValidations = void 0;
const zod_1 = require("zod");
const createMealPreferenceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        dietary: zod_1.z.enum([
            "Vegan",
            "Vegetarian",
            "Keto",
            "GlutenFree",
            "Paleo",
            "LowCarb",
            "HighProtein",
            "DairyFree",
            "NutFree",
            "Halal",
            "Kosher",
            "Pescatarian",
            "SugarFree",
            "Organic",
        ], { required_error: "Dietary preference is required" }),
        ingredients: zod_1.z.array(zod_1.z.string().min(1, "Each ingredient must be a non-empty string")).nonempty("At least one ingredient is required"),
    })
});
const updateMealPreferenceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        dietary: zod_1.z.enum([
            "Vegan",
            "Vegetarian",
            "Keto",
            "GlutenFree",
            "Paleo",
            "LowCarb",
            "HighProtein",
            "DairyFree",
            "NutFree",
            "Halal",
            "Kosher",
            "Pescatarian",
            "SugarFree",
            "Organic",
        ], { required_error: "Dietary preference is required" }).optional(),
        ingredients: zod_1.z.array(zod_1.z.string().min(1, "Each ingredient must be a non-empty string")).nonempty("At least one ingredient is required").optional(),
    })
});
exports.mealPreferenceValidations = {
    createMealPreferenceValidationSchema,
    updateMealPreferenceValidationSchema,
};
