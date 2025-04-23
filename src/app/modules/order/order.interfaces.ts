
import { Types } from 'mongoose';

export type TOrder = {
  email?: string;
  cardId?: string;
  customer: Types.ObjectId;
  id: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status?: 'Pending' | 'Paid' | "Preparing" | "Packing" | 'Shipped' | 'Completed' | 'Cancelled';
  transaction?: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
};

export type TCartItem = {
  product: string;
  quantity: number;
};

export type TAddToCartIntoDb = {
  product: Types.ObjectId;
  quantity: number;
  email : string ;
};
