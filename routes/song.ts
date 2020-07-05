import { Router } from 'express';
import SongController from './../controllers/SongController';
import JwtMiddleware from '../utils/JwtMiddleware';

const router = Router();

router.post('/insertSong', [JwtMiddleware.checkJwt], SongController.insertSong);
router.post('/fetchSongs', [JwtMiddleware.checkJwt], SongController.fetchSongs);

export default router;