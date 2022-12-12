import axios from "axios";
import qs from 'qs';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search'
const TRACK_ENDPOINT = 'https://api.spotify.com/v1/tracks'
const RECOMMENDATIONS_ENDPOINT = 'https://api.spotify.com/v1/recommendations'



export const getSpotifyAccessToken = async () => {
  try {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({'grant_type':'client_credentials'});
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

// Search page API for track
export const findSongBySearchTerm = async (params) => {
    try {
      const response = await axios.get(`${SEARCH_ENDPOINT}?q=${params.searchTerm}&type=track`, {
        headers: { 
          'Authorization': `Bearer ${params.token}`
        },
      })
      // console.log("LOG:", response.data.tracks.items);
      return response.data.tracks.items;
    } catch(error) {
      console.log(error);
    }
}
// Search page API for album
export const findAlbumBySearchTerm = async (params) => {
    try {
      const response = await axios.get(`${SEARCH_ENDPOINT}?q=${params.searchTerm}&type=album`, {
        headers: {
          'Authorization': `Bearer ${params.token}`
        },
      })
      // console.log("LOG:", response.data.albums.items);
      return response.data.albums.items;
    } catch(error) {
      console.log(error);
    }
}

// Find detail of a song (useless right now)
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

// Find songs for homepage
export const findSongsForHomePage = async (params) => {
  try {
    const q = getRandomSearch()
    const response = await axios.get(`${SEARCH_ENDPOINT}?q=${q}&type=track`, {
      headers: { 
        'Authorization': `Bearer ${params.token}`
      },
    })

    return response.data.tracks.items;
  } catch(error) {
    console.log(error);
  }
}

function getRandomSearch() {
  // A list of all characters that can be chosen.
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  
  // Gets a random character from the characters string.
  const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
  let randomSearch = '';

  // Places the wildcard character at the beginning, or both beginning and end, randomly.
  switch (Math.round(Math.random())) {
    case 0:
      randomSearch = randomCharacter + '%';
      break;
    case 1:
      randomSearch = '%' + randomCharacter + '%';
      break;
  }

  return encodeURIComponent(randomSearch);
}