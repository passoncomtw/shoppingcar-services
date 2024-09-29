import Express from 'express';
import { jwtAuthorizationMiddleware } from '../../helpers/passportManager';
import { loginRoute } from './authRouter';
import { createMerchantRoute, getMerchantsRoute } from './merchantRouter';
import { createUserRouter, getUsersRouter } from './userRouter';

const router = Express.Router();

router.post("/login", loginRoute);
router.get("/merchants", jwtAuthorizationMiddleware, getMerchantsRoute)
router.post("/merchants", jwtAuthorizationMiddleware, createMerchantRoute);
router.get("/users", jwtAuthorizationMiddleware, getUsersRouter);
router.post("/users", jwtAuthorizationMiddleware, createUserRouter);

export default router;