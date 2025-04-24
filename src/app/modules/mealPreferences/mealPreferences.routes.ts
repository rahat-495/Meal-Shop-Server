
import { Router } from "express";
import { mealPreferenceControllers } from "./mealPreferences.controllers";

const router = Router() ;

router.post("/create-meal-preference" , mealPreferenceControllers.createMealPreference) ;

export const mealPreferenceRoutes = router ;
