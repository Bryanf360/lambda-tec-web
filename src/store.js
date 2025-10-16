import { configureStore } from '@reduxjs/toolkit'

import { authReducer, productsReducer, dashboardReducer } from './admin/slices'

export default configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        dashboard: dashboardReducer,
    }
})