require('dotenv').config();
import express = require('express');
import SpotifyService from './services/SpotifyService';

const axios = require('axios').default;
// Create a new express application instance
const app: express.Application = express();

const spotifyService: SpotifyService = new SpotifyService();
spotifyService.fetchOAuthToken();
 
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/spotify-search', async function (req, res) {
  try {
    const result = await spotifyService.searchTrack(req.query.queryTerm);
    res.send(result.data)
  } catch (error) {
    res.sendStatus(500);
  }
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});