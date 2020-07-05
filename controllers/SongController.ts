import { Request, Response } from 'express';
import { Inject, Container } from 'typedi';
import SongService from './../services/SongService';

class SongController {
  private songService: SongService = new SongService();
  
  constructor () {
  }

  insertSong = async (req: Request, res: Response) => {
    try {
      let newSong: any = new Object(JSON.parse(req.body.song));
      // Encoding artists array
      newSong['artists'] =  JSON.stringify(newSong.artists);
      const result = await this.songService.insertSong(newSong);
      res.send(result);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  fetchSongs = async (req: Request, res: Response) => {
    try {
      const result = await this.songService.fetchSongs();
      // Decoding artists array
      const fetchedSongs = result.map(song => {
        song.artists = JSON.parse(song.artists);
        return song;
      })
      res.send(fetchedSongs);
    } catch (error) {
      throw error;
      res.sendStatus(500);
    }
  }

}

export default Container.get(SongController);