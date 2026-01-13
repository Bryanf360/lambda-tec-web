import { useDispatch, useSelector } from 'react-redux';

import { setClients, setIsLoading } from '../slices/clientsSlice';
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

    return {
        isLoading,
        clients,
        getClients,
    };
};

export default useClientsStore;
