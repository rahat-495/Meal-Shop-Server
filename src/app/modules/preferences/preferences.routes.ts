
import { Router } from "express";
import auth from "../middlewares/auth";
import { userRole } from "../user/user.constants";
import { dietaryPreferenceControllers } from "./preferences.controllers";
import { dietaryPreferenceValidations } from "./preferences.validations";
import validateRequest from "../middlewares/validateRequest";

const router = Router() ;

router.get(
    "/" , 
    auth(userRole.admin) , 
    dietaryPreferenceControllers.getAllDietaryPreferences 
) ;

router.get(
    "/my-dietary-preferences" , 
    auth(userRole.admin , userRole.user) , 
    dietaryPreferenceControllers.getMyDietaryPreferences
) ;

router.post(
    "/create-dietary-preference" , 
    auth(userRole.user) , 
    validateRequest(dietaryPreferenceValidations.dietaryPreferenceValidationSchema) , 
    dietaryPreferenceControllers.createMyDietaryPreference 
) ;

router.patch(
    "/update-dietary-preference" , 
    auth(userRole.user) , 
    validateRequest(dietaryPreferenceValidations.dietaryPreferenceValidationSchema) , 
    dietaryPreferenceControllers.updateMyDietaryPreference 
) ;

export const preferenceRoutes = router ;
