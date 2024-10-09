import Express from 'express';
import { jwtAuthorizationMiddleware } from '~/helpers/passportManager';
import { loginRoute } from './authRouter';
import {getUserDetailRouter} from "./userRouter";
import {getShoppingcarRouter, appendProductToShoppingcar} from "./shoppingcarRouter";
import {getMerchantsRoute, getProductsByMerchantIdRouter, getProductInformationRouter} from "./merchantRouter";

const router = Express.Router();

router.post("/login", loginRoute);

router.get("/merchants", jwtAuthorizationMiddleware, getMerchantsRoute);
router.get("/merchants/:merchantId/products/:productId", jwtAuthorizationMiddleware, getProductInformationRouter);
router.get("/merchants/:merchantId/products", jwtAuthorizationMiddleware, getProductsByMerchantIdRouter);

router.get("/users/self", jwtAuthorizationMiddleware, getUserDetailRouter);

router.get("/shoppingcars", jwtAuthorizationMiddleware, getShoppingcarRouter);
router.post("/shoppingcars/:merchantId/products/:productId", jwtAuthorizationMiddleware, appendProductToShoppingcar);

export default router;