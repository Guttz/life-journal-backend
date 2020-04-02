require('dotenv').config();
import express = require('express');
import cors from 'cors';
import SpotifyService from './services/SpotifyService';
import SpotifyController from './controllers/SpotifyController';

const axios = require('axios').default;
// Create a new express application instance
const app: express.Application = express();
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/spotify-search', SpotifyController.searchTrackByTerm);

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT);
});