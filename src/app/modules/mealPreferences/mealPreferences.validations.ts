
import { z } from "zod"

const createMealPreferenceValidationSchema = z.object({
    body : z.object({
        title: z.string(),
        description: z.string(),
        dietary: z.enum([
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
        ],{required_error: "Dietary preference is required"}),
        ingredients: z.array(z.string().min(1, "Each ingredient must be a non-empty string")).nonempty("At least one ingredient is required"),
    })
})

const updateMealPreferenceValidationSchema = z.object({
    body : z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        dietary: z.enum([
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
        ],{required_error: "Dietary preference is required"}).optional(),
        ingredients: z.array(z.string().min(1, "Each ingredient must be a non-empty string")).nonempty("At least one ingredient is required").optional(),
    })
})

export const mealPreferenceValidations = {
    createMealPreferenceValidationSchema ,
    updateMealPreferenceValidationSchema ,
}
