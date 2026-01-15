import { useDispatch, useSelector } from 'react-redux';

import { addClient, setClients, setIsLoading, updateClient } from '../slices/clientsSlice';
import lambdaTecApi from '../../core/api/lambdaTecApi';

const useClientsStore = () => {
    const { clients, isLoading } = useSelector((state) => state.clients);
    const dispatch = useDispatch();

    const getClients = async () => {
        dispatch(setIsLoading(true));

        try {
            const { data } = await lambdaTecApi.get('/companies/client');
            dispatch(setClients(data.data));
        } catch (err) {
            console.log('err: ', err);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const saveClient = async (client) => {
        dispatch(setIsLoading(true));
        try {
            if (client.id) {
                const { data } = await lambdaTecApi.put('/companies', client);
                dispatch(updateClient(data.data));
                return data.message;
            }
            const { data } = await lambdaTecApi.post('/companies', client);
            dispatch(addClient(data.data));
            return data.message;
        } catch (err) {
            throw err?.response?.data?.message;
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    return {
        isLoading,
        clients,
        getClients,
        saveClient,
    };
};

export default useClientsStore;
