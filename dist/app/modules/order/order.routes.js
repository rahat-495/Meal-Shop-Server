"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const order_controllers_1 = require("./order.controllers");
const router = (0, express_1.Router)();
router.post('/create-order', (0, auth_1.default)(user_constants_1.userRole.user), order_controllers_1.orderController.createMealOrder);
router.put('/update-order-status', (0, auth_1.default)(user_constants_1.userRole.admin), order_controllers_1.orderController.updateMealOrder);
router.get('/verify', (0, auth_1.default)(user_constants_1.userRole.user), order_controllers_1.orderController.verifyMealOrder);
router.get('/', (0, auth_1.default)(user_constants_1.userRole.admin), order_controllers_1.orderController.getAllOrders);
router.get('/my-orders', (0, auth_1.default)(user_constants_1.userRole.user, user_constants_1.userRole.admin), order_controllers_1.orderController.getUserMealOrders);
router.delete('/:orderId', (0, auth_1.default)(user_constants_1.userRole.user), order_controllers_1.orderController.deleteMealOrder);
exports.orderRoutes = router;
