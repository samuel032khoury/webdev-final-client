import {createAsyncThunk} from "@reduxjs/toolkit";

import {
  createReview,
  deleteReview,
  updateReview,
  findReviewsBySong,
  findLatestReviews,
  findAllReviews
} from "./reviews-service";

export const createReviewThunk = createAsyncThunk(
    'createReview',
    async (params) => createReview(params)
)

export const findReviewsBySongThunk = createAsyncThunk(
    'findReviewsBySongThunk',
    async (songID) => findReviewsBySong(songID)
)

export const deleteReviewThunk = createAsyncThunk(
    'deleteReviewThunk',
    async (reviewID) => deleteReview(reviewID)
)

export const updateReviewThunk = createAsyncThunk(
    'updateReviewThunk',
    async (params) => updateReview(params)
)

export const findLatestReviewsThunk = createAsyncThunk(
    "findLatestReviewsThunk",
    async () => findLatestReviews()
)
export const findAllReviewsThunk = createAsyncThunk(
    "findAllReviewsThunk",
    async () => findAllReviews()
)

