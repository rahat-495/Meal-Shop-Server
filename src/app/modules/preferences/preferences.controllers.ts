
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { dietaryPreferenceServices } from "./preferences.services";

const getAllDietaryPreferences : RequestHandler = catchAsync(async (req , res) => {
    const result = await dietaryPreferenceServices.getAllDietaryPreferencesFromDb() ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Dietary preference created success full !"}) ;
    }
})

const getMyDietaryPreferences : RequestHandler = catchAsync(async (req , res) => {
    const result = await dietaryPreferenceServices.getMyDietaryPreferencesFromDb(req.user.userId) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Dietary preference are retrived success full !"}) ;
    }
})

const createMyDietaryPreference : RequestHandler = catchAsync(async (req , res) => {
    const result = await dietaryPreferenceServices.createDietaryPreferenceIntoDb(req.user.userId , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Dietary preference created success full !"}) ;
    }
})

const updateMyDietaryPreference : RequestHandler = catchAsync(async (req , res) => {
    const result = await dietaryPreferenceServices.updateDietaryPreferenceIntoDb(req.user.userId , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Dietary preference updated success full !"}) ;
    }
})

export const dietaryPreferenceControllers = {
    getMyDietaryPreferences ,
    getAllDietaryPreferences ,
    createMyDietaryPreference ,
    updateMyDietaryPreference ,
}
