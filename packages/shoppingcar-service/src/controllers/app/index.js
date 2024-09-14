import Express from 'express';
import { loginRoute } from './authRouter';

const router = Express.Router();

router.post("/login", loginRoute);

export default router;