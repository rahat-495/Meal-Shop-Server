
import { Router } from 'express';
import auth from '../middlewares/auth';
import { userRole } from '../user/user.constants';
import { orderController } from './order.controllers';

const router = Router();

router.post(
  '/create-order',
  auth(userRole.user),
  orderController.createMealOrder
);

router.put(
  '/update-order',
  auth(userRole.admin),
  orderController.updateMealOrder
);

router.get(
  '/verify',
  auth(userRole.user),
  orderController.verifyMealOrder
);

router.get(
  '/',
  auth(userRole.admin),
  orderController.getAllOrders
);

router.get(
  '/my-orders',
  auth(userRole.user, userRole.admin),
  orderController.getUserMealOrders
);

router.delete(
  '/:orderId',
  auth(userRole.user),
  orderController.deleteMealOrder ,
);

export const orderRoutes = router;
