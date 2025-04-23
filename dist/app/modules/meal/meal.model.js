"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealsModel = void 0;
const mongoose_1 = require("mongoose");
const mealSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
    }
}, {
    timestamps: true,
});
exports.mealsModel = (0, mongoose_1.model)("meal", mealSchema);
