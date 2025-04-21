
import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";

const router = Router() ;

const moduleRoutes = [
    {
        path : "/auth",
        route : authRoutes ,
    },
    {
        path : "/users",
        route : userRoutes ,
    },
]

moduleRoutes.forEach((route) => router.use(route.path , route.route )) ;

export default router ;
