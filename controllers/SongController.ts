import { Request, Response } from 'express';
import { Inject, Container } from 'typedi';
import SongService from './../services/SongService';

import { Song } from '../db/entity/Song';

class SongController {
  @Inject()
  private songService: SongService = Container.get(SongService);

  fetchSongs = async (req: Request, res: Response) => {
    const result = await this.songService.fetchSongs();
    // Decoding artists array
    const fetchedSongs = result.map((song: Song) => {
      song.artists = JSON.parse(song.artists);
      return song;
    });
    res.send(fetchedSongs);
  };

  insertSong = async (req: Request, res: Response) => {
    const newSong: Song = new Song(JSON.parse(req.body.song));
    // Encoding artists array
    newSong['artists'] = JSON.stringify(newSong.artists);
    const savedSong = await this.songService.insertSong(newSong);
    res.send(savedSong);
  };

  updateSong = async (req: Request, res: Response) => {
    const newSong: Song = JSON.parse(req.body.song);
    // Encoding artists array
    newSong['artists'] = JSON.stringify(newSong.artists);
    const result = await this.songService.updateSong(newSong);
    res.send(result);
  };
}

export default Container.get(SongController);
