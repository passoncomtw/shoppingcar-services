import Express from 'express';
import { jwtAuthorizationMiddleware } from '~/helpers/passportManager';
import { loginRoute } from './authRouter';
import {getUserDetailRouter} from "./userRouter";

const router = Express.Router();

router.post("/login", loginRoute);
router.get("/users", jwtAuthorizationMiddleware, getUserDetailRouter);

export default router;