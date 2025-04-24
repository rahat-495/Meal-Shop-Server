
import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { preferenceRoutes } from "../modules/preferences/preferences.routes";
import { mealRoutes } from "../modules/meal/meal.routes";
import { orderRoutes } from "../modules/order/order.routes";
import { mealPreferenceRoutes } from "../modules/mealPreferences/mealPreferences.routes";

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
    {
        path : "/preferences",
        route : preferenceRoutes ,
    },
    {
        path : "/meals",
        route : mealRoutes ,
    },
    {
        path : "/orders",
        route : orderRoutes ,
    },
    {
        path : "/meal-preferences",
        route : mealPreferenceRoutes ,
    },
]

moduleRoutes.forEach((route) => router.use(route.path , route.route )) ;

export default router ;
