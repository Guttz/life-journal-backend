// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { useContainer } from 'typeorm';
import { Container } from 'typedi';

import routes from './routes';
import logger from './utils/logger';
useContainer(Container);

// Create a new express application instance
const app: express.Application = express();
app.use(bodyParser.json());
app.use(logger);
app.use(helmet());
app.use(cors());
app.use('/', routes);

//app.post('/auth/login', Container.get(AuthController).login);

export default app;
