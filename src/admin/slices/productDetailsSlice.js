import { createSlice } from '@reduxjs/toolkit';

export const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: {
        isLoading: false,
        meta: {
            page: 1,
            limit: 5,
            total: 0,
        },
        instances: [],
    },
    reducers: {
        setProductDetails: (state, { payload }) => {
            state.instances = payload.data;
            state.meta = payload.meta;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setProductDetails, setIsLoading } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
