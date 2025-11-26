import { useSelector } from "react-redux"

const useProductsStore = () => {
    const { selectedProduct } = useSelector(state => state.products)
    
    return {
        selectedProduct,
    }
}

export default useProductsStore;
