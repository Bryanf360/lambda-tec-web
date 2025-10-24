import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import { addPartNumber, loadingPartNumbers, setIsLoading } from '../slices/partNumbersSlice';

const usePartNumbersStore = (modelId) => {
    const { isLoading, partNumbers } = useSelector((state) => state.partNumbers);
    const { selectedModel } = useSelector((state) => state.models);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!modelId) {
            dispatch(loadingPartNumbers([]));
            return;
        }
        startLoadingPartNumbersByModelId();
    }, [modelId]);

    const startLoadingPartNumbersByModelId = async () => {
        try {
            const { data } = await lambdaTecApi.get(`/models/${modelId}/part-numbers`);
            dispatch(loadingPartNumbers(data.data));
        } catch (error) {
            console.log('error: ', error);
            // toast.error(error?.response?.data?.message);
        }
    };

    const startSavingPartNumber = async (partNumber) => {
        try {
            dispatch(setIsLoading(true));
            const { data } = await lambdaTecApi.post('/part-numbers', partNumber);
            // TODO: validate if match model and brand selecteds
            if (partNumber.modelId === selectedModel?.id) dispatch(addPartNumber(data.data));
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
        partNumbers,
        startSavingPartNumber,
    };
};

export default usePartNumbersStore;
