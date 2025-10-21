import { configureStore } from '@reduxjs/toolkit'

import { 
    authReducer, 
    productsReducer, 
    dashboardReducer, 
    brandsReducer,
    modelsReducer,
    unitTypesReducer,
    partNumbersReducer,
} from './admin/slices'

export default configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        dashboard: dashboardReducer,
        brands: brandsReducer,
        models: modelsReducer,
        unitTypes: unitTypesReducer,
        partNumbers: partNumbersReducer,
    }
})