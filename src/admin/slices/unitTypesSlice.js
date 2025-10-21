import { createSlice } from '@reduxjs/toolkit'

export const unitTypesSlice = createSlice({
    name: 'unitTypes',
    initialState: {
        isLoading: true,
        unitTypes: [],
    },
    reducers: {
        loadingUnitTypes: (state, { payload } ) => {
            state.unitTypes = payload;
            state.isLoading = false;
        },
    }
})

// Action creators are generated for each case reducer function
export const { loadingUnitTypes } = unitTypesSlice.actions

export default unitTypesSlice.reducer