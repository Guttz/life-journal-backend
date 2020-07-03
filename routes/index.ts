import { Router } from 'express';
import spotify from './spotify';

const routes = Router();

routes.use('/spotify', spotify);
export default routes;