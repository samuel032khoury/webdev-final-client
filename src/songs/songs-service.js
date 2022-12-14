import axios from "axios";
const SONGS_API = 'http://localhost:4000/api/songs'

export const createSong = async (params) => {
    try {
        const response = await axios({
          method: "post",
          url: SONGS_API,
          withCredentials: true,
          data: params
        });
        return response.data;
      } catch (error) {
        return error;
      }
}
export const findSongByID = async (params) => {
    const response = await axios.get(`${SONGS_API}/${params.songID}`)
    return response.data
}


export const findAllSongs = async () => {
    const response = await axios.get(`${SONGS_API}`)
    return response.data
}

