
import { Router } from "express";
import { authControllers } from "./auth.controllers";
import { upload } from "../../utils/sendImageToCloudinary";
import { parseTextDataToJsonData } from "./auth.utils";
import validateRequest from "../middlewares/validateRequest";
import { userValidations } from "../user/user.validations";

const router = Router() ;

router.post("/login" , validateRequest(userValidations.loginUserValidationSchema) , authControllers.loginUser) ;
router.post("/register" , upload.single("file") , parseTextDataToJsonData , validateRequest(userValidations.registerUserValidationSchema) , authControllers.registerUser) ;

export const authRoutes = router ;
