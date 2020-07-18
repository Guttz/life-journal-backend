import { Request, Response } from 'express';
import { Inject, Container } from 'typedi';
import SpotifyService from './../services/SpotifyService';

class SpotifyController {
  @Inject()
  private spotifyService: SpotifyService = Container.get(SpotifyService);

  searchTrackByTerm = async (req: Request, res: Response) => {
    try {
      const result = await this.spotifyService.searchTrack(req.body.queryTerm);
      if (result.status === 200) {
        res.send(result.data);
      }
      if (result.status === 401) {
        const response = await this.spotifyService.fetchOAuthToken();
        this.spotifyService.setOAuthToken(response.data.token_type + ' ' + response.data.access_token);
        const result = await this.spotifyService.searchTrack(req.body.queryTerm);
        res.send(result.data);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };
}

export default Container.get(SpotifyController);
