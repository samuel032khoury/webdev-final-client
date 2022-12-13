import {createSlice} from "@reduxjs/toolkit";
// import { updateReview } from "./reviews-service";
import {createReviewThunk, deleteReviewThunk, updateReviewThunk, findReviewsByAuthorThunk, findReviewsBySongThunk} from "./reviews-thunks";

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
        // [updateReviewThunk.fulfilled]: (state, action) => {
        //     state.reviews = state.reviews.filter(r => {
        //         if (r._id === action.payload) {
        //             console.log(r)
        //             // r.review = action.payload
        //         }
        //     })
        // },
        [updateReviewThunk.fulfilled]: (state, { payload }) => {
            
            console.log(payload)
            const reviewIdx = state.reviews.findIndex((r) => r._id === payload._id);
            state.reviews[reviewIdx] = {
              ...state.reviews[reviewIdx],
              ...payload,
            };
          },
        [deleteReviewThunk.fulfilled]: (state, action) => {
            // state.reviews = action.payload
            // console.log(action)
            state.reviews = state.reviews.filter(r => {
                return r._id !== action.payload
            })
        },
        [findReviewsByAuthorThunk.fulfilled]: (state, action) => {
            state.reviews = action.payload
        }
    }
})

export default reviewsReducer.reducer