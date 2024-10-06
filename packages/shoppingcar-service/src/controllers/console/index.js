import Express from 'express';
import { jwtAuthorizationMiddleware } from '../../helpers/passportManager';
import { loginRoute } from './authRouter';
import { createMerchantRoute, getMerchantsRoute, getMerchantItemsRoute } from './merchantRouter';
import { createUserRouter, getUsersRouter } from './userRouter';
import { createProductRouter, getProductsRouter } from "./productRouter";

const router = Express.Router();

router.post("/login", loginRoute);
router.get("/merchants", jwtAuthorizationMiddleware, getMerchantsRoute);
router.get("/merchants/items", jwtAuthorizationMiddleware, getMerchantItemsRoute);
router.post("/merchants", jwtAuthorizationMiddleware, createMerchantRoute);
router.get("/users", jwtAuthorizationMiddleware, getUsersRouter);
router.post("/users", jwtAuthorizationMiddleware, createUserRouter);
router.get("/products", jwtAuthorizationMiddleware, getProductsRouter);
router.post("/products", jwtAuthorizationMiddleware, createProductRouter);

export default router;