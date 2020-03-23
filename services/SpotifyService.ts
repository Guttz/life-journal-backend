
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
    let response = await axios.request({
      method: 'get',
      url: 'https://api.spotify.com/v1/search',
      params: {
        q: query,
        type: 'track',
        market: 'BR',
        limit: 2,
      },
      headers: {'Authorization': this.OAUTH_TOKEN}
    }); 
    
    // If token is outdated, renew and request data again
    if(response.status != 200){
      this.fetchOAuthToken();
      response = await axios.request({
        method: 'get',
        url: 'https://api.spotify.com/v1/search',
        params: {
          q: query,
          type: 'track',
          market: 'BR',
          limit: 2,
        },
        headers: {'Authorization': this.OAUTH_TOKEN}
      });
    }

    return response;
  }
}

// How to transform json to form encode
// console.log(qs.stringify({'grant_type': 'client_credentials', 'grant_type2': 'client_credentials2'}));