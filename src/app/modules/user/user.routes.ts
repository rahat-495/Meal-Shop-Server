
import { Router } from "express";
import auth from "../middlewares/auth";
import { userRole } from "./user.constants";
import { userControllers } from "./user.controllers";

const router = Router() ;

router.get("/get-my-data" , auth(userRole.user , userRole.admin) , userControllers.getMyData) ;
router.patch("/update-profile" , auth(userRole.user , userRole.admin) , userControllers.updateProfile) ;

export const userRoutes = router ;
