
import { z } from "zod"

const createDietaryPreferenceValidationSchema = z.object({
    body : z.object({
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
            "Organic"
          ]),
        userId: z.string({ message: "userId is required" }),
    })
})

export const dietaryPreferenceValidations = {
    createDietaryPreferenceValidationSchema ,
}
