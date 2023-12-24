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
        UpdateUserStart: (state) => {
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
        }
    }
});

export const { signInStart, signInSuccess, signInFailure, UpdateUserStart, updateUserSuccess, updateUserFailure } = userSlice.actions;

export default userSlice.reducer;