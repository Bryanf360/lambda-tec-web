import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    providers: [],
    isLoading: false,
};

const providersSlice = createSlice({
    name: 'providers',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setProviders: (state, action) => {
            state.providers = action.payload;
        },
        addProvider: (state, action) => {
            state.providers.unshift(action.payload);
        },
        updateProvider: (state, action) => {
            const index = state.providers.findIndex(
                (provider) => provider.id === action.payload.id
            );
            if (index !== -1) state.providers[index] = action.payload;
        },
        deleteProvider: (state, action) => {
            state.providers = state.providers.filter((provider) => provider.id !== action.payload);
        },
    },
});

export const { setIsLoading, setProviders, addProvider, updateProvider, deleteProvider } =
    providersSlice.actions;

export default providersSlice.reducer;
