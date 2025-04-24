"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dietaryPreferencesModel = void 0;
const mongoose_1 = require("mongoose");
const dietaryPreferenceSchema = new mongoose_1.Schema({
    dietary: {
        type: String,
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
            "Organic"
        ],
        required: true,
    },
    userId: {
        ref: "user",
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
});
exports.dietaryPreferencesModel = (0, mongoose_1.model)("Dietary-Preference", dietaryPreferenceSchema);
