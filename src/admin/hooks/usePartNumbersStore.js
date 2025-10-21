import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import lambdaTecApi from "../../core/api/lambdaTecApi";
import { loadingPartNumbers } from "../slices/partNumbersSlice";

const usePartNumbersStore = (modelId) => {
    // TODO: access to the store
    const { isLoading, partNumbers } = useSelector(state => state.partNumbers)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!modelId) {
            dispatch(loadingPartNumbers([]));
            return;
        };
        startLoadingPartNumbersByModelId();
    }, [modelId])

    const startLoadingPartNumbersByModelId = async () => {
        try {
            const { data } = await lambdaTecApi.get(`/models/${modelId}/part-numbers`);
            console.log(data.data)
            dispatch(loadingPartNumbers(data.data));
        } catch (error) {
            console.log('error: ', error)
            // toast.error(error?.response?.data?.message);
        }
    }

    return {
        isLoading,
        partNumbers,
    }
}

export default usePartNumbersStore;