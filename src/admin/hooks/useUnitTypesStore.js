import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import lambdaTecApi from "../../core/api/lambdaTecApi";
import { addUnitType, loadingUnitTypes, setIsLoading } from "../slices/unitTypesSlice";

const useUnitTypesStore = () => {
    // TODO: access to the store
    const { isLoading, unitTypes } = useSelector(state => state.unitTypes)
    const dispatch = useDispatch();

    const startLoadingUnitTypes = async () => {
        try {
            const { data } = await lambdaTecApi.get('/unit-types');
            dispatch(loadingUnitTypes(data.data));
        } catch (error) {
            console.log('error: ', error)
            // toast.error(error?.response?.data?.message);
        }
    }

    const startSavingUnitType = async (unitType) => {
            try {
                dispatch(setIsLoading(true));
                const { data } = await lambdaTecApi.post('/unit-types', unitType);
                dispatch(addUnitType(data.data));
                return data.message;
            } catch (error) {
                console.log('error: ', error);
                throw error?.response?.data?.message;
            } finally {
                dispatch(setIsLoading(false));
            }
        }

    return {
        isLoading,
        unitTypes,
        startLoadingUnitTypes,
        startSavingUnitType,
    }
}

export default useUnitTypesStore;