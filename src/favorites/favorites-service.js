import axios from "axios";

const USERS_URL = 'http://localhost:4000/users';
const FAVORITES_URL = 'http://localhost:4000/favorites';

export const userFavoritesSong = async (uid, sid) => {
  const response = await axios.post(`${USERS_URL}/${uid}/favorites/${sid}`);
  console.log('favorite song response:')
  return response.data;
};

export const userUnfavoritesSong = async (uid, sid) => {
  const response = await axios.delete(`${USERS_URL}/${uid}/favorites/${sid}`);
  return response.data;
};

export const findSongsFavoritedByUser = async (uid) => {
  const response = await axios.get(`${USERS_URL}/${uid}/favorites`);
  return response.data;
};

export const findAllFavorites = async () => {
  const response = await axios.get(FAVORITES_URL);
  return response.data;
}
