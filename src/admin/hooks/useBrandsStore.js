import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import lambdaTecApi from "../../core/api/lambdaTecApi";
import { loadingBrands } from "../slices/brandsSlice";

const useBrandsStore = () => {
    // TODO: access to the store
    const { isLoading, brands } = useSelector(state => state.brands)
    const dispatch = useDispatch();

    useEffect(() => {
        startLoadingBrands();
    }, [])

    const startLoadingBrands = async () => {
        try {
            const { data } = await lambdaTecApi.get('/brands');
            dispatch(loadingBrands(data.data));
        } catch (error) {
            console.log('error: ', error)
            // toast.error(error?.response?.data?.message);
        }
    }

    return {
        isLoading,
        brands,
    }
}

export default useBrandsStore;