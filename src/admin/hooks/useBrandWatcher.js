import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import useModelsStore from './useModelsStore';
import { loadingModels } from '../slices/modelsSlice';

export default function useBrandWatcher(brandId) {
    const { startLoadingModelsByBrandId } = useModelsStore();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!brandId) {
            dispatch(loadingModels([]));
            return;
        }
        startLoadingModelsByBrandId(brandId);
    }, [brandId]);
}
