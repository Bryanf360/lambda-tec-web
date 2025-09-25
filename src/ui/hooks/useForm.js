import { useState } from "react"

export const useForm = (initialState = {}) => {
    const [formState, setFormState] = useState(initialState);
    
    const handleFormInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const resetForm = () => {
        setFormState(initialState);
    }
    
    return {
        ...formState,
        formState,
        handleFormInputChange,
        resetForm
    }
}
