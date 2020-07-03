require('dotenv').config();
import express = require('express');
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { createConnection } from 'typeorm';

import routes from './routes';
import logger from './utils/logger';

//temporary
import SpotifyService from './services/SpotifyService';
import SpotifyController from './controllers/SpotifyController';

//temporary
import {Photo} from "./db/entity/Photo";

createConnection().then(async connection => {
  // Create a new express application instance
  const app: express.Application = express();
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(cors());
  app.use(logger);
  app.use('/', routes);

  app.listen(process.env.PORT, function () {
    console.log('My Life Journal running on port: ' + process.env.PORT);
  });


/*   let photo = new Photo();
  photo.name = "Me and Bears";
  photo.description = "I am near polar bears";
  photo.filename = "photo-with-bears.jpg";
  photo.views = 1;
  photo.isPublished = true;

  let photoRepository = connection.getRepository(Photo);

  //await photoRepository.save(photo);
  //console.log("Photo has been saved");

  //let savedPhotos = await photoRepository.find();
  //console.log("All photos from the db: ", savedPhotos); */

}).catch(err => console.log(err))

