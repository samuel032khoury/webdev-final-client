import {createAsyncThunk} from "@reduxjs/toolkit";
import { userFavoritesSong, userUnfavoritesSong, findSongsFavoritedByUser } from "./favorites-service";

export const userFavoritesSongThunk = createAsyncThunk(
  'userFavoritesSong',
  async (favorite) => {
    return await userFavoritesSong(favorite.uid, favorite.sid);
  }
);

export const userUnfavoritesSongThunk = createAsyncThunk(
  'userUnfavoritesSong',
  async (favorite) => {
    return await userUnfavoritesSong(favorite.uid, favorite.sid);
  }
);

export const findSongsFavoritedByUserThunk = createAsyncThunk(
  'findSongsFavoritedByUser',
  async (uid) => {
    return await findSongsFavoritedByUser(uid);
  }
);
