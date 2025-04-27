
import AppError from "../../errors/AppErrors";
import { TMealPreference } from "./mealPreferences.interfaces";
import { mealPreferencesModel } from "./mealPreferences.model";

const createMealPreferenceIntoDb = async (userId : string, payload : TMealPreference) => {
    console.log(payload);
    const result = await mealPreferencesModel.create({...payload , createdBy : userId}) ;
    return result ;
}

const updateMealPreferenceIntoDb = async (id : string , payload : Partial<TMealPreference>) => {
    const result = await mealPreferencesModel.findByIdAndUpdate(id , payload , {new : true}) ;
    return result ;
}

const getAllMealPreferencesFromDb = async (query : any) => {

    const page = Number(query?.page) || 1 ;
    const limit = Number(query?.limit) || 10 ;
    const skip = (page - 1) * limit ;
    
    const filter: any = {};

    if (query.searchTerm) {
        filter.$or = [
          { title: { $regex: query.searchTerm, $options: "i" } },
          { description : { $regex: query.searchTerm, $options: "i" } },
          { dietary : { $regex: query.searchTerm, $options: "i" } },
        ];
    }

    if (query.dietary) {
        filter.dietary = query.dietary;
    }

    const total = await mealPreferencesModel.find(filter).estimatedDocumentCount() ;
    const result = await mealPreferencesModel.find(filter).skip(skip).limit(limit) ;
    const totalPage = Math.ceil(total / limit) ;
    
    return { result , meta : { limit , page , total , totalPage }};
}

const getSingleMealPreferenceFromDb = async (id : string) => {
    const result = await mealPreferencesModel.findById(id) ;
    if(!result){
        throw new AppError(404 , "Meal preference not found !") ;
    }
    return result ;
}

const getMyMealPreferencesFromDb = async (id : string) => {
    const result = await mealPreferencesModel.find({createdBy : id}) ;
    return result ;
}

const deleteMealPreferenceFromDb = async (id : string) => {
    const isMealPreferenceExist = await mealPreferencesModel.findById(id) ;
    if(!isMealPreferenceExist){
        throw new AppError(404 , "Meal preference not found !") ;
    }
    
    await mealPreferencesModel.findByIdAndDelete(id) ;
    return {} ;
}

const sendReplyToUser = async (payload : {id : string , reply : string}) => {
    const isMealPreferenceExist = await mealPreferencesModel.findById(payload?.id) ;
    if(!isMealPreferenceExist){
        throw new AppError(404 , "Meal preference not found !") ;
    }

    const result = await mealPreferencesModel.findByIdAndUpdate(payload?.id , {reply : payload?.reply} , {new : true}) ;
    return result ;
}

export const mealPreferenceServices = {
    sendReplyToUser ,
    createMealPreferenceIntoDb ,
    updateMealPreferenceIntoDb ,
    deleteMealPreferenceFromDb ,
    getMyMealPreferencesFromDb ,
    getAllMealPreferencesFromDb ,
    getSingleMealPreferenceFromDb ,
}
