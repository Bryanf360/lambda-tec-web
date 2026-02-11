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
        addClient: (state, action) => {
            state.clients.unshift(action.payload);
        },
        updateClient: (state, action) => {
            const index = state.clients.findIndex((client) => client.id === action.payload.id);
            if (index !== -1) state.clients[index] = action.payload;
        },
        /*
        deleteProvider: (state, action) => {
            state.clients = state.clients.filter((provider) => provider.id !== action.payload);
        },
        */
    },
});

export const { setIsLoading, setClients, addClient, updateClient /*, deleteProvider*/ } =
    clientsSlice.actions;

export default clientsSlice.reducer;
