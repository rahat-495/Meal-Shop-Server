
import { Schema, model } from "mongoose";
import { TMeal } from "./meal.interfaces";

const mealSchema = new Schema<TMeal>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
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
    available: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        ref: "user",
        required: true,
        type: Schema.Types.ObjectId,
    }
},{
    timestamps: true,
});

export const mealsModel = model<TMeal>("meal", mealSchema);
