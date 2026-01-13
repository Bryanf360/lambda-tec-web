import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    clients: [],
    isLoading: false,
};

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setClients: (state, action) => {
            state.clients = action.payload;
        },
        /*
        addProvider: (state, action) => {
            state.clients.unshift(action.payload);
        },
        updateProvider: (state, action) => {
            const index = state.clients.findIndex(
                (provider) => provider.id === action.payload.id
            );
            if (index !== -1) state.clients[index] = action.payload;
        },
        deleteProvider: (state, action) => {
            state.clients = state.clients.filter((provider) => provider.id !== action.payload);
        },
        */
    },
});

export const { setIsLoading, setClients /*addProvider, updateProvider, deleteProvider*/ } =
    clientsSlice.actions;

export default clientsSlice.reducer;
