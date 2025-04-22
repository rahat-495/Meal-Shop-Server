
import AppError from "../../errors/AppErrors";
import { TDietaryPreference } from "./preferences.interfaces"
import { dietaryPreferencesModel } from "./preferences.model";
import http from "http-status-codes"

const createDietaryPreferenceIntoDb = async (userId : string , payload : TDietaryPreference) => {
    const isUserAlreadyHaveDietaryPreference = await dietaryPreferencesModel.findOne({userId}) ;
    
    if(isUserAlreadyHaveDietaryPreference){
        throw new AppError(http.BAD_REQUEST , "User already have dietary preference") ;
    }

    const result = await dietaryPreferencesModel.create({...payload , userId}) ;
    return result ;
}

export const dietaryPreferenceServices = {
    createDietaryPreferenceIntoDb
}
