"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const preferences_routes_1 = require("../modules/preferences/preferences.routes");
const meal_routes_1 = require("../modules/meal/meal.routes");
const order_routes_1 = require("../modules/order/order.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.authRoutes,
    },
    {
        path: "/users",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/preferences",
        route: preferences_routes_1.preferenceRoutes,
    },
    {
        path: "/meals",
        route: meal_routes_1.mealRoutes,
    },
    {
        path: "/orders",
        route: order_routes_1.orderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
