"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealValidations = void 0;
const zod_1 = require("zod");
const createMealValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        image: zod_1.z.string(),
        price: zod_1.z.number().nonnegative("Price must be a non-negative number"),
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
        available: zod_1.z.boolean({ required_error: "Availability status is required" }),
    })
});
const updateMealValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        price: zod_1.z.number().nonnegative("Price must be a non-negative number").optional(),
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
        available: zod_1.z.boolean({ required_error: "Availability status is required" }).optional(),
    })
});
exports.mealValidations = {
    createMealValidationSchema,
    updateMealValidationSchema,
};
