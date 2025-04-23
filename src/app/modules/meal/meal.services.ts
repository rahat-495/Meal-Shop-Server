
import AppError from "../../errors/AppErrors";
import { TMeal } from "./meal.interfaces"
import { mealsModel } from "./meal.model";

const createMealIntoDb = async (userId : string , payload : TMeal) => {
    const result = await mealsModel.create({...payload , createdBy : userId}) ;
    return result ;
}

const updateMealIntoDb = async (id : string , payload : TMeal) => {
    const isMealExist = await mealsModel.findById(id) ;
    if(!isMealExist){
        throw new AppError(404 , "Meal not found !") ;
    }
    
    const result = await mealsModel.findByIdAndUpdate(id , payload , {new : true}) ;
    return result ;
}

const deleteMealFromDb = async (id : string) => {
    const isMealExist = await mealsModel.findById(id) ;
    if(!isMealExist){
        throw new AppError(404 , "Meal not found !") ;
    }

    const result = await mealsModel.findByIdAndDelete(id) ;
    return result ;
}

const getAllMealsFromDb = async () => {
    const result = await mealsModel.find() ;
    return result ;
}

const getSingleMealFromDb = async (id : string) => {
    const result = await mealsModel.findById(id) ;
    return result ;
}

export const mealServices = {
    createMealIntoDb ,
    updateMealIntoDb ,
    deleteMealFromDb ,
    getAllMealsFromDb ,
    getSingleMealFromDb ,
}
