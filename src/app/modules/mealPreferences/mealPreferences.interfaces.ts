
import { Types } from "mongoose";
import { TDietary } from "../preferences/preferences.interfaces";

export type TMealPreference = {
    title: string;
    description: string;
    dietary: TDietary;
    ingredients: string[];
    createdBy: Types.ObjectId; 
    reply ?: string ;
};
