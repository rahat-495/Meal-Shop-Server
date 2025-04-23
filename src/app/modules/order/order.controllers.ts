
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../errors/AppErrors';
import { orderService } from './order.services';

const createMealOrder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const bookOrderData = {
    ...req.body,
    user: userId,
  };

  const client_ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  const result = await orderService.createMealOrderService(
    bookOrderData,
    userId,
    client_ip
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const verifyMealOrder = catchAsync(async (req: Request, res: Response) => {
  const { order_id } = req.query;

  if (!order_id || typeof order_id !== 'string') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid order_id');
  }

  const result = await orderService.verifyMealOrderPayment(order_id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment verification successful',
    data: result,
  });
});

const getUserMealOrders = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const result = await orderService.getAllOrdersByUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const deleteMealOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const userId = req.user?.userId;

  await orderService.deleteOrderFromDB(orderId, userId);

  sendResponse(res, { data : {} ,
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order deleted successfully',
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrdersFromDb();
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All orders are retrived !',
    data: result,
  });
})

const updateMealOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.updateMealOrderIntoDb(req.body);
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Status Updated Successfully !',
    data: result,
  });
})

export const orderController = {
  getAllOrders ,
  createMealOrder,
  verifyMealOrder,
  deleteMealOrder,
  updateMealOrder ,
  getUserMealOrders,
};
