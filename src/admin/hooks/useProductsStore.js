import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import lambdaTecApi from '../../core/api/lambdaTecApi';
import {
    addProduct,
    deleteProduct,
    setIsDeleting,
    setIsLoading,
    setIsSaving,
    setIsUpdating,
    setProducts,
    updateProduct,
} from '../slices/productsSlice';

const useProductsStore = () => {
    const { isLoading, meta, products, isDeleting, isUpdating } = useSelector(
        (state) => state.products
    );
    const dispatch = useDispatch();

    const startLoadingProducts = async ({ page = 1, limit = 10, search = '' }) => {
        dispatch(setIsLoading(true));
        try {
            const { data } = await lambdaTecApi.get('/products', {
                params: { page, limit, search },
            });
            dispatch(setProducts({ data: data.data, meta: data.meta }));
            // toast.success(data.message || 'Productos cargados correctamente');
        } catch (error) {
            const msg = error.response?.data?.message || 'Error al obtener los productos';
            toast.error(msg);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const startLoadingProductsWithStock = async ({ page = 1, limit = 5, search = '' }) => {
        dispatch(setIsLoading(true));
        try {
            const { data } = await lambdaTecApi.get('/products/stocks', {
                params: { page, limit, search },
            });
            dispatch(setProducts({ data: data.data, meta: data.meta }));
            // toast.success(data.message || 'Productos cargados correctamente');
        } catch (error) {
            const msg = error.response?.data?.message || 'Error al obtener los productos';
            toast.error(msg);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const startSavingProduct = async (product) => {
        try {
            if (product.id) {
                dispatch(setIsUpdating(true));
                const { data } = await lambdaTecApi.put(`/products/${product.id}`, product);
                dispatch(updateProduct({ ...data.data, stock: product.stock }));
                toast.success(data.message || 'Producto actualizado correctamente');
                return true;
            }
            dispatch(setIsSaving(true));
            const { data } = await lambdaTecApi.post('/products', product);
            // dispatch(addProduct({ ...data.data, stock: product.stock }));
            toast.success(data.message || 'Producto creado correctamente');
            return true;
        } catch (error) {
            const msg = error.response?.data?.message || 'Error al guardar el producto';
            toast.error(msg);
            return false;
        } finally {
            dispatch(setIsSaving(false));
            dispatch(setIsUpdating(false));
        }
    };

    // const startSavingProduct = async (product) => {
    //     try {
    //         dispatch(setIsLoading(true));
    //         const { data } = await lambdaTecApi.post('/products', product);
    //         dispatch(addProduct(data.data));
    //         return data.message;
    //     } catch (error) {
    //         console.log('error: ', error);
    //         throw error?.response?.data?.message;
    //     } finally {
    //         dispatch(setIsLoading(false));
    //     }
    // };

    const startDeletingProduct = async (id) => {
        dispatch(setIsDeleting(true));
        try {
            const { data } = await lambdaTecApi.delete(`/products/${id}`);
            // dispatch(deleteProduct(id));
            toast.success(data.message || 'Producto eliminado correctamente');
            return true;
        } catch (error) {
            const msg = error.response?.data?.message || 'Error al eliminar el producto';
            toast.error(msg);
            return false;
        } finally {
            dispatch(setIsDeleting(false));
        }
    };

    return {
        isLoading,
        isDeleting,
        isUpdating,
        meta,
        products,

        startLoadingProducts,
        startSavingProduct,
        startDeletingProduct,
        startLoadingProductsWithStock,
    };
};

export default useProductsStore;
