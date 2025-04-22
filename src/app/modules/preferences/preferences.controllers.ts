
import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { dietaryPreferenceServices } from "./preferences.services";

const createMyDietaryPreference : RequestHandler = catchAsync(async (req , res) => {
    const result = await dietaryPreferenceServices.createDietaryPreferenceIntoDb(req.user.userId , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Dietary preference created success full !"}) ;
    }
})

export const dietaryPreferenceControllers = {
    createMyDietaryPreference ,
}
