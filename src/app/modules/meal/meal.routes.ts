
import { Router } from "express";
import auth from "../middlewares/auth";
import { userRole } from "../user/user.constants";
import { mealControllers } from "./meal.controllers";
import validateRequest from "../middlewares/validateRequest";
import { mealValidations } from "./meal.validations";

const router = Router() ;

router.post("/create-meal" , auth(userRole.admin) , validateRequest(mealValidations.createMealValidationSchema) , mealControllers.createMeal) ; 

export const mealRoutes = router ;
