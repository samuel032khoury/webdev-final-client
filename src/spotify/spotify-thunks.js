import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  findSongById,
  findSongBySearchTerm,
  getSpotifyAccessToken,
} from "./spotify-service";

export const getSpotifyAccessTokenThunk = createAsyncThunk(
  'getSpotifyAccessToken',
  () => getSpotifyAccessToken()
);

export const findSongBySearchTermThunk = createAsyncThunk(
  'findSongBySearchTerm',
  (params) => {
    return findSongBySearchTerm(params);
  }
);

export const findSongByIdThunk = createAsyncThunk(
  'findAlbumById',
  (params) => findSongById(params)
)
