import app from './app-server';
import { createConnection } from 'typeorm';

//Starting database and listening
createConnection().then(() => {
  console.log('Connected to database!');
  app.listen(process.env.PORT, function () {
    console.log('My Life Journal running on port: ' + process.env.PORT);
  });
});
