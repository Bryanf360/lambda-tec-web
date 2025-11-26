import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        selectedProduct: null
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { setSelectedProduct, } = productsSlice.actions

export default productsSlice.reducer