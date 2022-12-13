import {createSlice} from "@reduxjs/toolkit";
import {
  findSongsForHomePageThunk,
  findSongByIdThunk,
  getSpotifyAccessTokenThunk,
  findSongBySearchTermThunk,
  findAlbumBySearchTermThunk
} from "./spotify-thunks";
const initialState = {
  token: localStorage.getItem('token') || '',
  songs: [],
  // useless right now
  song: [],
  // songs for home page
  recommendations: [],
  loading: false,
  details: {}
};

const spotifyReducer = createSlice({
  name: 'spotify',
  initialState,
  extraReducers: {
    [getSpotifyAccessTokenThunk.fulfilled]: (state, action) => {
      state.token = action.payload;
    },
    [findSongBySearchTermThunk.fulfilled]: (state, action) => {
      state.songs = action.payload;
    },
    [findSongByIdThunk.fulfilled]: (state, action) => {
      state.song = action.payload
    },
    [findAlbumBySearchTermThunk.fulfilled]: (state, action) => {
      state.songs = action.payload
    },
    [findSongsForHomePageThunk.fulfilled]: (state, action) => {
      state.recommendations = action.payload
    },
  }
});

export default spotifyReducer.reducer;
