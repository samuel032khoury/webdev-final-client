import {createSlice} from "@reduxjs/toolkit";
import { getSpotifyAccessTokenThunk, findSongByIdThunk, findMovieByImdbIdThunk, findMovieBySearchTermThunk} from "./omdb-thunks";

const initialState = {
    token: localStorage.getItem('token') || '',
    song: [],
    movies: [],
    loading: false,
    details: {}
}

const omdbReducer = createSlice({
    name: 'omdb',
    initialState,
    extraReducers: {
        [findMovieBySearchTermThunk.fulfilled]: (state, action) => {
            state.movies = action.payload
        },
        [findMovieByImdbIdThunk.fulfilled]: (state, action) => {
            state.details = action.payload
        },
        [findSongByIdThunk.fulfilled]: (state, action) => {
            state.song = action.payload
        },
        [getSpotifyAccessTokenThunk.fulfilled]: (state, action) => {
            state.token = action.payload;
          },

    }
})

export default omdbReducer.reducer