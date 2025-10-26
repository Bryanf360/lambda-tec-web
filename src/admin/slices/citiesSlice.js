import { createSlice } from '@reduxjs/toolkit';

export const citiesSlice = createSlice({
    name: 'cities',
    initialState: {
        isLoading: true,
        cities: [],
    },
    reducers: {
        loadingCities: (state, { payload }) => {
            state.cities = payload;
            state.isLoading = false;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadingCities, setIsLoading } = citiesSlice.actions;

export default citiesSlice.reducer;
