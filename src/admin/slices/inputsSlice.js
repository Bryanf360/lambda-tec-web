import { createSlice } from '@reduxjs/toolkit';

export const inputsSlice = createSlice({
    name: 'inputs',
    initialState: {
        selectedProducts: {},
    },
    reducers: {
        setSelectedProducts: (state, action) => {
            const product = action.payload;
            const existing = state.selectedProducts[product.id];

            if (existing) {
                // Si ya existe, suma cantidad o actualiza los campos
                existing.quantity += product.quantity;
                existing.singleWarehouse = product.singleWarehouse;
            } else {
                // Si no existe, lo agrega como nuevo
                state.selectedProducts[product.id] = product;
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSelectedProducts } = inputsSlice.actions;

export default inputsSlice.reducer;
