import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import lambdaTecApi from "../../core/api/lambdaTecApi";
import { loadingModels } from "../slices/modelsSlice";

const useModelsStore = (brandId) => {
    // TODO: access to the store
    const { isLoading, models } = useSelector(state => state.models)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!brandId) {
            dispatch(loadingModels([]));
            return;
        };
        startLoadingModelsByBrandId();
    }, [brandId])

    const startLoadingModelsByBrandId = async () => {
        try {
            const { data } = await lambdaTecApi.get(`/brands/${brandId}/models`);
            console.log(data.data)
            dispatch(loadingModels(data.data));
        } catch (error) {
            console.log('error: ', error)
            // toast.error(error?.response?.data?.message);
        }
    }

    return {
        isLoading,
        models,
    }
}

export default useModelsStore;