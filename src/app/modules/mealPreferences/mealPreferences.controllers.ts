
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { mealPreferenceServices } from "./mealPreferences.services";

const createMealPreference : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealPreferenceServices.createMealPreferenceIntoDb(req.user.userId , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Dietary preference created success full !"}) ;
    }
})

export const mealPreferenceControllers = {
    createMealPreference ,
}
