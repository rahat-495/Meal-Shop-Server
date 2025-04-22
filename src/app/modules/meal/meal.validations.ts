
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
        createdBy: z.string({required_error: "CreatedBy (user ID) is required"}),
    })
})

export const mealValidations = {
    createMealValidationSchema ,
}
