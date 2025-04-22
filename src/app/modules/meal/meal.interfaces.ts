
import { Types } from "mongoose";
import { TDietary } from "../preferences/preferences.interfaces";

export type TMeal = {
    title: string;
    description: string;
    image: string;
    price: number;
    dietary: TDietary; 
    ingredients: string[];
    available: boolean;
    createdBy: Types.ObjectId; 
};
  
