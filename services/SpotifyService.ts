import axios, { AxiosResponse } from 'axios';

export default class SpotifyService {
  private OAUTH_TOKEN = '';

  async fetchOAuthToken(): Promise<AxiosResponse> {
    return axios.request({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: 'grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + process.env.SPOTIFY_AUTHORIZATION_KEYS,
      },
    });
  }

  setOAuthToken(token: string): void {
    this.OAUTH_TOKEN = token;
  }

  async searchTrack(query: string): Promise<AxiosResponse> {
    if (this.OAUTH_TOKEN === '') {
      const response = await this.fetchOAuthToken();
      this.setOAuthToken(response.data.token_type + ' ' + response.data.access_token);
    }
    const response = axios.request({
      method: 'get',
      url: 'https://api.spotify.com/v1/search',
      params: {
        q: query,
        type: 'track',
        market: 'BR',
        limit: 9,
      },
      headers: { Authorization: this.OAUTH_TOKEN },
    });

    return response;
  }
}