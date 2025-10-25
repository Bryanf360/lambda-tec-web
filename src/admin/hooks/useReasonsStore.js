import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import { toast } from 'react-toastify';
import { addReason, loadingReasons, setIsLoading } from '../slices/reasonsSlice';

const useReasonsStore = () => {
    // TODO: access to the store
    const { isLoading, reasons } = useSelector((state) => state.reasons);
    const dispatch = useDispatch();

    const startLoadingReasons = async () => {
        try {
            const { data } = await lambdaTecApi.get('/reasons');
            dispatch(loadingReasons(data.data));
        } catch (error) {
            console.log('error: ', error);
            // toast.error(error?.response?.data?.message);
        }
    };

    const startSavingReason = async (reason) => {
        try {
            dispatch(setIsLoading(true));
            const { data } = await lambdaTecApi.post('/reasons', reason);
            dispatch(addReason(data.data));
            return data.message;
        } catch (error) {
            console.log('error: ', error);
            throw error?.response?.data?.message;
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    return {
        isLoading,
        reasons,
        startLoadingReasons,
        startSavingReason,
    };
};

export default useReasonsStore;
