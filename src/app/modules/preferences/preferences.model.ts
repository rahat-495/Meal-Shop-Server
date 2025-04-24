
import { model, Schema } from "mongoose";
import { TDietaryPreference } from "./preferences.interfaces";

const dietaryPreferenceSchema = new Schema<TDietaryPreference>({
    dietary : {
        type : String ,
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
        required : true ,
    } ,
    userId : {
        ref : "user" ,
        type : Schema.Types.ObjectId ,
        required : true ,
    } ,
})

export const dietaryPreferencesModel = model("Dietary-Preference", dietaryPreferenceSchema) ;
