import {createAsyncThunk} from "@reduxjs/toolkit";
import { findSongBySearchTerm, getSpotifyAccessToken } from "./spotify-service";

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
