import {createSlice} from "@reduxjs/toolkit";
import { userFavoritesSongThunk, userUnfavoritesSongThunk, findSongsFavoritedByUserThunk, findAllFavoritesThunk } from "./favorites-thunks";

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
      state.favorites = state.favorites.filter(f => f.song !== action.meta.sid);
      console.log('UNFACROTIE FULFILLED:', action);
    },
    [findSongsFavoritedByUserThunk.fulfilled]: (state, action) => {
      state.userFavorites = action.payload;
    },
    [findAllFavoritesThunk.fulfilled]: (state, action) => {
      state.favorites = action.payload;
    }
  }
});

export default favoritesReducer.reducer;