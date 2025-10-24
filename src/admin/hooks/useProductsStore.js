import { useDispatch, useSelector } from 'react-redux';
import lambdaTecApi from '../../core/api/lambdaTecApi';
import { addProduct, setIsLoading } from '../slices/productsSlice';

const useProductsStore = () => {
    const { isLoading, products, selectedProduct } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const startSavingProduct = async (product) => {
        try {
            dispatch(setIsLoading(true));
            const { data } = await lambdaTecApi.post('/products', product);
            dispatch(addProduct(data.data));
            return data.message;
        } catch (error) {
            console.log('error: ', error);
            throw error?.response?.data?.message;
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    return {
        isLoading,
        products,
        selectedProduct,

        startSavingProduct,
    };
};

export default useProductsStore;
