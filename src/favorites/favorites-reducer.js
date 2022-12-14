import {createSlice} from "@reduxjs/toolkit";
import { userFavoritesSongThunk, userUnfavoritesSongThunk, findSongsFavoritedByUserThunk } from "./favorites-thunks";

const initialState = {
  favorites: [],
  userFavorites: [],
  loading: false,
};

export const favoritesReducer = createSlice({
  name: 'favorites',
  initialState,
  extraReducers: {
    [userFavoritesSongThunk.fulfilled]: (state, action) => {
      state.favorites.push(action.payload)
    },
    [userUnfavoritesSongThunk.fulfilled]: (state, action) => {
      // TODO:
    },
    [findSongsFavoritedByUserThunk.fulfilled]: (state, action) => {
      state.userFavorites = action.payload;
    }
  }
});

export default favoritesReducer.reducer;