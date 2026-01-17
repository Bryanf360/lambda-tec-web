import { useDispatch, useSelector } from 'react-redux';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import { setInstances, setIsLoading } from '../slices/instancesSlice';

const useInstancesStore = () => {
    const { isLoading, instances, meta } = useSelector((state) => state.instances);
    const dispatch = useDispatch();

    const startLoadingInstances = async ({ page = 1, limit = 10 }) => {
        try {
            dispatch(setIsLoading(true));
            const { data } = await lambdaTecApi.get('/reports/instances', {
                params: { page, limit },
            });
            dispatch(setInstances({ data: data.data, meta: data.meta }));
        } catch (error) {
            console.log('error: ', error);
            // toast.error(error?.response?.data?.message);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    return {
        isLoading,
        meta,
        instances,
        startLoadingInstances,
    };
};

export default useInstancesStore;
