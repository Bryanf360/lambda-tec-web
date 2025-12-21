import { useDispatch, useSelector } from 'react-redux';

const useInputsStore = () => {
    const dispatch = useDispatch();
    const { selectedProducts } = useSelector((state) => state.inputs);

    return {
        selectedProducts,
    };
};

export default useInputsStore;
