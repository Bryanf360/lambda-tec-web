import { createSlice } from '@reduxjs/toolkit';

export const partNumbersSlice = createSlice({
    name: 'partNumbers',
    initialState: {
        isLoading: true,
        partNumbers: [],
    },
    reducers: {
        loadingPartNumbers: (state, { payload }) => {
            state.partNumbers = payload;
            state.isLoading = false;
        },
        addPartNumber: (state, { payload }) => {
            state.isLoading = false;
            state.partNumbers.unshift(payload);
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadingPartNumbers, addPartNumber, setIsLoading } = partNumbersSlice.actions;

export default partNumbersSlice.reducer;
