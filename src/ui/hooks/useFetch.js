import { useEffect, useState } from "react"

export const useFetch = (url) => {
    const [state, setState] = useState({
        isLoading: true,
        data: null,
        hasError: false,
        error: null
    });

    useEffect(() => {
        getData();
    }, [url])

    const setLoadingState = () => {
        setState({
            isLoading: true,
            data: null,
            hasError: false,
            error: null
        })
    }

    const getData = async () => {
        setLoadingState();
        const response = await fetch(url);
        if (!response.ok) {
            setState({
                isLoading: false,
                data: null,
                hasError: true,
                error: {
                    code: response.status,
                    message: response.statusText
                }
            })
            return;
        }
        const data = await response.json();
        setState({
            isLoading: false,
            data: data,
            hasError: false,
            error: null
        });
    }
    
    return {
        ...state,
    }
}
