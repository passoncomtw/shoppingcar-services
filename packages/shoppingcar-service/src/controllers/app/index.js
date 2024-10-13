import Express from 'express';
import { jwtAuthorizationMiddleware } from '~/helpers/passportManager';
import { loginRoute } from './authRouter';
import { getUserDetailRouter } from "./userRouter";
import { getShoppingcarRouter, appendProductToShoppingcar } from "./shoppingcarRouter";
import { getMerchantsRoute, getProductsByMerchantIdRouter, getProductInformationRouter } from "./merchantRouter";
import { getOrdersRouter, getOrderInformationRouter, createOrderRouter, updateOrderPayStatusRouter } from "./orderRouter";

const router = Express.Router();

router.post("/login", loginRoute);

router.get("/merchants", jwtAuthorizationMiddleware, getMerchantsRoute);
router.get("/merchants/:merchantId/products/:productId", jwtAuthorizationMiddleware, getProductInformationRouter);
router.get("/merchants/:merchantId/products", jwtAuthorizationMiddleware, getProductsByMerchantIdRouter);

router.get("/users/self", jwtAuthorizationMiddleware, getUserDetailRouter);

router.get("/shoppingcars", jwtAuthorizationMiddleware, getShoppingcarRouter);
router.post("/shoppingcars/:merchantId/products/:productId", jwtAuthorizationMiddleware, appendProductToShoppingcar);

router.get("/orders/:orderId", jwtAuthorizationMiddleware, getOrderInformationRouter);
router.get("/orders", jwtAuthorizationMiddleware, getOrdersRouter);
router.post("/orders", jwtAuthorizationMiddleware, createOrderRouter);
router.put("/orders/:orderId/payment", jwtAuthorizationMiddleware, updateOrderPayStatusRouter);

export default router;