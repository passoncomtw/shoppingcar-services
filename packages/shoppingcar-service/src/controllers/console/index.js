import Express from 'express';
import { jwtAuthorizationMiddleware } from '../../helpers/passportManager';
import { loginRoute } from './authRouter';
import { createMerchantRoute, getMerchantsRoute } from './merchantRouter';
import { createUserRouter } from './userRouter';

const router = Express.Router();

router.post("/login", loginRoute);
router.get("/merchants", jwtAuthorizationMiddleware, getMerchantsRoute)
router.post("/merchants", jwtAuthorizationMiddleware, createMerchantRoute);
router.post("/users", jwtAuthorizationMiddleware, createUserRouter);

export default router;