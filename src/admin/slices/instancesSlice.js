import { createSlice } from '@reduxjs/toolkit';

export const instancesSlice = createSlice({
    name: 'instances',
    initialState: {
        isLoading: true,
        instances: [],
        meta: {
            page: 1,
            limit: 5,
            total: 0,
        },
    },
    reducers: {
        setInstances: (state, { payload }) => {
            state.instances = payload.data;
            state.meta = payload.meta;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setInstances, setIsLoading } = instancesSlice.actions;

export default instancesSlice.reducer;
