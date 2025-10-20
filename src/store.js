import { configureStore } from '@reduxjs/toolkit'

import { 
    authReducer, 
    productsReducer, 
    dashboardReducer, 
    brandsReducer,
    modelsReducer,
} from './admin/slices'

export default configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        dashboard: dashboardReducer,
        brands: brandsReducer,
        models: modelsReducer,
    }
})