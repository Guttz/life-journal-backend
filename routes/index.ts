import { Router } from 'express';
import spotify from './spotify';
import auth from './auth';

const routes = Router();

routes.use('/spotify', spotify);
routes.use('/auth', auth);

export default routes;