"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const order_services_1 = require("./order.services");
const createMealOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const bookOrderData = Object.assign(Object.assign({}, req.body), { user: userId });
    const client_ip = ((_b = req.headers['x-forwarded-for']) === null || _b === void 0 ? void 0 : _b.toString().split(',')[0]) ||
        req.socket.remoteAddress ||
        '127.0.0.1';
    const result = yield order_services_1.orderService.createMealOrderService(bookOrderData, userId, client_ip);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: 'Order created successfully',
        data: result,
    });
}));
const verifyMealOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id } = req.query;
    if (!order_id || typeof order_id !== 'string') {
        throw new AppErrors_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid order_id');
    }
    const result = yield order_services_1.orderService.verifyMealOrderPayment(order_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Payment verification successful',
        data: result,
    });
}));
const getUserMealOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield order_services_1.orderService.getAllOrdersByUser(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Orders retrieved successfully',
        data: result,
    });
}));
const deleteMealOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { orderId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    yield order_services_1.orderService.deleteOrderFromDB(orderId, userId);
    (0, sendResponse_1.default)(res, { data: {},
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Order deleted successfully',
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.orderService.getAllOrdersFromDb();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'All orders are retrived !',
        data: result,
    });
}));
const updateMealOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.orderService.updateMealOrderIntoDb(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Status Updated Successfully !',
        data: result,
    });
}));
exports.orderController = {
    getAllOrders,
    createMealOrder,
    verifyMealOrder,
    deleteMealOrder,
    updateMealOrder,
    getUserMealOrders,
};
