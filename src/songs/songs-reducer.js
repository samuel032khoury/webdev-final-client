import {createSlice} from "@reduxjs/toolkit";
import {createSongsThunk, findAllSongsThunk, findSongByIDThunk} from "./songs-thunks";

const songsReducer = createSlice({
    name: 'songs',
    initialState: {
        songs: [],
        song: []
    },
    extraReducers: {
        [findSongByIDThunk.fulfilled]: (state, action) => {
            state.song = action.payload
        },
        [findAllSongsThunk.fulfilled]: (state, action) => {
            state.songs = action.payload
        },
        [createSongsThunk.fulfilled]: (state, action) => {
            state.songs.push(action.payload)
        },
        
    }
})

export default songsReducer.reducer;