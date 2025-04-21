
import { Router } from "express";
import auth from "../middlewares/auth";
import { userRole } from "./user.constants";
import { userControllers } from "./user.controllers";

const router = Router() ;

router.get("/get-my-data" , auth(userRole.user , userRole.admin) , userControllers.getMyData) ;

export const userRoutes = router ;
