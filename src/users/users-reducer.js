import {createSlice} from "@reduxjs/toolkit";
import {
    findAllUsersThunk,
    findUserByIdThunk,
    loginThunk,
    logoutThunk,
    profileThunk,
    registerThunk, updateUserThunk
} from "./users-thunk";

const usersReducer = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        currentUser: null,
        publicProfile: null,
        error: null
    },
    extraReducers: {
        [findUserByIdThunk.fulfilled]: (state, action) => {
            state.publicProfile = action.payload
        },
        [logoutThunk.fulfilled]: (state, action) => {
            state.currentUser = null
        },
        [profileThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [registerThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [loginThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [updateUserThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [findAllUsersThunk.fulfilled]: (state, action) => {
            state.users = action.payload
            state.loading = false
        }
    }
})

export default usersReducer.reducer