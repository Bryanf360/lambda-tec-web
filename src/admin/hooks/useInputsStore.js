import { useDispatch, useSelector } from 'react-redux';
import lambdaTecApi from '../../core/api/lambdaTecApi';
import { setIsLoading } from '../slices/inputsSlice';

const useInputsStore = () => {
    const dispatch = useDispatch();
    const { selectedProducts } = useSelector((state) => state.inputs);

    const startSavingInputs = async (inputs) => {
        try {
            dispatch(setIsLoading(true));
            const { data } = await lambdaTecApi.post('/movements/input', inputs);
            return data.message;
        } catch (error) {
            console.log('error: ', error);
            throw error?.response?.data?.message;
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const startSavingOutputs = async (outputs) => {
        try {
            dispatch(setIsLoading(true));
            const { data } = await lambdaTecApi.post('/movements/output', outputs);
            return data.message;
        } catch (error) {
            console.log('error: ', error);
            throw error?.response?.data?.message;
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    return {
        selectedProducts,
        startSavingInputs,
        startSavingOutputs,
    };
};

export default useInputsStore;
