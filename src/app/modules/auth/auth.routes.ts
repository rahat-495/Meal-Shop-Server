
import { Router } from "express";
import { authControllers } from "./auth.controllers";
import validateRequest from "../middlewares/validateRequest";
import { userValidations } from "../user/user.validations";

const router = Router() ;

router.post("/login" , validateRequest(userValidations.loginUserValidationSchema) , authControllers.loginUser) ;
router.post("/register" , validateRequest(userValidations.registerUserValidationSchema) , authControllers.registerUser) ;

export const authRoutes = router ;
