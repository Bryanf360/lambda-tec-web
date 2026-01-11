import { createSlice } from '@reduxjs/toolkit';

export const inputsSlice = createSlice({
    name: 'inputs',
    initialState: {
        selectedProducts: {},
        isLoading: false,
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
        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const product = state.selectedProducts[productId];

            if (!product) return;

            // si queda en 1 → eliminar el producto del store
            if (product.quantity <= 1) {
                delete state.selectedProducts[productId];
            } else {
                product.quantity -= 1;
            }
        },
        deleteSelectedProduct: (state, { payload }) => {
            const productId = payload;
            delete state.selectedProducts[productId];
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        resetSelectedProducts: (state) => {
            state.selectedProducts = {};
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setSelectedProducts,
    decreaseQuantity,
    deleteSelectedProduct,
    setIsLoading,
    resetSelectedProducts,
} = inputsSlice.actions;

export default inputsSlice.reducer;
