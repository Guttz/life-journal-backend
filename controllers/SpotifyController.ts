import { Request, Response } from 'express';
import { Inject, Container } from 'typedi';
import SpotifyService from './../services/SpotifyService';

class SpotifyController {
  @Inject()
  private spotifyService: SpotifyService = Container.get(SpotifyService);
  
  constructor () {
    this.spotifyService.fetchOAuthToken();
  }

  searchTrackByTerm = async (req: Request, res: Response) => {
    try {
      console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
      const result = await this.spotifyService.searchTrack(req.body.queryTerm);
      res.send(result.data);
    } catch (error) {
      res.sendStatus(500);
    }
  }
}

export default Container.get(SpotifyController);