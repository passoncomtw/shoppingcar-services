import Express from 'express';
import { jwtAuthorizationMiddleware } from '~/helpers/passportManager';
import { loginRoute } from './authRouter';
import {getUserDetailRouter} from "./userRouter";
import {getMerchantsRoute, getProductsByMerchantIdRouter, getProductRouter} from "./merchantRouter";

const router = Express.Router();

router.post("/login", loginRoute);
router.get("/merchants", jwtAuthorizationMiddleware, getMerchantsRoute);
router.get("/merchants/:merchantId/products", jwtAuthorizationMiddleware, getProductsByMerchantIdRouter)
router.get("/merchants/:merchantId/products/:productId", jwtAuthorizationMiddleware, getProductRouter)
router.get("/users/self", jwtAuthorizationMiddleware, getUserDetailRouter);

export default router;