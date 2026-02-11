import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import lambdaTecApi from "../../core/api/lambdaTecApi";
import { addBrand, loadingBrands, setIsLoading } from "../slices/brandsSlice";
import { toast } from "react-toastify";

const useBrandsStore = () => {
    // TODO: access to the store
    const { isLoading, brands } = useSelector(state => state.brands)
    const dispatch = useDispatch();

    const startLoadingBrands = async () => {
        try {
            const { data } = await lambdaTecApi.get('/brands');
            dispatch(loadingBrands(data.data));
        } catch (error) {
            console.log('error: ', error)
            // toast.error(error?.response?.data?.message);
        }
    }

    const startSavingBrand = async (brand) => {
        try {
            dispatch(setIsLoading(true));
            const { data } = await lambdaTecApi.post('/brands', brand);
            dispatch(addBrand(data.data));
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
        brands,
        startLoadingBrands,
        startSavingBrand,
    }
}

export default useBrandsStore;