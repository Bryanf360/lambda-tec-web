import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        isDeleting: false,
        meta: {
            page: 1,
            limit: 5,
            total: 0,
        },
        products: [],
    },
    reducers: {
        setProducts: (state, { payload }) => {
            state.products = payload.data;
            state.meta = payload.meta;
        },
        addProduct: (state, { payload }) => {
            state.products.unshift(payload);
            state.meta.total += 1;
        },
        updateProduct: (state, { payload }) => {
            const index = state.products.findIndex((client) => client.id === payload.id);
            if (index !== -1) state.products[index] = payload;
        },
        deleteProduct: (state, { payload }) => {
            state.products = state.products.filter((product) => product.id !== payload);
            state.meta.total -= 1;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setIsDeleting: (state, { payload }) => {
            state.isDeleting = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    setIsLoading,
    setIsDeleting,
} = productsSlice.actions;

export default productsSlice.reducer;
