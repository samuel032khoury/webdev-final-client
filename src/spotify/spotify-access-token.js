import axios from "axios";
import qs from 'qs';

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

export const getAccessToken = async () => {
  try {
    const token_url = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({'grant_type':'client_credentials'});

    const response = await axios.post(token_url, data, {
      headers: { 
        'Authorization': 'Basic ' + client_id + ':' + client_secret,
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      auth: {
        username: client_id,
        password: client_secret,
      },
    })
    console.log(response.data.access_token);
    localStorage.setItem('token', response.data.access_token); // local storage/redux
    return response.data.access_token;
  } catch(error) {
    console.log(error);
  }
}
