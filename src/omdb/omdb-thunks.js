import {createAsyncThunk} from "@reduxjs/toolkit";
import { getSpotifyAccessToken, findAlbumById, findMovieByImdbId, findMovieBySearchTerm} from "./omdb-service";

export const findAlbumByIdThunk = createAsyncThunk(
    'findAlbumById',
    (params) => findAlbumById(params)
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