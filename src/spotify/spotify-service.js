import axios from "axios";
import qs from 'qs';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search'
const TRACK_ENDPOINT = 'https://api.spotify.com/v1/tracks'



export const getSpotifyAccessToken = async () => {
  try {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({'grant_type':'client_credentials'});
    console.log(CLIENT_ID)
    const response = await axios.post(tokenUrl, data, {
      headers: { 
        'Authorization': `Basic ${CLIENT_ID}:${CLIENT_SECRET}`,
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    });

    localStorage.setItem('token', response.data.access_token);
    return response.data.access_token;
  } catch(error) {
    console.log(error);
  }
}

export const findSongBySearchTerm = async (params) => {
    try {
      const response = await axios.get(`${SEARCH_ENDPOINT}?q=${params.searchTerm}&type=track`, {
        headers: { 
          'Authorization': `Bearer ${params.token}`
        },
      })

      return response.data.tracks.items;
    } catch(error) {
      console.log(error);
    }
}

export const findSongById = async (params) => {
  try {
    const response = await axios.get(`${TRACK_ENDPOINT}/${params.songID}`, {
      headers: { 
        'Authorization': `Bearer ${params.token}`
      },
    })

    return response.data;
  } catch(error) {
    console.log(error);
  }
}
