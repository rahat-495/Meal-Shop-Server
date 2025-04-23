
import mongoose, { Schema, model } from 'mongoose';
import { TAddToCartIntoDb, TOrder } from './order.interfaces';

const OrderBookSchema: Schema = new Schema<TOrder>(
  {
    email: { type: String, required: false },
    customer: { type: Schema.ObjectId, ref: 'users', required: true },
    id: { type: Schema.ObjectId, ref: 'meals', required: true },
    quantity: { type: Number, required: [true, 'Quantity is required.'] },
    totalPrice: { type: Number, required: [true, 'Total price is required.'] },
    status: {
      type: String,
      enum: ['Pending', 'Paid', "Preparing" , "Packing" , 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    // payment section
    transaction: {
      id: { type: String, required: false },
      transactionStatus: { type: String, required: false },
      bank_status: { type: String, required: false },
      sp_code: { type: String, required: false },
      sp_message: { type: String, required: false },
      method: { type: String, required: false },
      date_time: { type: String, required: false },
    },
  },
  {
    timestamps: true,
  }
);

// const addToCartSchema = new Schema<TAddToCartIntoDb>({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Book", 
//     required: true
//   },
//   quantity : {
//     type : Number ,
//     required : true ,
//   },
//   email : {
//     type : String ,
//     required : true ,
//   },
// })

const OrderBook = model<TOrder>('OrderBook', OrderBookSchema);
// export const cartModel = model<TAddToCartIntoDb>('cart', addToCartSchema);
export default OrderBook;
