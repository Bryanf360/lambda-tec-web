import { configureStore } from '@reduxjs/toolkit'

import { authReducer, productsReducer } from './admin/slices'

export default configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
    }
})