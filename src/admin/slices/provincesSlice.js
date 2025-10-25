import { createSlice } from '@reduxjs/toolkit';

export const provincesSlice = createSlice({
    name: 'provinces',
    initialState: {
        isLoading: true,
        provinces: [],
    },
    reducers: {
        loadingProvinces: (state, { payload }) => {
            state.provinces = payload;
            state.isLoading = false;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadingProvinces, setIsLoading } = provincesSlice.actions;

export default provincesSlice.reducer;
