
import { Router } from "express";
import auth from "../middlewares/auth";
import { userRole } from "../user/user.constants";
import { mealControllers } from "./meal.controllers";
import validateRequest from "../middlewares/validateRequest";
import { mealValidations } from "./meal.validations";

const router = Router() ;

router.get("/" , mealControllers.getAllMeals) ; 
router.get("/my-preferences-meals" , auth(userRole.user , userRole.admin) , mealControllers.getAllMealsForPreferences) ; 
router.get("/:id" , mealControllers.getSingleMeal) ; 
router.delete("/:id" , auth(userRole.admin) , mealControllers.deleteMeal) ; 
router.post("/create-meal" , auth(userRole.admin) , validateRequest(mealValidations.createMealValidationSchema) , mealControllers.createMeal) ; 
router.patch("/update-meal/:id" , auth(userRole.admin) , validateRequest(mealValidations.updateMealValidationSchema) , mealControllers.updateMeal) ; 

export const mealRoutes = router ;
