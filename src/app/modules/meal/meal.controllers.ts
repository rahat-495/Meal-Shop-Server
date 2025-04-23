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

const updateMeal : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealServices.updateMealIntoDb(req?.params?.id , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Meal updated success full !"}) ;
    }
})

const deleteMeal : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealServices.deleteMealFromDb(req?.params?.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Meal deleted success full !"}) ;
    }
})

const getAllMeals : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealServices.getAllMealsFromDb(req.user.userId) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Meals are retrived success full !"}) ;
    }
})

const getSingleMeal : RequestHandler = catchAsync(async (req , res) => {
    const result = await mealServices.getSingleMealFromDb(req?.params?.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Meal are retrived success full !"}) ;
    }
})

export const mealControllers = {
    createMeal ,
    updateMeal ,
    deleteMeal ,
    getAllMeals ,
    getSingleMeal ,
}
