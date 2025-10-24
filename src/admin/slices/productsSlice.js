import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        selectedProduct: null,
        isLoading: true,
        products: [],
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        addProduct: (state, { payload }) => {
            state.isLoading = false;
            state.products.unshift(payload);
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSelectedProduct, addProduct, setIsLoading } = productsSlice.actions;

export default productsSlice.reducer;
