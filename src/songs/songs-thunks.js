import {createAsyncThunk} from "@reduxjs/toolkit";
import {findSongByID, createSong, findAllSongs} from "./songs-service";

export const createSongsThunk = createAsyncThunk(
    'createSong',
    (params) => createSong(params)
)

export const findSongByIDThunk = createAsyncThunk(
    'findSongByID',
    (params) => findSongByID(params)
)

export const findAllSongsThunk = createAsyncThunk(
    'findAllSongs',
    () => findAllSongs()
)

