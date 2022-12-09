import {createAsyncThunk} from "@reduxjs/toolkit";
import { getSpotifyAccessToken, findSongById, findMovieByImdbId, findMovieBySearchTerm} from "./omdb-service";

export const findSongByIdThunk = createAsyncThunk(
    'findAlbumById',
    (params) => findSongById(params)
)

export const getSpotifyAccessTokenThunk = createAsyncThunk(
    'getSpotifyAccessToken',
    () => getSpotifyAccessToken()
  );










export const findMovieBySearchTermThunk = createAsyncThunk(
    'findMovieBySearchTerm',
    (term) => findMovieBySearchTerm(term)
)
export const findMovieByImdbIdThunk = createAsyncThunk(
    'findMovieByImdbId',
    (imdbID) => findMovieByImdbId(imdbID)
)