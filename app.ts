require('dotenv').config();
import express = require('express');
import cors from 'cors';
import { createConnection } from 'typeorm';
import SpotifyService from './services/SpotifyService';
import SpotifyController from './controllers/SpotifyController';

const axios = require('axios').default;

import {Photo} from "./db/entity/Photo";

createConnection().then(async connection => {
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


  let photo = new Photo();
  photo.name = "Me and Bears";
  photo.description = "I am near polar bears";
  photo.filename = "photo-with-bears.jpg";
  photo.views = 1;
  photo.isPublished = true;

  let photoRepository = connection.getRepository(Photo);

  await photoRepository.save(photo);
  console.log("Photo has been saved");

  let savedPhotos = await photoRepository.find();
  console.log("All photos from the db: ", savedPhotos);

}).catch(err => console.log(err))

