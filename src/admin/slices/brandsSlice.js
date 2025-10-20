import { createSlice } from '@reduxjs/toolkit'

export const brandsSlice = createSlice({
    name: 'brands',
    initialState: {
        isLoading: true,
        brands: [],
    },
    reducers: {
        loadingBrands: (state, { payload } ) => {
            state.brands = payload;
            state.isLoading = false;
        },
    }
})

// Action creators are generated for each case reducer function
export const { loadingBrands } = brandsSlice.actions

export default brandsSlice.reducer