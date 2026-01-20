import { createSlice } from '@reduxjs/toolkit';

export const movementsSlice = createSlice({
    name: 'movements',
    initialState: {
        isLoading: true,
        movements: [],
        meta: {
            page: 1,
            limit: 5,
            total: 0,
        },
    },
    reducers: {
        setMovements: (state, { payload }) => {
            state.movements = payload.data;
            state.meta = payload.meta;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setMovements, setIsLoading } = movementsSlice.actions;

export default movementsSlice.reducer;
