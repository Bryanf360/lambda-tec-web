import { createSlice } from '@reduxjs/toolkit'

export const partNumbersSlice = createSlice({
    name: 'partNumbers',
    initialState: {
        isLoading: true,
        partNumbers: [],
    },
    reducers: {
        loadingPartNumbers: (state, { payload } ) => {
            state.partNumbers = payload;
            state.isLoading = false;
        },
    }
})

// Action creators are generated for each case reducer function
export const { loadingPartNumbers } = partNumbersSlice.actions

export default partNumbersSlice.reducer