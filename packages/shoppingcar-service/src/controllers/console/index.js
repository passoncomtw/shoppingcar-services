import Express from "express";
import { jwtAuthorizationMiddleware } from "../../helpers/passportManager";
import { loginRoute } from "./authRouter";
import { createMerchantRoute, getMerchantItemsRoute, getMerchantsRoute, updateMerchantRouter } from "./merchantRouter";
import { createProductRouter, getProductsRouter, updateProductRouter } from "./productRouter";
import { getShoppingcarsRouter } from "./shoppingcarRouter";
import { createUserRouter, getUsersRouter, updateUserRouter } from "./userRouter";

const router = Express.Router();

router.post("/login", loginRoute);

router.get("/merchants", jwtAuthorizationMiddleware, getMerchantsRoute);
router.get("/merchants/items", jwtAuthorizationMiddleware, getMerchantItemsRoute);
router.post("/merchants", jwtAuthorizationMiddleware, createMerchantRoute);
router.put("/merchants/:merchantId", jwtAuthorizationMiddleware, updateMerchantRouter);

router.get("/users", jwtAuthorizationMiddleware, getUsersRouter);
router.post("/users", jwtAuthorizationMiddleware, createUserRouter);
router.put("/users/:userId", jwtAuthorizationMiddleware, updateUserRouter);

router.get("/shoppingcars", jwtAuthorizationMiddleware, getShoppingcarsRouter);

router.get("/products", jwtAuthorizationMiddleware, getProductsRouter);
router.post("/products", jwtAuthorizationMiddleware, createProductRouter);
router.put("/products/:productId", jwtAuthorizationMiddleware, updateProductRouter);

export default router;
