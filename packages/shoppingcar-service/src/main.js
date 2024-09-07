/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import authRouter from './controllers/authRouter';
import userRouter from './controllers/userRouter';

const {NODE_ENV = "development"} = process.env;
const app = express();

if (NODE_ENV === "development") {
  // Log every HTTP request. See https://github.com/expressjs/morgan for other
  // available formats.
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to shoppingcar-service!!!' });
});

app.use('/auth', authRouter);
app.use('/users', passport.authenticate('jwt', { session: false }), userRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
