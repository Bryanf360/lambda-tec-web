import { createSlice } from '@reduxjs/toolkit';

export const instancesSlice = createSlice({
    name: 'instances',
    initialState: {
        isLoading: true,
        instances: [],
    },
    reducers: {
        loadingInstances: (state, { payload }) => {
            state.brands = payload;
            state.isLoading = false;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadingInstances, setIsLoading } = instancesSlice.actions;

export default instancesSlice.reducer;
