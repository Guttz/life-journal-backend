
const axios = require('axios').default;

export default class SpotifyService {
  private OAUTH_TOKEN = '';

  fetchOAuthToken = (): void => {
    axios.request({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: 'grant_type=client_credentials',
      headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + process.env.SPOTIFY_AUTHORIZATION_KEYS}
    }).then((response: any) => {
      this.OAUTH_TOKEN = response.data.token_type  + ' ' + response.data.access_token;
    }).catch( (error: any) => {console.log(error)} )
  }

  async searchTrack(query: string) {
    if (!process.env.SPOTIFY_OAUTH_TOKEN) {
    }
    
    axios.request({
      method: 'get',
      url: 'https://api.spotify.com/v1/search',
      params: {
        q: query,
        type: 'track',
        market: 'BR',
        limit: 2,
      },
      headers: {'Authorization': process.env.SPOTIFY_OAUTH_TOKEN}
    }).then((response: any) => {
      return response;
    }).catch( (error: any) => {
      if(error.response.status != 200) { 
        this.fetchOAuthToken();
        axios.request({
          method: 'get',
          url: 'https://api.spotify.com/v1/search',
          params: {
            q: query,
            type: 'track',
            market: 'BR',
            limit: 2,
          },
          headers: {'Authorization': process.env.SPOTIFY_OAUTH_TOKEN}
        }).then((response: any) => {
        })
      }
      console.log(error)
    })  
  }
}