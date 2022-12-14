import {createSlice} from "@reduxjs/toolkit";
import {createReviewThunk, deleteReviewThunk, updateReviewThunk, findReviewsBySongThunk, findReviewsThunk} from "./reviews-thunks";

const reviewsReducer = createSlice({
    name: 'reviews',
    initialState: {
        reviews: []
    },
    extraReducers: {
        [createReviewThunk.fulfilled]: (state, action) => {
            state.reviews.push(action.payload)
        },
        [findReviewsBySongThunk.fulfilled]: (state, action) => {
            state.reviews = action.payload
        },
        [updateReviewThunk.fulfilled]: (state, { payload }) => {
            const reviewIdx = state.reviews.findIndex((r) => r._id === payload._id);
            state.reviews[reviewIdx] = {
              ...state.reviews[reviewIdx],
              ...payload,
            };
          },
        [deleteReviewThunk.fulfilled]: (state, action) => {
            state.reviews = state.reviews.filter(r => {
                return r._id !== action.payload
            })
        },
        [findReviewsThunk.fulfilled]: (state, action) => {
            state.reviews = action.payload
        },
    }
})

export default reviewsReducer.reducer