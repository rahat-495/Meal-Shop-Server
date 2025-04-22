import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { mealServices } from "./meal.services";

const createMeal : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealServices.createMealIntoDb(req?.user?.userId , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Meal created success full !"}) ;
    }
})

export const mealControllers = {
    createMeal ,
}
