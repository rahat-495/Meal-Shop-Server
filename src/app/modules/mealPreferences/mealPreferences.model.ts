
import { Schema, model } from "mongoose";
import { TMealPreference } from "./mealPreferences.interfaces";

const mealPreferenceSchema = new Schema<TMealPreference>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dietary: {
        type: String,
        required: true,
        enum: [
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
        ],
    },
    ingredients: {
        type: [String],
        required: true,
    },
    createdBy: {
        ref: "user",
        required: true,
        type: Schema.Types.ObjectId,
    }
},{
    timestamps: true,
});

export const mealPreferencesModel = model<TMealPreference>("mealPreference", mealPreferenceSchema);
