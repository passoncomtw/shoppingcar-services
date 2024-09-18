import Express from 'express';
import { jwtAuthorizationMiddleware } from '../../helpers/passportManager';
import { loginRoute } from './authRouter';
import { createMerchantRoute } from './merchantRouter';

const router = Express.Router();

router.post("/login", loginRoute);
router.post("/merchants", jwtAuthorizationMiddleware, createMerchantRoute);

export default router;