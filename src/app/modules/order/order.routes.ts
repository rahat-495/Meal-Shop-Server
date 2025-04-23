
import { Router } from 'express';
import auth from '../middlewares/auth';
import { userRole } from '../user/user.constants';
import { orderController } from './order.controllers';

const OrderBookRouter = Router();

OrderBookRouter.post(
  '/create-order',
  auth(userRole.user),
  orderController.createMealOrder
);

OrderBookRouter.put(
  '/update-order',
  auth(userRole.admin),
  orderController.updateMealOrder
);

OrderBookRouter.get(
  '/verify',
  auth(userRole.user),
  orderController.verifyMealOrder
);

OrderBookRouter.get(
  '/',
  auth(userRole.admin),
  orderController.getAllOrders
);

OrderBookRouter.get(
  '/my-orders',
  auth(userRole.user, userRole.admin),
  orderController.getUserMealOrders
);

OrderBookRouter.delete(
  '/:orderId',
  auth(userRole.user , userRole.admin),
  orderController.deleteMealOrder
);

OrderBookRouter.delete(
  '/:orderId',
  auth(userRole.admin , userRole.admin),
  orderController.adminDeleteMealOrder
);

export default OrderBookRouter;
