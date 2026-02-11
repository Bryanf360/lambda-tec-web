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
        addUnitType: (state, { payload }) => {
            state.isLoading = false;
            state.unitTypes.unshift(payload);
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { loadingUnitTypes, addUnitType, setIsLoading } = unitTypesSlice.actions

export default unitTypesSlice.reducer