import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import { setIsLoading, setProductDetails } from '../slices/productDetailsSlice';

const useProductDetailsStore = () => {
    const { isLoading, meta, instances } = useSelector((state) => state.productDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startLoadingProductDetailsByProductId = async (
        productId,
        { page = 1, limit = 10, search = '' }
    ) => {
        dispatch(setIsLoading(true));
        try {
            const { data } = await lambdaTecApi.get(`/products/${productId}/instances`, {
                params: { page, limit, search },
            });
            dispatch(setProductDetails({ data: data.data, meta: data.meta }));
            // toast.success(data.message || 'Productos cargados correctamente');
        } catch (error) {
            const msg =
                error.response?.data?.message || 'Error al obtener los detalles del producto';
            toast.error(msg);
            navigate('/products');
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    return {
        isLoading,
        meta,
        instances,
        startLoadingProductDetailsByProductId,
    };
};

export default useProductDetailsStore;
