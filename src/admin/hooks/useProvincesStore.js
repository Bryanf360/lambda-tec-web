import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import { toast } from 'react-toastify';
import { loadingProvinces } from '../slices/provincesSlice';

const useProvincesStore = () => {
    // TODO: access to the store
    const { isLoading, provinces } = useSelector((state) => state.provinces);
    const dispatch = useDispatch();

    useEffect(() => {
        startLoadingProvinces();
    }, []);

    const startLoadingProvinces = async () => {
        try {
            const { data } = await lambdaTecApi.get('/provinces');
            dispatch(loadingProvinces(data.data));
        } catch (error) {
            console.log('error: ', error);
            // toast.error(error?.response?.data?.message);
        }
    };

    return {
        isLoading,
        provinces,
    };
};

export default useProvincesStore;
