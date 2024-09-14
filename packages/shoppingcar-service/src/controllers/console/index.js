import Express from 'express';
import { loginRoute } from './authRouter';
import '../../helpers/passportManager';

const router = Express.Router();

router.post("/login", loginRoute);

export default router;