import {createSlice} from "@reduxjs/toolkit";
import { findSongByIdThunk, getSpotifyAccessTokenThunk, findSongBySearchTermThunk } from "./spotify-thunks";
const initialState = {
  token: localStorage.getItem('token') || '',
  songs: [],
  song: [],
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
  }
});

export default spotifyReducer.reducer;
