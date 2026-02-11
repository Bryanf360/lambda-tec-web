import { createSlice } from '@reduxjs/toolkit';

export const warehousesSlice = createSlice({
    name: 'warehouses',
    initialState: {
        isLoading: true,
        warehouses: [],
    },
    reducers: {
        loadingWarehouses: (state, { payload }) => {
            state.warehouses = payload;
            state.isLoading = false;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadingWarehouses, setIsLoading } = warehousesSlice.actions;

export default warehousesSlice.reducer;
