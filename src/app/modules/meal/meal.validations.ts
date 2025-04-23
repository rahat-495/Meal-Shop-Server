
import { z } from "zod"

const createMealValidationSchema = z.object({
    body : z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        price: z.number().nonnegative("Price must be a non-negative number"),
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
        available: z.boolean({required_error: "Availability status is required"}),
    })
})

const updateMealValidationSchema = z.object({
    body : z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        price: z.number().nonnegative("Price must be a non-negative number").optional(),
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
        available: z.boolean({required_error: "Availability status is required"}).optional(),
    })
})

export const mealValidations = {
    createMealValidationSchema ,
    updateMealValidationSchema ,
}
