import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    loading: false,
    error:false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart:(state) =>{
            state.loading = true;
        },
        signInSuccess:(state, action)=>{
            state.currentUser = action.payload;
            state.loading=false;
            state.error=false;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading=false;
            state.error=false;
        },
        updateUserFailure: (state, action) => {
            state.loading=false;
            state.error=action.payloadload;
        },

        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading=false;
            state.error=false;
        },
        deleteUserFailure: (state, action) => {
            state.loading=false;
            state.error=action.payloadload;
        }
    }
});

export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } = userSlice.actions;

export default userSlice.reducer;