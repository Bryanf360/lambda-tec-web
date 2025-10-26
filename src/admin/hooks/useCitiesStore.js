import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import { loadingCities } from '../slices/citiesSlice';

const useCitiesStore = (provinceId) => {
    // TODO: access to the store
    const { isLoading, cities } = useSelector((state) => state.cities);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!provinceId) {
            dispatch(loadingCities([]));
            return;
        }
        startLoadingCitiesByProvinceId(provinceId);
    }, [provinceId]);

    const startLoadingCitiesByProvinceId = async (provinceId) => {
        try {
            const { data } = await lambdaTecApi.get(`/provinces/${provinceId}/cities`);
            dispatch(loadingCities(data.data));
        } catch (error) {
            console.log('error: ', error);
            // toast.error(error?.response?.data?.message);
        }
    };

    return {
        isLoading,
        cities,

        startLoadingCitiesByProvinceId,
    };
};

export default useCitiesStore;
