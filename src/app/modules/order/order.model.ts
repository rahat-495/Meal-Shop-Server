
import { Schema, model } from 'mongoose';
import { TOrder } from './order.interfaces';

const orderMealSchema: Schema = new Schema<TOrder>(
  {
    email: { type: String, required: false },
    customer: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    id: { type: Schema.Types.ObjectId, ref: 'meal', required: true },
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

const orderMealModel = model<TOrder>('orderMeal', orderMealSchema);
export default orderMealModel;
