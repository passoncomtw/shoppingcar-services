/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import appRouter from './controllers/app';
import consoleRouter from './controllers/console';
import seaggerUI from 'express-swagger-generator';
import packageJson from '../../../package.json';
import './helpers/passportManager';

const {NODE_ENV = "development", APP_DOMAIN} = process.env;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Shoppingcar API Service',
      description: '購物車 api',
      version: `${packageJson.version} - ${NODE_ENV}`,
    },
    host: APP_DOMAIN,
    produces: ['application/json'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'JWT token',
      },
    },
  },
  route: {
    url: '/api-docs',
    docs: '/api-docs.json',
  },
  basedir: __dirname,
  files: ['../../../packages/shoppingcar-service/src/controllers/**/*.js'],
};

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

app.use('/app', appRouter);
app.use('/console', consoleRouter);

seaggerUI(app)(swaggerOptions);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

module.exports = server;
