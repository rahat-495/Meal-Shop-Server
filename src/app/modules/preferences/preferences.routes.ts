
import { Router } from "express";
import auth from "../middlewares/auth";
import { userRole } from "../user/user.constants";
import { dietaryPreferenceControllers } from "./preferences.controllers";
import { dietaryPreferenceValidations } from "./preferences.validations";
import validateRequest from "../middlewares/validateRequest";

const router = Router() ;

router.post(
    "/create-dietary-preference" , 
    auth(userRole.user) , 
    validateRequest(dietaryPreferenceValidations.createDietaryPreferenceValidationSchema) , 
    dietaryPreferenceControllers.createMyDietaryPreference 
) ;

export const preferenceRoutes = router ;
