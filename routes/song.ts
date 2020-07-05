import { Router } from 'express';
import SongController from './../controllers/SongController';
import JwtMiddleware from '../utils/JwtMiddleware';

const router = Router();

router.post('/fetchSongs', [JwtMiddleware.checkJwt], SongController.fetchSongs);
router.post('/insertSong', [JwtMiddleware.checkJwt], SongController.insertSong);
router.post('/updateSong', [JwtMiddleware.checkJwt], SongController.updateSong);

export default router;