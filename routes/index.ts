import { Router } from 'express';
import spotify from './spotify';
import auth from './auth';
import song from './song';

const routes = Router();

routes.use('/auth', auth);
routes.use('/spotify', spotify);
routes.use('/song', song);

export default routes;