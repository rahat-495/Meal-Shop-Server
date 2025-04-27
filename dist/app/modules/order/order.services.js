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
exports.orderService = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
const order_utils_1 = require("./order.utils");
const meal_model_1 = require("../meal/meal.model");
const order_model_1 = __importDefault(require("./order.model"));
const createMealOrderService = (data, userId, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const user = yield user_model_1.usersModel.findById(userId).session(session);
        if (!user) {
            throw new AppErrors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
        }
        const { id, quantity } = data;
        if (!data.customer) {
            data.customer = new mongoose_1.default.Types.ObjectId(user._id);
        }
        const meal = yield meal_model_1.mealsModel.findById(id);
        if (!meal) {
            throw new AppErrors_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Meal not found.');
        }
        data.totalPrice = meal.price * quantity;
        const orderData = Object.assign(Object.assign({}, data), { customer: user._id });
        const result = yield order_model_1.default.create([orderData], { session });
        yield result[0].populate('customer', 'name email role');
        // Payment integration
        const shurjopayPayload = {
            amount: data.totalPrice,
            order_id: result[0]._id,
            currency: 'BDT',
            customer_name: user.name,
            customer_email: user.email,
            customer_phone: 'N/A',
            customer_address: 'N/A',
            customer_city: 'N/A',
            client_ip,
            return_url: `http://localhost:5555/api/v1/orders/verify`,
        };
        const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
        if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
            yield result[0].updateOne({
                transaction: {
                    id: payment.sp_order_id,
                    transactionStatus: payment.transactionStatus,
                },
            });
        }
        yield session.commitTransaction();
        session.endSession();
        return { order: result[0], checkout_url: payment.checkout_url };
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        session.endSession();
        throw new AppErrors_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Order creation failed');
    }
});
const verifyMealOrderPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.transaction_status': verifiedPayment[0].transaction_status,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status === 'Success'
                ? 'Paid'
                : verifiedPayment[0].bank_status === 'Failed'
                    ? 'Pending'
                    : verifiedPayment[0].bank_status === 'Cancel'
                        ? 'Cancelled'
                        : '',
        });
    }
    return verifiedPayment;
});
const getAllOrdersByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userOrders = yield order_model_1.default.find({ customer: userId }).populate('customer', 'name email profileImage').populate('id');
    if (!userOrders || userOrders.length === 0) {
        throw new AppErrors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'No orders found for this user');
    }
    return userOrders;
});
const getAllOrdersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find().populate('customer', 'name email profileImage').populate('id');
    return result;
});
const updateOrderQuantityService = (orderId, userId, newQuantity) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const order = yield order_model_1.default.findById(orderId).session(session);
        if (!order) {
            throw new AppErrors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Order not found');
        }
        if (order.customer.toString() !== userId) {
            throw new AppErrors_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Unauthorized to update this order');
        }
        // const book = await booksModel.findById(order.id).session(session);
        // if (!book) {
        //   throw new AppError(StatusCodes.NOT_FOUND, 'Book not found');
        // }
        // const quantityDifference = newQuantity - order.quantity;
        // if (quantityDifference > 0 && book.stock < quantityDifference) {
        //   throw new AppError(StatusCodes.BAD_REQUEST, 'Not enough stock available');
        // }
        // // Update book stock
        // book.stock -= quantityDifference;
        // await book.save({ session });
        // // Update order quantity and total price
        // order.quantity = newQuantity;
        // order.totalPrice = book.price * newQuantity;
        // await order.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return order;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const deleteOrderFromDB = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findById(id);
    if (!order) {
        throw new AppErrors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Order not found');
    }
    if (order.status !== "Pending" && order.status !== "Preparing") {
        throw new AppErrors_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'You can not delete this order !');
    }
    if (order.customer.toString() !== userId) {
        throw new AppErrors_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Unauthorized to delete this order !');
    }
    return yield order_model_1.default.findByIdAndDelete(id);
});
const updateMealOrderIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isOrderAxist = yield order_model_1.default.findById(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!isOrderAxist) {
        throw new AppErrors_1.default(404, "Order not found !");
    }
    const result = yield order_model_1.default.findByIdAndUpdate(payload === null || payload === void 0 ? void 0 : payload.id, { status: payload === null || payload === void 0 ? void 0 : payload.status });
    return result;
});
exports.orderService = {
    createMealOrderService,
    updateMealOrderIntoDb,
    verifyMealOrderPayment,
    getAllOrdersByUser,
    getAllOrdersFromDb,
    updateOrderQuantityService,
    deleteOrderFromDB,
};
