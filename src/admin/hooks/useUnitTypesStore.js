import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import lambdaTecApi from "../../core/api/lambdaTecApi";
import { loadingUnitTypes } from "../slices/unitTypesSlice";

const useUnitTypesStore = () => {
    // TODO: access to the store
    const { isLoading, unitTypes } = useSelector(state => state.unitTypes)
    const dispatch = useDispatch();

    useEffect(() => {
        startLoadingUnitTypes();
    }, [])

    const startLoadingUnitTypes = async () => {
        try {
            const { data } = await lambdaTecApi.get('/unit-types');
            dispatch(loadingUnitTypes(data.data));
        } catch (error) {
            console.log('error: ', error)
            // toast.error(error?.response?.data?.message);
        }
    }

    return {
        isLoading,
        unitTypes,
    }
}

export default useUnitTypesStore;