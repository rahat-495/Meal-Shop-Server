
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
    })
})

export const dietaryPreferenceValidations = {
    createDietaryPreferenceValidationSchema ,
}
