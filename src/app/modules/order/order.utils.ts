
// @ts-ignore
import Shurjopay, { PaymentResponse, VerificationResponse } from 'shurjopay';
import config from '../../config';
// import config from '../../app/config';
// import sendResponse from '../../utils/sendResponse';
// import { StatusCodes } from 'http-status-codes';

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp_endpoint!,
  config.sp_username!,
  config.sp_password!,
  config.sp_prefix!,
  config.sp_return_url!,
);

const makePaymentAsync = async (
  paymentPayload: any,
): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response: PaymentResponse) => resolve(response),
      (error: unknown) => reject(error),
    );
  });
  // const paymentResult = await shurjopay.makePayment(
  //   paymentPayload,
  //   (response) => {
  //     sendResponse(res, {
  //       statusCode: StatusCodes.CREATED,
  //       success: true,
  //       message: 'Order created successfully',
  //       data: response,
  //     });
  //   },
  //   (error) => console.log(error),
  // );
  // return paymentResult;
};

const verifyPaymentAsync = (
  order_id: string,
): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response: VerificationResponse[]) => resolve(response),
      (error: unknown) => reject(error),
    );
  });
};

export const orderUtils = {
  makePaymentAsync,
  verifyPaymentAsync,
};
