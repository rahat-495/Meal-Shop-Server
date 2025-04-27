
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { mealPreferenceServices } from "./mealPreferences.services";

const getAllMealPreferences : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealPreferenceServices.getAllMealPreferencesFromDb(req.query) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Meal preferences are retrived success full !"}) ;
    }
})

const getMyMealPreferences : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealPreferenceServices.getMyMealPreferencesFromDb(req.user.userId) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Meal preferences are retrived success full !"}) ;
    }
})

const getSingleMealPreference : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealPreferenceServices.getSingleMealPreferenceFromDb(req.params.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Meal preference are retrived success full !"}) ;
    }
})

const createMealPreference : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealPreferenceServices.createMealPreferenceIntoDb(req.user.userId , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Meal preference created success full !"}) ;
    }
})

const updateMealPreference : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealPreferenceServices.updateMealPreferenceIntoDb(req.params.id , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Meal preference updated success full !"}) ;
    }
})

const deleteMealPreference : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealPreferenceServices.deleteMealPreferenceFromDb(req.params.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Meal preference deleted success full !"}) ;
    }
})

const sendReply : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealPreferenceServices.sendReplyToUser(req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Reply sended success full !"}) ;
    }
})

export const mealPreferenceControllers = {
    sendReply ,
    createMealPreference ,
    getMyMealPreferences ,
    updateMealPreference ,
    deleteMealPreference ,
    getAllMealPreferences ,
    getSingleMealPreference ,
}
