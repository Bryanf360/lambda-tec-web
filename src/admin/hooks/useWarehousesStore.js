import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import { toast } from 'react-toastify';
import { loadingWarehouses } from '../slices/warehousesSlice';

const useWarehousesStore = () => {
    // TODO: access to the store
    const { isLoading, warehouses } = useSelector((state) => state.warehouses);
    const dispatch = useDispatch();

    const startLoadingWarehouses = async () => {
        try {
            const { data } = await lambdaTecApi.get('/warehouses');
            dispatch(loadingWarehouses(data.data));
        } catch (error) {
            console.log('error: ', error);
            toast.error(error?.response?.data?.message);
        }
    };

    return {
        isLoading,
        warehouses,
        startLoadingWarehouses,
    };
};

export default useWarehousesStore;
