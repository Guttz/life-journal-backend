import { Router } from 'express';
import SpotifyController from './../controllers/SpotifyController';
import JwtMiddleware from '../utils/JwtMiddleware';

const router = Router();

router.post('/spotify-search', [JwtMiddleware.checkJwt], SpotifyController.searchTrackByTerm);

export default router;