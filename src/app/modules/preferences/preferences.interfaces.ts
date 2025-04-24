import { Types } from "mongoose";

export type TDietary =
  | "Vegan"
  | "Vegetarian"
  | "Keto"
  | "GlutenFree"
  | "Paleo"
  | "LowCarb"
  | "HighProtein"
  | "DairyFree"
  | "NutFree"
  | "Halal"
  | "Kosher"
  | "Pescatarian"
  | "SugarFree"
  | "Organic";

export type TDietaryPreference = {
    dietary : TDietary ;
    userId : Types.ObjectId ;
}
