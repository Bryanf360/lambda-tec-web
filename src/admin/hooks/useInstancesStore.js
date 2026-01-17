import { useDispatch, useSelector } from 'react-redux';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import { setIsLoading } from '../slices/instancesSlice';

const useInstancesStore = () => {
    const { isLoading, instances } = useSelector((state) => state.instances);
    const dispatch = useDispatch();

    const startLoadingInstances = async () => {
        try {
            dispatch(setIsLoading(true));
            const { data } = await lambdaTecApi.get('/reports/instances');
            console.log('data: ', data);
            // dispatch(loadingInstances(data.data));
        } catch (error) {
            console.log('error: ', error);
            // toast.error(error?.response?.data?.message);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    return {
        isLoading,
        instances,
        startLoadingInstances,
    };
};

export default useInstancesStore;
