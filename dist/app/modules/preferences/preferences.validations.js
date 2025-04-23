"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dietaryPreferenceValidations = void 0;
const zod_1 = require("zod");
const dietaryPreferenceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
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
            "Organic"
        ]),
    })
});
exports.dietaryPreferenceValidations = {
    dietaryPreferenceValidationSchema,
};
