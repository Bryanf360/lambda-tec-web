import { configureStore } from '@reduxjs/toolkit'
import { productsReducer } from './admin/slices'

export default configureStore({
    reducer: {
        products: productsReducer
    }
})