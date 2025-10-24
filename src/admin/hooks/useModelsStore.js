import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import { addModel, loadingModels, onSetSelectedModel, setIsLoading } from '../slices/modelsSlice';

const useModelsStore = () => {
    // TODO: access to the store
    const { isLoading, models } = useSelector((state) => state.models);
    const dispatch = useDispatch();

    const startLoadingModelsByBrandId = async (brandId) => {
        try {
            const { data } = await lambdaTecApi.get(`/brands/${brandId}/models`);
            dispatch(loadingModels(data.data));
        } catch (error) {
            console.log('error: ', error);
            // toast.error(error?.response?.data?.message);
        }
    };

    const startSavingModel = async (model) => {
        try {
            dispatch(setIsLoading(true));
            const { data } = await lambdaTecApi.post('/models', model);
            dispatch(addModel(data.data));
            return data.message;
        } catch (error) {
            console.log('error: ', error);
            throw error?.response?.data?.message;
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const setSelectedModel = (model) => {
        dispatch(onSetSelectedModel(model));
    };

    return {
        isLoading,
        models,

        startLoadingModelsByBrandId,
        startSavingModel,
        setSelectedModel,
    };
};

export default useModelsStore;
