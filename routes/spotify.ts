import { Router } from 'express';
import SpotifyController from './../controllers/SpotifyController';
import JwtMiddleware from '../utils/JwtMiddleware';

const router = Router();

router.get('/spotify-search', [JwtMiddleware.checkJwt], SpotifyController.searchTrackByTerm);

export default router;