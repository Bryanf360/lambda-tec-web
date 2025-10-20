import { createSlice } from '@reduxjs/toolkit'

export const modelsSlice = createSlice({
    name: 'models',
    initialState: {
        isLoading: true,
        models: [],
    },
    reducers: {
        loadingModels: (state, { payload } ) => {
            state.models = payload;
            state.isLoading = false;
        },
    }
})

// Action creators are generated for each case reducer function
export const { loadingModels } = modelsSlice.actions

export default modelsSlice.reducer