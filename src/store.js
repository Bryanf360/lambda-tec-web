import { configureStore } from '@reduxjs/toolkit';

import {
    authReducer,
    productsReducer,
    dashboardReducer,
    brandsReducer,
    modelsReducer,
    unitTypesReducer,
    partNumbersReducer,
    reasonsReducer,
    provincesReducer,
    citiesReducer,
    providersReducer,
    inputsReducer,
    clientsReducer,
} from './admin/slices';

export default configureStore({
    reducer: {
        auth: authReducer,
        brands: brandsReducer,
        cities: citiesReducer,
        clients: clientsReducer,
        dashboard: dashboardReducer,
        inputs: inputsReducer,
        models: modelsReducer,
        partNumbers: partNumbersReducer,
        products: productsReducer,
        providers: providersReducer,
        provinces: provincesReducer,
        reasons: reasonsReducer,
        unitTypes: unitTypesReducer,
    },
});
