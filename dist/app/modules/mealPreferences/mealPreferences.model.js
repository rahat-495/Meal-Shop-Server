"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealPreferencesModel = void 0;
const mongoose_1 = require("mongoose");
const mealPreferenceSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
    }
}, {
    timestamps: true,
});
exports.mealPreferencesModel = (0, mongoose_1.model)("mealPreference", mealPreferenceSchema);
