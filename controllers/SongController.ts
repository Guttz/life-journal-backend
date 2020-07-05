import { Request, Response } from 'express';
import { Inject, Container } from 'typedi';
import SongService from './../services/SongService';

class SongController {
  private songService: SongService = new SongService();
  
  constructor () {
  }

  insertSong = async (req: Request, res: Response) => {
    try {
      const result = await this.songService.insertSong(JSON.parse(req.body.song));
      res.send(result);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  fetchSongs = async (req: Request, res: Response) => {
    try {
      const result = await this.songService.fetchSongs();
      res.send(result);
    } catch (error) {
      res.sendStatus(500);
    }
  }

}

export default Container.get(SongController);