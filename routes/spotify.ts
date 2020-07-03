import { Router } from 'express';
import SpotifyController from './../controllers/SpotifyController';

const router = Router();

router.get('/h', function (req, res) {
  res.send('Hello World!');
});

router.get('/spotify-search', SpotifyController.searchTrackByTerm);

export default router;