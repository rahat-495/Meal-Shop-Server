
import AppError from "../../errors/AppErrors";
import { dietaryPreferencesModel } from "../preferences/preferences.model";
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

const getAllMealsFromDb = async (query : any) => {
    
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

    if (query.availability === "Available") {
        filter.available = true ;
    } else if (query.availability === "Unavailable") {
        filter.available = false ;
    }

    if (query.minPrice && query.maxPrice) {
        filter.price = {
            $gte: Number(query.minPrice),
            $lte: Number(query.maxPrice),
        };
    } else if (query.minPrice) {
        filter.price = { $gte: Number(query.minPrice) };
    } else if (query.maxPrice) {
        filter.price = { $lte: Number(query.maxPrice) };
    }

    const total = await mealsModel.find(filter).estimatedDocumentCount() ;
    const result = await mealsModel.find(filter).skip(skip).limit(limit) ;
    const totalPage = Math.ceil(result.length / limit) ;
    
    return { result , meta : { limit , page , total , totalPage }};
}

const getAllMealsForPreferencesFromDb = async (userId : string , query : any) => {
    
    const page = Number(query?.page) || 1 ;
    const limit = Number(query?.limit) || 10 ;
    const skip = (page - 1) * limit ;
    
    const filter: any = {};
    
    if(userId){
        const userDietary = await dietaryPreferencesModel.findOne({userId}) ;
        filter.dietary = userDietary?.dietary ;
    }


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

    if (query.availability === "Available") {
        filter.available = true ;
    } else if (query.availability === "Unavailable") {
        filter.available = false ;
    }

    if (query.minPrice && query.maxPrice) {
        filter.price = {
            $gte: Number(query.minPrice),
            $lte: Number(query.maxPrice),
        };
    } else if (query.minPrice) {
        filter.price = { $gte: Number(query.minPrice) };
    } else if (query.maxPrice) {
        filter.price = { $lte: Number(query.maxPrice) };
    }

    const total = await mealsModel.find(filter).estimatedDocumentCount() ;
    const result = await mealsModel.find(filter).skip(skip).limit(limit) ;
    const totalPage = Math.ceil(result.length / limit) ;

    return { result , meta : { limit , page , total , totalPage }};

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
    getAllMealsForPreferencesFromDb ,
}
