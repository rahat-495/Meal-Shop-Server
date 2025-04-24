
import { Router } from "express";
import { mealPreferenceControllers } from "./mealPreferences.controllers";
import auth from "../middlewares/auth";
import { userRole } from "../user/user.constants";
import validateRequest from "../middlewares/validateRequest";
import { mealPreferenceValidations } from "./mealPreferences.validations";

const router = Router() ;

router.get(
    "/" , 
    auth(userRole.user , 
    userRole.admin) , 
    mealPreferenceControllers.getAllMealPreferences
) ;

router.get(
    "/:id" , 
    auth(userRole.user , 
    userRole.admin) , 
    mealPreferenceControllers.getSingleMealPreference ,
) ;

router.post(
    "/create-meal-preference" , 
    auth(userRole.user) ,
    validateRequest(mealPreferenceValidations.createMealPreferenceValidationSchema) , 
    mealPreferenceControllers.createMealPreference
) ;

router.patch(
    "/update-meal-preference/:id" , 
    auth(userRole.user) ,
    validateRequest(mealPreferenceValidations.updateMealPreferenceValidationSchema) , 
    mealPreferenceControllers.updateMealPreference
) ;

router.delete(
    "/:id" , 
    auth(userRole.user) ,
    mealPreferenceControllers.deleteMealPreference
) ;

export const mealPreferenceRoutes = router ;
