
import AppError from "../../errors/AppErrors";
import { TDietaryPreference } from "./preferences.interfaces"
import { dietaryPreferencesModel } from "./preferences.model";
import http from "http-status-codes"

const getAllDietaryPreferencesFromDb = async () => {
    const result = await dietaryPreferencesModel.find().populate("userId" , "_id name email profileImage phoneNumber") ;
    return result ;
}

const getMyDietaryPreferencesFromDb = async (userId : string) => {
    const result = await dietaryPreferencesModel.findOne({userId : userId}).populate("userId" , "_id name email profileImage phoneNumber") ;
    if(!result){
        throw new AppError(http.NOT_FOUND , "User have not any dietary preference !") ;
    }

    return result ;
}

const createDietaryPreferenceIntoDb = async (userId : string , payload : TDietaryPreference) => {
    const isUserAlreadyHaveDietaryPreference = await dietaryPreferencesModel.findOne({userId}) ;
    
    if(isUserAlreadyHaveDietaryPreference){
        throw new AppError(http.BAD_REQUEST , "User already have dietary preference !") ;
    }

    const result = await dietaryPreferencesModel.create({...payload , userId}) ;
    return result ;
}

const updateDietaryPreferenceIntoDb = async (userId : string , payload : TDietaryPreference) => {
    const isUserAlreadyHaveDietaryPreference = await dietaryPreferencesModel.findOne({userId}) ;

    if(!isUserAlreadyHaveDietaryPreference){
        throw new AppError(http.NOT_FOUND , "User have not any dietary preference !") ;
    }

    const result = await dietaryPreferencesModel.findOneAndUpdate({userId} , {...payload} , {new : true}) ;
    return result ;
}

export const dietaryPreferenceServices = {
    createDietaryPreferenceIntoDb ,
    updateDietaryPreferenceIntoDb ,
    getMyDietaryPreferencesFromDb ,
    getAllDietaryPreferencesFromDb ,
}
