// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';

import routes from './routes';
import logger from './utils/logger';
useContainer(Container);
import AuthController from './controllers/AuthController';

//Configuring TypeORM to use TypeDI
//useContainer(Container);

// Create a new express application instance
const app: express.Application = express();
app.use(bodyParser.json());
/* const conection = createConnection()
  .then(() => {})
.catch((err) => console.log(err)); */
console.log("UM SAMBINHAAAAAAAAAAAAAAAAAAAAAAAAAAA")
//app.use(logger);
app.use(helmet());
app.use(cors());
app.use('/', routes);

app.post('/auth/login', Container.get(AuthController).login);

/* app.listen(process.env.PORT, function () {
  console.log('My Life Journal running on port: ' + process.env.PORT);
});
 */
/* export function closeConnection(): void {
  closeConnection
}; */


export default app;
