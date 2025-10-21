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
        addBrand: (state, { payload }) => {
            state.isLoading = false;
            state.brands.push(payload);
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { loadingBrands, addBrand, setIsLoading } = brandsSlice.actions

export default brandsSlice.reducer