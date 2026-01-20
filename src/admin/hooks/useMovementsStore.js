import { useDispatch, useSelector } from 'react-redux';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import { setIsLoading, setMovements } from '../slices/movementsSlice';

const useMovementsStore = () => {
    const { isLoading, movements, meta } = useSelector((state) => state.movements);
    const dispatch = useDispatch();

    const startLoadingMovements = async ({ page = 1, limit = 10, dateFrom, dateTo }) => {
        try {
            dispatch(setIsLoading(true));
            const { data } = await lambdaTecApi.get('/reports/inputs', {
                params: { page, limit, dateFrom, dateTo },
            });
            dispatch(setMovements({ data: data.data, meta: data.meta }));
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
        movements,
        startLoadingMovements,
    };
};

export default useMovementsStore;
