import Express from "express";
import { jwtAuthorizationMiddleware } from "../../helpers/passportManager";
import { loginRoute } from "./authRouter";
import { createMerchantRoute, getMerchantItemsRoute, getMerchantsRoute, updateMerchantRouter } from "./merchantRouter";
import { getOrdersRouter, updateOrderPayStatusRouter } from "./orderRouter";
import { createProductRouter, getProductsRouter, updateProductRouter } from "./productRouter";
import { clearShoppingcarRouter, getShoppingcarsRouter } from "./shoppingcarRouter";
import { createUserRouter, getUsersRouter, updateUserRouter, getUserByUserIdRouter } from "./userRouter";

const router = Express.Router();

router.post("/login", loginRoute);

router.get("/merchants/items", jwtAuthorizationMiddleware, getMerchantItemsRoute);
router.get("/merchants", jwtAuthorizationMiddleware, getMerchantsRoute);
router.post("/merchants", jwtAuthorizationMiddleware, createMerchantRoute);
router.put("/merchants/:merchantId", jwtAuthorizationMiddleware, updateMerchantRouter);

router.get("/users/:userId", jwtAuthorizationMiddleware, getUserByUserIdRouter);
router.get("/users", jwtAuthorizationMiddleware, getUsersRouter);
router.put("/users/:userId", jwtAuthorizationMiddleware, updateUserRouter);
router.post("/users", jwtAuthorizationMiddleware, createUserRouter);

router.get("/orders", jwtAuthorizationMiddleware, getOrdersRouter);
router.put("/orders/:orderId", jwtAuthorizationMiddleware, updateOrderPayStatusRouter);

router.get("/shoppingcars", jwtAuthorizationMiddleware, getShoppingcarsRouter);
router.delete("/shoppingcars/:userId", jwtAuthorizationMiddleware, clearShoppingcarRouter);

router.get("/products", jwtAuthorizationMiddleware, getProductsRouter);
router.post("/products", jwtAuthorizationMiddleware, createProductRouter);
router.put("/products/:productId", jwtAuthorizationMiddleware, updateProductRouter);

export default router;
