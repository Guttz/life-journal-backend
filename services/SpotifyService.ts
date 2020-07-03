
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
    try {
      let response = await axios.request({
        method: 'get',
        url: 'https://api.spotify.com/v1/search',
        params: {
          q: query,
          type: 'track',
          market: 'BR',
          limit: 9,
        },
        headers: {'Authorization': this.OAUTH_TOKEN}
      });

      return response;
    } 
    // In case of response status 401, auth code expired, axios throw an error'
    catch (error) {
      this.fetchOAuthToken();
      const response = await axios.request({
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
      
      return response;
    } 

    
  }
}
// How to transform json to form encode
// console.log(qs.stringify({'grant_type': 'client_credentials', 'grant_type2': 'client_credentials2'}));