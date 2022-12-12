import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  findSongsForHomePage,
  findSongById,
  findSongBySearchTerm,
  getSpotifyAccessToken,
  findAlbumBySearchTerm
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
export const findAlbumBySearchTermThunk = createAsyncThunk(
  'findAlbumBySearchTermThunk',
  (params) => {
    return findAlbumBySearchTerm(params);
  }
);

export const findSongByIdThunk = createAsyncThunk(
  'findAlbumById',
  (params) => findSongById(params)
)

export const findSongsForHomePageThunk = createAsyncThunk(
  'findAlbumById',
  (params) => findSongsForHomePage(params)
)
