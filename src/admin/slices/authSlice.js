import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token');

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // isLoading: false,
        // status: token ? 'checking' : 'not-authenticated',
        status: 'checking',
        user: undefined,
        errorMessage: undefined,
    },
    reducers: {
        checking: (state, /* action */ ) => {
            state.status = 'checking';
            state.user = undefined;
            state.errorMessage = undefined
        },
        login: (state, action) => {
            state.status = 'authenticated',
            state.user = action.payload,
            state.errorMessage = undefined
        },
        logout: (state, action) => {
            state.status = 'no-authenticated',
            state.user = undefined,
            // state.errorMessage = action.payload
            state.errorMessage = undefined
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
        // setIsLoading: (state, action) => {
        //     state.isLoading = action.payload
        // }
    }
})

// Action creators are generated for each case reducer function
export const { login, logout, clearErrorMessage, checking } = authSlice.actions

export default authSlice.reducer