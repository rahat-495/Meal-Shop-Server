
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { usersModel } from '../user/user.model';
import { TAddToCartIntoDb, TOrder } from './order.interfaces';
import OrderBook from './order.model';
import AppError from '../../errors/AppErrors';
import { orderUtils } from './order.utils';
import { mealsModel } from '../meal/meal.model';

const createBookOrderService = async (
  data: TOrder,
  userId: string,
  client_ip: string
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await usersModel.findById(userId).session(session);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const { id , quantity } = data;

    if (!data.customer) {
      data.customer = new mongoose.Types.ObjectId(user._id);
    }

    const book = await mealsModel.findById(id).session(session);
    if (!book) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Book not found.');
    }
    
    data.totalPrice = book.price * quantity;
    await book.save({ session });
    
    const orderData = {...data, customer: user._id };
    const result = await OrderBook.create([orderData], { session });
    await result[0].populate('customer', 'name email role');

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
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
      await result[0].updateOne({
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      });
    }

    await session.commitTransaction();
    session.endSession();
    return { order: result[0], checkout_url: payment.checkout_url };
  } catch (error) {

    console.log(error);
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Book order creation failed'
    );

  }
};

const verifyBookOrderPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderBook.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transaction_status': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status === 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status === 'Failed'
            ? 'Pending'
            : verifiedPayment[0].bank_status === 'Cancel'
            ? 'Cancelled'
            : '',
      }
    );
  }

  return verifiedPayment;
};

const getAllOrdersByUser = async (userId: string) => {
  const userOrders = await OrderBook.find({ customer: userId }).populate("customer id")

  if (!userOrders || userOrders.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No orders found for this user');
  }
  return userOrders;
};

const getAllOrdersFromDb = async () => {
  const result = await OrderBook.find() ;
  return result ;
}

const updateOrderQuantityService = async (
  orderId: string,
  userId: string,
  newQuantity: number
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await OrderBook.findById(orderId).session(session);
    if (!order) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
    }

    if (order.customer.toString() !== userId) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'Unauthorized to update this order'
      );
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

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const deleteOrderFromDB = async (id: string, userId: string) => {
  const order = await OrderBook.findById(id);
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
  return await OrderBook.findByIdAndDelete(id);
};

const adminDeleteOrder = async (id: string) => {
  const order = await OrderBook.findById(id);
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
  return await OrderBook.findByIdAndDelete(id);
};

const updateBookOrderIntoDb = async (payload : {id : string , status : string}) => {
  const isOrderAxist = await OrderBook.findById(payload?.id) ;
  if(!isOrderAxist){
    throw new AppError(404 , "Order not found !") ;
  }
  const result = await OrderBook.findByIdAndUpdate(payload?.id , {status : payload?.status}) ;
  return result ;
}

export const orderService = {
  createBookOrderService,
  updateBookOrderIntoDb ,
  verifyBookOrderPayment,
  getAllOrdersByUser,
  getAllOrdersFromDb ,
  updateOrderQuantityService,
  deleteOrderFromDB,
  adminDeleteOrder,
};
