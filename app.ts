import express = require('express');
const axios = require('axios').default;
// Create a new express application instance
const app: express.Application = express();

// How to transform json to form encode
//console.log(qs.stringify({'grant_type': 'client_credentials', 'grant_type2': 'client_credentials2'}));

let OAUTH_TOKEN = '';

const fetchOAuthToken = () => {
  axios.request({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: 'grant_type=client_credentials',
    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic MjFkYmU1M2NiYWJlNGYwM2IyYWQzMDkwMzQyYTdiYmM6NGRmMTk0MjJhMzgwNGJlM2I5OGNkZWQzNTI0ZjdiMjM='}
  }).then((response: any) => {
    console.log(response.data)
    OAUTH_TOKEN = response.data.token_type  + ' ' + response.data.access_token;
    // `response` is of type `AxiosResponse<ServerData>`
    //const { data } = response
    // `data` is of type ServerData, correctly inferred
  }).catch( (error: any) => {console.log(error)} )
}

fetchOAuthToken();
 
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/spotify-search', function (req, res) {
  
  axios.request({
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    params: {
      q: req.query.query,
      type: 'track',
      market: 'BR',
      limit: 2,
    },
    headers: {'Authorization': OAUTH_TOKEN}
  }).then((response: any) => {
    res.send(response.data);
    console.log(response.data)
    // `response` is of type `AxiosResponse<ServerData>`
    //const { data } = response
    // `data` is of type ServerData, correctly inferred
  }).catch( (error: any) => {
    // If the OAUTH Token expired, retrieve it again and repeate operation
    if(error.response.status != 200) { 
      fetchOAuthToken();
      axios.request({
        method: 'get',
        url: 'https://api.spotify.com/v1/search',
        params: {
          q: req.query.query,
          type: 'track',
          market: 'BR',
          limit: 2,
        },
        headers: {'Authorization': OAUTH_TOKEN}
      }).then((response: any) => {
        res.send(response.data);
      })
    }
    res.send(error);
    console.log(error)}  
  )
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});