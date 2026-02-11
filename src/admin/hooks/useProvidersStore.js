import { useDispatch, useSelector } from 'react-redux';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import { addProvider, setIsLoading, setProviders, updateProvider } from '../slices/providersSlice';

const useProvidersStore = () => {
    const dispatch = useDispatch();
    const { providers, isLoading } = useSelector((state) => state.providers);

    const getProviders = async () => {
        dispatch(setIsLoading(true));
        try {
            const { data } = await lambdaTecApi.get('/companies/supplier');
            dispatch(setProviders(data.data));
        } catch (err) {
            console.log('err: ', err);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const saveProvider = async (provider) => {
        dispatch(setIsLoading(true));
        try {
            if (provider.id) {
                const { data } = await lambdaTecApi.put('/companies', provider);
                dispatch(updateProvider(data.data));
                return data.message;
            }
            const { data } = await lambdaTecApi.post('/companies', provider);
            dispatch(addProvider(data.data));
            return data.message;
        } catch (err) {
            throw err?.response?.data?.message;
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const removeProvider = async (providerId) => {
        dispatch(setIsLoading(true));
        try {
            const { data } = await lambdaTecApi.delete(`/companies/${providerId}`);
            dispatch(deleteProviderById(providerId));
            return data.message;
        } catch (err) {
            throw err?.response?.data?.message;
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    return {
        providers,
        isLoading,
        getProviders,
        saveProvider,
        removeProvider,
    };
};

export default useProvidersStore;
