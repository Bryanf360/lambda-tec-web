import { createSlice } from '@reduxjs/toolkit';

export const modelsSlice = createSlice({
    name: 'models',
    initialState: {
        isLoading: true,
        models: [],
        selectedModel: null,
    },
    reducers: {
        loadingModels: (state, { payload }) => {
            state.models = payload;
            state.isLoading = false;
        },
        addModel: (state, { payload }) => {
            state.isLoading = false;
            state.models.push(payload);
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onSetSelectedModel: (state, { payload }) => {
            state.selectedModel = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadingModels, addModel, setIsLoading, onSetSelectedModel } = modelsSlice.actions;

export default modelsSlice.reducer;
