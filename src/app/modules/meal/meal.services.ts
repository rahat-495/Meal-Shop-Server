
import { TMeal } from "./meal.interfaces"
import { mealsModel } from "./meal.model";

const createMealIntoDb = async (userId : string , payload : TMeal) => {
    const result = await mealsModel.create({...payload , createdBy : userId}) ;
    return result ;
}

export const mealServices = {
    createMealIntoDb
}
