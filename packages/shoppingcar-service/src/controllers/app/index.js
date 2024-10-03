import Express from 'express';
import { jwtAuthorizationMiddleware } from '~/helpers/passportManager';
import { loginRoute } from './authRouter';
import {getUserDetailRouter} from "./userRouter";
import {getMerchantsRoute} from "./merchantRouter";
console.log("🚀 ~ getMerchantsRoute:", getMerchantsRoute)

const router = Express.Router();

router.post("/login", loginRoute);
router.get("/merchants", jwtAuthorizationMiddleware, getMerchantsRoute);
router.get("/users", jwtAuthorizationMiddleware, getUserDetailRouter);

export default router;