import { createSlice } from '@reduxjs/toolkit';

export const reasonsSlice = createSlice({
    name: 'reasons',
    initialState: {
        isLoading: true,
        reasons: [],
    },
    reducers: {
        loadingReasons: (state, { payload }) => {
            state.reasons = payload;
            state.isLoading = false;
        },
        addReason: (state, { payload }) => {
            state.isLoading = false;
            state.reasons.push(payload);
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadingReasons, addReason, setIsLoading } = reasonsSlice.actions;

export default reasonsSlice.reducer;
