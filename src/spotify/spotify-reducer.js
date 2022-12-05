import {createSlice} from "@reduxjs/toolkit";
import { getSpotifyAccessTokenThunk, findSongBySearchTermThunk } from "./spotify-thunks";
const initialState = {
  token: localStorage.getItem('token') || '',
  songs: [],
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
    }
  }
});

export default spotifyReducer.reducer;
